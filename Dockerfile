FROM node:16.18.0-alpine

WORKDIR /web

# set timezone
RUN --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    echo "Asia/Tokyo" > /etc/timezone

# install dependencies
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/ ./.yarn/
RUN --mount=type=cache,target=/var/cache/yarn \
    YARN_CACHE_FOLDER=/var/cache/yarn yarn --frozen-lockfile

COPY . .

RUN yarn build

ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["yarn"]
CMD ["serve"]
