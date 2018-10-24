# ODiN Web

Odin API Frontend.

### Usage

All source code lives in src/

To compile code
```
> gulp
```

To compile production code
```
> NODE_ENV=production gulp
```

The code will be compiled and placed in dist/ by default.  You may override the location of the dist folder by passing in the APP_DIST environmental variable.
```
APP_DIST=../api/public
```

By default the path to the API is local eg: /api/v2.  If you are running the frontend code seperately from the API code, you may pass in API_BASE to configure the base of the API path. All routes inside the app will be prefixed with API_BASE.
```
API_BASE=http://127.0.0.1:9000/api/v2
```

### Yarn Commands
Some helpful yarn commands.

```
> yarn run lint   # lint all the js files
> yarn run fix    # fix all the js files
> yarn run build  # build a production dist
> yarn run watch  # watch src files and rebuild on changes
> yarn run serve  # serve a live version of dist with hot-reload
```

### Environmental Variables

The build process excepts two environmental variables.
```
# path where compiled files should go
APP_DIST=/path/to/public
# base path to the API
API_BASE=http://127.0.0.1:80
```


### Docker

The Dockerfile generats a Caddyserver app to serve the static HTML and uses fastcgi to proxy other requests to the PHP backend.

```
docker build -t odin.web .
```

You may specify a custom Caddyfile by mounting it in the image to /app/etc
```
docker run -v $(pwd)/Caddyfile:/app/etc/Caddyfile odin.web
```

Caddy runs by default on port 2015.
```
docker run -p 2015:2015 odin.web
```

By default SSL certificates are stored in /app/ssl.  You may wish to mount this directory to the host machine or make it a named volume to persist containers.

```
docker run -v ssl:/app/ssl odin.web
```

The HTML files are served from /app/html.  You can mount this directory overwrite the code with a local copy
```
docker run -v $(pwd):/app/html odin.web
```


#### Example docker-compose.yml
version: '3.0'
services:
  proxy:
    container_name: web
    image: odin.web
    ports:
      - "2015:2015"
    volumes:
      - ./Caddyfile:/app/data/Caddyfile
  api
    container_name: api
    image: odin.api
    command: php-fpm7 -F
