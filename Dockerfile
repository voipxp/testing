# APP BUILD STAGE
FROM node:10-alpine as app
RUN apk add --no-cache git
WORKDIR /app

# INSTALL DEPS
COPY package.json /app
COPY yarn.lock /app
RUN yarn install

# LINT AND BUILD
COPY . /app
RUN yarn lint && yarn build

# FINAL STAGE
FROM quay.io/parkbench/caddy-base
WORKDIR /app
COPY --from=app /app/dist /app/html

