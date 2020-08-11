#!/bin/sh

export NODE_ENV=${NODE_ENV:-production}
export EXIT_ON_ERROR=${EXIT_ON_ERROR:-1}

webpack \
  --config ./webpack.config.js \
  --progress \
  --colors \
