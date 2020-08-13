#!/bin/sh

export NODE_ENV=${NODE_ENV:-development}

webpack \
  --config ./webpack.config.js \
  --progress \
  --colors \
  --watch \
& \
nodemon ./app/server.js \
  --ignore **/public
