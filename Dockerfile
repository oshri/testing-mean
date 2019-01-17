FROM centos:7.4.1708
ENV http_proxy=http://natcpproxy.wlb2.nam.nsroot.net:9999
ENV https_proxy=http://natcpproxy.wlb2.nam.nsroot.net:9999

MAINTAINER Oshri Kdosim <cms.x.seo@gmail.com>

RUN groupadd -r default && useradd -r -m -g default default

WORKDIR /
USER root

RUN yum install -y make gcc-c++
ARG NODE_DIST_URL
RUN curl ${NODE_DIST_URL:-https://nodejs.org/dist/v10.14.1/node-v10.14.1-linux-x64.tar.xz} -o /node-linux-x64.tar.xz
RUN tar -C /usr/local --strip-components 1 -xf /node-linux-x64.tar.xz

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
