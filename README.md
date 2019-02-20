# ODiN Web

## Requirements

You must have nodejs >= 8 installed along with the yarn package manager. To begin development run yarn to install the requirements. It is recommended to use a code editor that supports eslint and prettier for linting and formatting the code automatically on save.

## Installation

Install the required dependencies with yarn package manager.

```
yarn
```

## Environmental Variables

The build and dev scripts accept several environmental variables. By default the builds are placed in ./dist and the API URL is a relative path. You may override those with environmental variables. For your convenience you may also place these environmental variables in a .env file located in the project root.

In general these don't need to be set, however, if you are developing locally and need to specify the path or ports to access certain services you can utilize these variables. For example, if the API is running on your local machine on a different port, set the API_PORT to that port. If you are developing but the API is located at a remote URL, then update API_URL.

```
APP_DIST=./dist                   # path for compiled files
API_URL=https://myserver.com      # URL to odin API
API_PORT=8000                     # local dev api port
EVENT_PORT=4000                   # local dev event port
AUDIO_PORT=5000                   # local dev audio port
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

## Usage

You will typicall run **yarn watch** and **yarn dev** in two seperate terminal sessions. **Watch** will bundle all the files into the dist directory, watch for changes, and automatically reload the browser on changes. **Dev** will start up a local web server that will automatically reload when it detects changes.

If you are working on the front-end code seperate from the API, you should change the API_URL environmental parameter to point to your remote instance of the API.

eg:

```
API_URL=https://portal.odinapi.net
```
