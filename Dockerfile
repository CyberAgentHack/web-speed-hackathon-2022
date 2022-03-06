FROM nginx:alpine

# COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

FROM node:16.13.1 AS builder

COPY ./.yarn ./.yarn
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json
COPY ./webpack.config.js ./webpack.config.js

ARG COMMIT_HASH
ENV COMMIT_HASH $COMMIT_HASH

RUN yarn
RUN yarn clean
RUN yarn build

FROM node:16.13.1

COPY ./public ./public
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY --from=builder ./dist ./dist

RUN yarn

EXPOSE 3000
CMD yarn serve
