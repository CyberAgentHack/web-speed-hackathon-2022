FROM node:16.13.1 AS builder
WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

EXPOSE 3000

FROM nginx:alpine
COPY --from=build /app/build /var/www
COPY ./nginx /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
