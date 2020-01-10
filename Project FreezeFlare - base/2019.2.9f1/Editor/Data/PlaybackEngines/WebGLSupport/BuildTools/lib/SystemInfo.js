var LibrarySystemInfoWebGL = {
  	JS_SystemInfo_HasWebGL__proxy: 'sync',
  	JS_SystemInfo_HasWebGL__sig: 'i',
	JS_SystemInfo_HasWebGL: function() 
	{
		return UnityLoader.SystemInfo.hasWebGL;
	},

  	JS_SystemInfo_HasCursorLock__proxy: 'sync',
  	JS_SystemInfo_HasCursorLock__sig: 'i',
	JS_SystemInfo_HasCursorLock: function() 
	{
		return UnityLoader.SystemInfo.hasCursorLock;
	},

  	JS_SystemInfo_HasFullscreen__proxy: 'sync',
  	JS_SystemInfo_HasFullscreen__sig: 'i',
	JS_SystemInfo_HasFullscreen: function() 
	{
		return UnityLoader.SystemInfo.hasFullscreen;
	},

  	JS_SystemInfo_IsMobile__proxy: 'sync',
  	JS_SystemInfo_IsMobile__sig: 'i',
	JS_SystemInfo_IsMobile: function() 
	{
		return UnityLoader.SystemInfo.mobile;
	},

  	JS_SystemInfo_GetWidth__proxy: 'sync',
  	JS_SystemInfo_GetWidth__sig: 'i',
	JS_SystemInfo_GetWidth: function() 
	{
		return UnityLoader.SystemInfo.width;
	},

  	JS_SystemInfo_GetHeight__proxy: 'sync',
  	JS_SystemInfo_GetHeight__sig: 'i',
	JS_SystemInfo_GetHeight: function() 
	{
		return UnityLoader.SystemInfo.height;
	},

  	JS_SystemInfo_GetCurrentCanvasWidth__proxy: 'sync',
  	JS_SystemInfo_GetCurrentCanvasWidth__sig: 'i',
	JS_SystemInfo_GetCurrentCanvasWidth: function() 
	{
		return Module['canvas'].clientWidth;
	},

  	JS_SystemInfo_GetCurrentCanvasHeight__proxy: 'sync',
  	JS_SystemInfo_GetCurrentCanvasHeight__sig: 'i',
	JS_SystemInfo_GetCurrentCanvasHeight: function() 
	{
		return Module['canvas'].clientHeight;
	},

  	JS_SystemInfo_GetDocumentURL__proxy: 'sync',
  	JS_SystemInfo_GetDocumentURL__sig: 'iii',
	JS_SystemInfo_GetDocumentURL: function(buffer, bufferSize) 
	{
		if (buffer)
			stringToUTF8(document.URL, buffer, bufferSize);
		return lengthBytesUTF8(document.URL);
	},

  	JS_SystemInfo_GetStreamingAssetsURL__proxy: 'sync',
  	JS_SystemInfo_GetStreamingAssetsURL__sig: 'iii',
	JS_SystemInfo_GetStreamingAssetsURL: function(buffer, bufferSize) 
	{
		var streamingAssetsUrl = Module.streamingAssetsUrl();
		if (buffer) stringToUTF8(streamingAssetsUrl, buffer, bufferSize);
		return lengthBytesUTF8(streamingAssetsUrl);
	},

  	JS_SystemInfo_GetBrowserName__proxy: 'sync',
  	JS_SystemInfo_GetBrowserName__sig: 'iii',
	JS_SystemInfo_GetBrowserName: function(buffer, bufferSize) 
	{
		var browser = UnityLoader.SystemInfo.browser;
		if (buffer)
			stringToUTF8(browser, buffer, bufferSize);
		return lengthBytesUTF8(browser);
	},

  	JS_SystemInfo_GetBrowserVersionString__proxy: 'sync',
  	JS_SystemInfo_GetBrowserVersionString__sig: 'iii',
	JS_SystemInfo_GetBrowserVersionString: function(buffer, bufferSize)
	{
		var browserVer = UnityLoader.SystemInfo.browserVersion;
		if (buffer)
			stringToUTF8(browserVer, buffer, bufferSize);
		return lengthBytesUTF8(browserVer);
	},

  	JS_SystemInfo_GetBrowserVersion__proxy: 'sync',
  	JS_SystemInfo_GetBrowserVersion__sig: 'i',
	JS_SystemInfo_GetBrowserVersion: function() 
	{
		return UnityLoader.SystemInfo.browserVersion;
	},

  	JS_SystemInfo_GetOS__proxy: 'sync',
  	JS_SystemInfo_GetOS__sig: 'iii',
	JS_SystemInfo_GetOS: function(buffer, bufferSize) 
	{
		var browser = UnityLoader.SystemInfo.os + " " + UnityLoader.SystemInfo.osVersion;
		if (buffer)
			stringToUTF8(browser, buffer, bufferSize);
		return lengthBytesUTF8(browser);
	},

  	JS_SystemInfo_GetLanguage__proxy: 'sync',
  	JS_SystemInfo_GetLanguage__sig: 'iii',
	JS_SystemInfo_GetLanguage: function(buffer, bufferSize) 
	{
		var language = UnityLoader.SystemInfo.language;
		if (buffer)
			stringToUTF8(language, buffer, bufferSize);
		return lengthBytesUTF8(language);
	},

  	JS_SystemInfo_GetMemory__proxy: 'sync',
  	JS_SystemInfo_GetMemory__sig: 'i',
	JS_SystemInfo_GetMemory: function() 
	{
		return TOTAL_MEMORY/(1024*1024);
	},

  	JS_SystemInfo_GetGPUInfo__proxy: 'sync',
  	JS_SystemInfo_GetGPUInfo__sig: 'iii',
	JS_SystemInfo_GetGPUInfo : function(buffer, bufferSize)
	{
		var gpuinfo = UnityLoader.SystemInfo.gpu;
		if (buffer)
			stringToUTF8(gpuinfo, buffer, bufferSize);
		return lengthBytesUTF8(gpuinfo);
	}
};

mergeInto(LibraryManager.library, LibrarySystemInfoWebGL);
