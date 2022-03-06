FROM node:16.13.1 AS builder
WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

EXPOSE 3000

FROM nginx:alpine
COPY --from=build /app/dist /var/www
COPY /app/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
