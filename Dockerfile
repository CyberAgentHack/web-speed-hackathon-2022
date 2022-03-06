FROM node:16.13.1 AS builder

WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

EXPOSE 3000

CMD yarn serve
