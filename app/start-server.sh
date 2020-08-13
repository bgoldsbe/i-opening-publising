#!/bin/sh

export NODE_ENV=${NODE_ENV:-production}

node ./app/server.js
