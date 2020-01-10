#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Use unbuffered to force unbuffered output, so we get stdout if process crashes
"$DIR/unbuffered" "$DIR/mono-xcompiler" "$@"
