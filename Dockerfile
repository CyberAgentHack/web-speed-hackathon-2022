FROM node:16.13.1 AS builder

WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

FROM nginx:alpine

# COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=builder /app/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

FROM node:16.13.1

RUN yarn

EXPOSE 3000

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
