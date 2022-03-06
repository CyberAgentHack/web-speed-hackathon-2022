FROM node:14-alpine AS builder

ENV NODE_OPTIONS="--max-old-space-size=8192"

COPY ./.yarn ./.yarn
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json
COPY ./webpack.config.js ./webpack.config.js

ARG COMMIT_HASH
ENV COMMIT_HASH $COMMIT_HASH

RUN yarn
RUN yarn build

FROM node:14-alpine

COPY ./public ./public
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY --from=builder ./dist ./dist

RUN yarn

EXPOSE 3000
CMD yarn serve

FROM nginx:stable
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /opt/web/build /usr/share/nginx/html
