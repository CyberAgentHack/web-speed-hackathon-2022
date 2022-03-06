FROM node:16.13.1 AS builder

WORKDIR /app

COPY . .

ARG COMMIT_HASH
ENV COMMIT_HASH $COMMIT_HASH

RUN yarn
RUN yarn build

FROM node:16.13.1

RUN yarn

EXPOSE 3000
CMD yarn serve

FROM nginx:alpine

# COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

CMD /bin/sh -c "envsubst '\$PORT' /etc/nginx/conf.d/nginx.conf" && nginx -g 'daemon off;'
