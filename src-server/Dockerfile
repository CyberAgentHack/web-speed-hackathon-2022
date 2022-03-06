FROM node:16.13.1-alpine3.13 as builder

WORKDIR /usr/src/app

COPY .yarn/releases/yarn-3.1.1.cjs ./.yarn/releases/yarn-3.1.1.cjs

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install

COPY . ./

RUN yarn run build

EXPOSE 8080

CMD [ "yarn", "run", "serve" ]
