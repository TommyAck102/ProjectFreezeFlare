#!/usr/bin/env node

// A WebSocket to TCP socket proxy
// Copyright 2012 Joel Martin
// Licensed under LGPL version 3 (see docs/LICENSE.LGPL-3)

// Known to work with node 0.8.9
// Requires node modules: ws and optimist
//     npm install ws optimist


var argv = require('optimist').argv,
    net = require('net'),
    http = require('http'),
    https = require('https'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    mime = require('mime-types'),

    Buffer = require('buffer').Buffer,
    WebSocketServer = require('ws').Server,

    webServer, wsServer,
    source_host, source_port, target_host, target_port,
    web_path = null;
   
// The websockifier code has been modified in order to workaround the player connection lock in WebGL (case 759492)
// See the README_UNITY.txt for the details.
// The structure of the player connection message is the following (according to the /Runtime/Network/PlayerCommunicator/GeneralConnection.h) :
//   the message header:
//        UInt32 m_MagicNumber; // in little endian
//        UnityGUID m_MessageId; // in little endian
//        UInt32 m_Size; // in little endian
//   is followed by the message body of m_Size bytes

var PLAYER_MESSAGE_MAGIC_NUMBER = 0x67A54E8F;
var messageHeaderSize = 24;
 
// Handle new WebSocket client
new_client = function(client, req) {
    var clientAddr = client._socket.remoteAddress, log;
    var start_time = new Date().getTime();

    console.log(req ? req.url : client.upgradeReq.url);
    log = function (msg) {
        console.log(' ' + clientAddr + ': '+ msg);
    };
    log('WebSocket connection');
    log('Version ' + client.protocolVersion + ', subprotocol: ' + client.protocol);

    if (argv.record) {
      var rs = fs.createWriteStream(argv.record + '/' + new Date().toISOString().replace(/:/g, "_"));
      rs.write('var VNC_frame_data = [\n');
    } else {
      var rs = null;
    }

    var target = net.createConnection(target_port,target_host, function() {
        log('connected to target');
        target.message = {
            buffer: new Buffer(messageHeaderSize),
            read: 0,
            size: 0,
        }
    });
    target.on('data', function(data) {
        //log("sending message: " + data);

        if (rs) {
          var tdelta = Math.floor(new Date().getTime()) - start_time;
          var rsdata = '\'{' + tdelta + '{' + decodeBuffer(data) + '\',\n';
          rs.write(rsdata);
        }

        try {
            if (client.protocol === 'base64') {
                client.send(new Buffer(data).toString('base64'));
            } else {
                // The following code splits the incoming data on the message boundaries and sends it to the websocket.
                // Incomplete messages are stored in the buffer.
                for(var position = 0; position < data.length;) {
                    // target.message.size is the total size of the message, including the header and the body.
                    // It is set only after the message header has been received (when set, it is always non-zero, as it includes the header size)
                    if (!target.message.size) {
                        // receiving the message header
                        var read = Math.min(data.length - position, messageHeaderSize - target.message.read);
                        if (read) {
                            data.copy(target.message.buffer, target.message.read, position, position + read);
                            position += read;
                            target.message.read += read;
                        }                  
                        if (target.message.read == messageHeaderSize) {
                            // the message header has been received            
                            if (target.message.buffer.readUInt32LE(0) != PLAYER_MESSAGE_MAGIC_NUMBER) { // m_MagicNumber is at offset 0
                                client.destroy();
                                throw 'PLAYER_MESSAGE_MAGIC_NUMBER mismatch';
                            }
                            target.message.size = messageHeaderSize + target.message.buffer.readUInt32LE(20); // m_Size is at offset 20
                            if (target.message.size > target.message.buffer.length) {
                                // reallocate the buffer if the message does not fit
                                var buffer = target.message.buffer;
                                target.message.buffer = new Buffer(target.message.size);
                                buffer.copy(target.message.buffer, 0, 0, target.message.read);
                            }
                        }
                    }
                    if (target.message.size) {
                        // receiving the message body
                        var read = Math.min(data.length - position, target.message.size - target.message.read)
                        if (read) {
                            data.copy(target.message.buffer, target.message.read, position, position + read);
                            position += read;
                            target.message.read += read;
                        }
                        if (target.message.read == target.message.size) {
                           // the message body has been received
                           client.send(target.message.buffer.slice(0, target.message.size), {binary: true});
                           target.message.read = target.message.size = 0;
                        }
                    }
                }
            }
        } catch(e) {
            log("Client closed, cleaning up target");
            target.end();
        }
    });
    target.on('end', function() {
        log('target disconnected');
        client.close();
        if (rs) {
          rs.end('\'EOF\'];\n');
        }
    });
    target.on('error', function() {
        log('target connection error');
        target.end();
        client.close();
        if (rs) {
          rs.end('\'EOF\'];\n');
        }
    });

    client.on('message', function(msg) {
        //log('got message: ' + msg);

        if (rs) {
          var rdelta = Math.floor(new Date().getTime()) - start_time;
          var rsdata = ('\'}' + rdelta + '}' + decodeBuffer(msg) + '\',\n');
~         rs.write(rsdata);
        }

        target.write(msg);
    });
    client.on('close', function(code, reason) {
        log('WebSocket client disconnected: ' + code + ' [' + reason + ']');
        target.end();
    });
    client.on('error', function(a) {
        log('WebSocket client error: ' + a);
        target.end();
    });
};

function decodeBuffer(buf) {
  var returnString = '';
  for (var i = 0; i < buf.length; i++) {
    if (buf[i] >= 48 && buf[i] <= 90) {
      returnString += String.fromCharCode(buf[i]);
    } else if (buf[i] === 95) {
      returnString += String.fromCharCode(buf[i]);
    } else if (buf[i] >= 97 && buf[i] <= 122) {
      returnString += String.fromCharCode(buf[i]);
    } else {
      var charToConvert = buf[i].toString(16);
      if (charToConvert.length === 0) {
        returnString += '\\x00';
      } else if (charToConvert.length === 1) {
        returnString += '\\x0' + charToConvert;
      } else {
        returnString += '\\x' + charToConvert;
      }
    }
  }
  return returnString;
}

// Send an HTTP error response
http_error = function (response, code, msg) {
    response.writeHead(code, {"Content-Type": "text/plain"});
    response.write(msg + "\n");
    response.end();
    return;
}

// Process an HTTP static file request
http_request = function (request, response) {
//    console.log("pathname: " + url.parse(req.url).pathname);
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('okay');

    if (! argv.web) {
        return http_error(response, 403, "403 Permission Denied");
    }

    var uri = url.parse(request.url).pathname
        , filename = path.join(argv.web, uri);

    fs.exists(filename, function(exists) {
        if(!exists) {
            return http_error(response, 404, "404 Not Found");
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                return http_error(response, 500, err);
            }

            var headers = {};
            var contentType = mime.contentType(path.extname(filename));
            if (contentType !== false) {
              headers['Content-Type'] = contentType;
            }

            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });
};

// parse source and target arguments into parts
try {
    source_arg = argv._[0].toString();
    target_arg = argv._[1].toString();

    var idx;
    idx = source_arg.indexOf(":");
    if (idx >= 0) {
        source_host = source_arg.slice(0, idx);
        source_port = parseInt(source_arg.slice(idx+1), 10);
    } else {
        source_host = "";
        source_port = parseInt(source_arg, 10);
    }

    idx = target_arg.indexOf(":");
    if (idx < 0) {
        throw("target must be host:port");
    }
    target_host = target_arg.slice(0, idx);
    target_port = parseInt(target_arg.slice(idx+1), 10);

    if (isNaN(source_port) || isNaN(target_port)) {
        throw("illegal port");
    }
} catch(e) {
    console.error("websockify.js [--web web_dir] [--cert cert.pem [--key key.pem]] [--record dir] [source_addr:]source_port target_addr:target_port");
    process.exit(2);
}

console.log("WebSocket settings: ");
console.log("    - proxying from " + source_host + ":" + source_port +
            " to " + target_host + ":" + target_port);
if (argv.web) {
    console.log("    - Web server active. Serving: " + argv.web);
}

if (argv.cert) {
    argv.key = argv.key || argv.cert;
    var cert = fs.readFileSync(argv.cert),
        key = fs.readFileSync(argv.key);
    console.log("    - Running in encrypted HTTPS (wss://) mode using: " + argv.cert + ", " + argv.key);
    webServer = https.createServer({cert: cert, key: key}, http_request);
} else {
    console.log("    - Running in unencrypted HTTP (ws://) mode");
    webServer = http.createServer(http_request);
}
webServer.listen(source_port, function() {
    wsServer = new WebSocketServer({server: webServer});
    wsServer.on('connection', new_client);
});
