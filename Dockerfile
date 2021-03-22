FROM node:15.8-buster-slim
MAINTAINER Den Elston "elstton@yahoo.com"

RUN npm install -g npm@7.6.3 \
    && npm install --global surge