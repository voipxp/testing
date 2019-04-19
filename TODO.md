TODO

- rework session/localstorage
  - only save token to localstorage
  - on app init, if token exists, send to refresh token api
    - should return new token w/ session data
    - save new token to localstorage
    - save session data to redux
  - on logout, remove token from localstorage
- test announcement reload() on name change
- implement PaasAdmin
- add SSO to login screen
- add SSO token retrieval to navbar.js
- change the bulk data resolve
  - use redux instead for storage
  - render the select users if none are selected
  - otherwise render the actual page
  - eliminate the redirect
- use Helmet to initialize the icons?
- add default assets to assets dir (logo, favicon)

LATER

- fontawesome buttons
- figure out a good folder structure/naming convention for react components
- take a look at the redux structure
- redo the virtual services page to use pbsComponent
- maybe use Permissions on user service view

ANGULAR DYNAMICALLY RENDER PAGE

- /:spId/:gpId/:uId/:component?/:subcomponent?
  `<pbs-component component="component" />`
