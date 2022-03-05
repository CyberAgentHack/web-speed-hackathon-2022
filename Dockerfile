
# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY .yarn/releases/yarn-3.1.1.cjs ./.yarn/releases/yarn-3.1.1.cjs

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install

COPY . ./

RUN yarn run build

# Run the web service on container startup.
CMD [ "yarn", "run", "serve" ]
