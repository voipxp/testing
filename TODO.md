TODO

- look for usage of lodash orderBy and replace it with natural
- rework session/localstorage

  - only save token to localstorage
  - on app init, if token exists, send to refresh token api
    - should return new token w/ session data
    - save new token to localstorage
    - save session data to redux
  - on logout, remove token from localstorage

- test announcement reload() on name change
- move GoogleUA to react
- implement PaasAdmin
- navbar search modals
- add SSO to login screen
- add SSO token retrieval to navbar.js
- change the bulk data resolve
  - use redux instead for storage
  - render the select users if none are selected
  - otherwise render the actual page
  - eliminate the redirect
- use Helmet to initialize the icons?

LATER

- rip out unused angular code
- figure out a good folder structure/naming convention for react components
- take a look at the redux structure
- evaluate ripping out redux-starter-kit
