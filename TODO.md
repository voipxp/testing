Apollo

### Errors

Handle NotFound vs AuthenticationRequired vs Forbidden vs PasswordExpired in OCI calls

- prompt for login on AuthenticationRequired
- prompt for new password on PasswordExpired (and isolate)
- just show error on Forbidden and NotFound

### Other

- Move branding to a microservice
- Create a function to loadSessionFromStorage
- Initialize Query
  - modules
  - applications
  - template
  - settings
- Create a session context - or local in <App/>
- Can we remove this from app-timer (initialized)
- Update login to use Graphql
  - Add a session query

### Cleanup

- create a bulk user copy UI
- make lodash requires modular (https://github.com/ant-design/babel-plugin-import#readme)
  - perhaps move to dot-prop with regular ES6
    - dlv, dset https://github.com/developit/dlv
  - replace rest with es6?
