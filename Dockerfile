FROM node:16.13.1 AS builder
WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /var/www
COPY ./nginx.conf /etc/nginx/conf.d/wsh.conf

WORKDIR /usr/share/nginx/html
CMD nginx
