# CADDY BUILD STAGE
FROM abiosoft/caddy:builder as caddy
ARG CADDY_VERSION="0.11.3"
ARG CADDY_PLUGINS="cors,digitalocean,googlecloud"
RUN VERSION=${CADDY_VERSION} PLUGINS=${CADDY_PLUGINS} /bin/sh /usr/bin/builder.sh

# APP BUILD STAGE
FROM node:10-alpine as app
RUN apk add --no-cache git
ADD . /app
RUN cd /app && yarn && yarn lint && yarn build

# FINAL STAGE
FROM alpine:3.9
WORKDIR /app
COPY --from=caddy /install/caddy /usr/local/bin/caddy
COPY --from=app /app/dist /app/html/app
RUN apk add --no-cache ca-certificates
RUN mkdir /app/etc \
  && echo "0.0.0.0" > /app/etc/Caddyfile \
  && echo "root /app/html" >> /app/etc/Caddyfile \
  && echo "errors stderr" >> /app/etc/Caddyfile \
  && echo "log stdout" >> /app/etc/Caddyfile \
  && echo "gzip" >> /app/etc/Caddyfile \
  && echo "cors" >> /app/etc/Caddyfile \
  && echo "proxy / api {" >> /app/etc/Caddyfile \
  && echo "  transparent" >> /app/etc/Caddyfile \
  && echo "  except /app" >> /app/etc/Caddyfile \
  && echo "}" >> /app/etc/Caddyfile \
  && echo "header / {" >> /app/etc/Caddyfile \
  && echo "  X-XSS-Protection \"1; mode=block\"" >> /app/etc/Caddyfile \
  && echo "  X-Content-Type-Options \"nosniff\"" >> /app/etc/Caddyfile \
  && echo "  X-Frame-Options \"DENY\"" >> /app/etc/Caddyfile \
  && echo "  Referrer-Policy \"strict-origin\"" >> /app/etc/Caddyfile \
  && echo "  Strict-Transport-Security \"max-age=31536000; includeSubDomains\"" >> /app/etc/Caddyfile \
  && echo "  Content-Security-Policy \"default-src 'none'; script-src 'self' 'nonce-1eb8230f61cf659e7e96c3d1dfa53882e5fd737c' https://*.google-analytics.com; connect-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https:;\"" >> /app/etc/Caddyfile \
  && echo "}" >> /app/etc/Caddyfile
ENV CADDYPATH /app/ssl
VOLUME /app/etc /app/ssl
EXPOSE 80 443 2015
CMD ["/usr/local/bin/caddy", "-agree", "-conf", "/app/etc/Caddyfile"]
