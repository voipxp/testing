# ODiN Web

## Requirements

You must have nodejs >= 8 installed along with the yarn package manager. It is recommended to use a code editor that supports eslint and prettier for linting and formatting the code automatically on save.

## Installation

Install the required dependencies with yarn package manager.

```
yarn
```

## Environmental Variables

The build and dev scripts accept several environmental variables. By default the builds are placed in ./dist and the url to the API is a relative path. However, you may override those settings with environmental variables. For your convenience you may also place these environmental variables in a .env file located in the project root.

```
APP_DIST=./dist                   # path for compiled files  (/dist)
API_URL=https://myserver.com      # URL to odin API          (/)
API_PORT=8000                     # local dev api port       (80)
EVENT_PORT=4000                   # local dev event port     (4000)
AUDIO_PORT=5000                   # local dev audio port     (5000)
```

## Commands

Some helpful commands for development.

```
yarn lint   # lint all the js files
yarn fix    # auto-fix lint errors if possible
yarn format # format all the code with prettier
yarn build  # build a production bundle
yarn watch  # watch src files and rebuild on changes
yarn dev    # serve a live version of dist with hot-reload
```

## Development

The typical development process is to run **yarn watch** and **yarn dev** in two seperate terminal sessions. **Watch** bundles all the src files into the dist directory, watches for changes, and re-bundles when any files are modified. **Dev** starts up a local web server pointed to the dist directory and automatically reloads the browser when it detects changes.

If you are working on the front-end and also running the API locally, then you may need to adjust the \*\_PORT environmental variables to point to the proper port running on your local machine.

```
API_PORT=8000
```

If you are working on the front-end code and the API is hosted remotely, then you should change the API_URL environmental parameter to point to your remote instance of the API. The \*\_PORT variables are not needed and can remain commented out.

```
API_URL=https://portal.odinapi.net
```
