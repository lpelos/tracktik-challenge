FROM node:14-alpine
LABEL maintainer admin@rpgist.net

RUN apk update && \
  apk add --no-cache \
  bash

# Configure app dir and volume
ENV APP_DIR /app

VOLUME ${APP_DIR}
WORKDIR ${APP_DIR}

# Add app dependencies to PATH
ENV PATH ${PATH}:${APP_DIR}/node_modules/.bin

# dev server port
EXPOSE 3000
