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
WORKDIR /app
COPY --from=caddy /install/caddy /usr/local/bin/caddy
COPY --from=build /app/dist /app/html/app
RUN apk add --no-cache ca-certificates
RUN \
  echo "0.0.0.0" > /app/etc/Caddyfile \
  && echo "root /app/html" >> /app/etc/Caddyfile \
  && echo "errors stderr" >> /app/etc/Caddyfile \
  && echo "log stdout" >> /app/etc/Caddyfile \
  && echo "gzip" >> /app/etc/Caddyfile \
  && echo "cors" >> /app/etc/Caddyfile \
  && echo "proxy / api {" >> /app/etc/Caddyfile \
  && echo "  transparent" >> /app/etc/Caddyfile \
  && echo "  except /app" >> /app/etc/Caddyfile \
  && echo "}" >> /app/etc/Caddyfile
ENV CADDYPATH /app/ssl
VOLUME /app/etc /app/ssl
EXPOSE 80 443 2015
CMD ["/usr/local/bin/caddy", "-agree", "-conf", "/app/etc/Caddyfile"]
