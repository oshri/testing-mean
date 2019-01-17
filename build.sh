#!/bin/sh
docker build . -t app
docker run -it -p 4200:4200 app
