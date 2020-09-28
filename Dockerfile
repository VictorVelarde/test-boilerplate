FROM node:12.13-alpine

RUN \
    mkdir -p /usr/src/app \
    && chown --recursive node:node /usr/src/app
WORKDIR /usr/src/app

# Set NODE_ENV only during build
ARG NODE_ENV=development

COPY package*.json /usr/src/app/

RUN \
    set -x \
    && apk add --no-cache --virtual build-dep \
        git \
    && npm ci \
    && npm cache clean --force \
    && apk del build-dep
COPY --chown=node . /usr/src/app

USER node

CMD [ "npm", "start" ]
