FROM node:9-alpine

WORKDIR /
USER root

ENV YARN_VERSION 1.12.3
RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz

RUN yarn global add npm@6.4.0
RUN yarn global add @angular/cli@7.0.4
RUN yarn global add pm2

COPY package.json .
COPY yarn-lock.json .
RUN yarn

COPY . .

RUN chmod -R 777 /
RUN chown default:root /
RUN yarn build

USER default

EXPOSE 3000
EXPOSE 4200
CMD pm2-runtime --env production ./dist/server/server.js
