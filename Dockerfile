FROM node:16.13.1 AS builder
WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

EXPOSE 80

FROM nginx:alpine
COPY --from=builder /app/dist /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
CMD nginx
