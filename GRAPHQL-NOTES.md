## GRAPHQL NOTES

### TODO

- things calling @/api
- any API mutations in angular with graphql queries?
- Branding modules, application, ...
- any other things that could use caching
- Update README.md to show how to use graphql

### Errors

Handle NotFound vs AuthenticationRequired vs Forbidden vs PasswordExpired in OCI calls

- prompt for login on AuthenticationRequired
- prompt for new password on PasswordExpired (and isolate)
- just show error on Forbidden and NotFound

### THINGS TO DO

- handle auth errors and clear session
  - use apollo-link-error for finding auth errors and handling
  - https://www.apollographql.com/docs/link/links/error/
- permission services should be simplified
- do a mutation for assigning services, which should force an update on servicesAssigned

### Updating cache

#### RefetchQuery

This will run whatever queries are given to update the cache

```
  useMutation(RESELLER_ADMIN_CREATE_MUTATION, {
    refetchQueries: [{ query: RESELLER_ADMIN_LIST_QUERY, variables: { resellerId } }]
  })
```

#### Update Function

This updates the cache directly.

```
  useMutation(RESELLER_ADMIN_CREATE_MUTATION, {
    update: (store, { data: { resellerAdminCreate } }) => {
      const { resellerId } = resellerAdminCreate
      const { resellerAdmins } = store.readQuery({
        query: RESELLER_ADMIN_LIST_QUERY,
        variables: { resellerId }
      })
      store.writeQuery({
        query: RESELLER_ADMIN_LIST_QUERY,
        data: { resellerAdmins: [...resellerAdmins, resellerAdminCreate] },
        variables: { resellerId }
      })
    }
  })
}


```
