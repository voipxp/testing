# CADDY BUILD STAGE
FROM abiosoft/caddy:builder as caddy
ARG CADDY_VERSION="0.10.10"
ARG CADDY_PLUGINS="cors"
RUN VERSION=${CADDY_VERSION} PLUGINS=${CADDY_PLUGINS} /bin/sh /usr/bin/builder.sh

# APP BUILD STAGE
FROM node:alpine as build
RUN apk add --no-cache git
ADD . /app
RUN cd /app; yarn; yarn run build

# FINAL STAGE
FROM alpine:3.7
COPY --from=caddy /install/caddy /usr/local/bin/caddy
COPY --from=build /app/dist /app/html
RUN apk add --no-cache ca-certificates
ADD Caddyfile.example /app/etc/Caddyfile
WORKDIR /app
ENV CADDYPATH /app/ssl
VOLUME /app/etc /app/ssl
EXPOSE 80 443 2015
CMD ["/usr/local/bin/caddy", "-agree", "-conf", "/app/etc/Caddyfile"]
