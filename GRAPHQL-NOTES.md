## GRAPHQL NOTES

### TODO

- add all existing items that are missing mutations
  - user-service.js
  - Branding modules, application, ...
  - things calling @/api
  - things that could use caching, such as system domain
- Figure out the best format for hooks for both queries and mutations.
  - Do we want it to be uniform {data, loading, error}?
  - Do we want to use the second part of mutations [update, {error, loading}]?
- Export the queries when needed
  - try to use hooks instead of actual graphql inside the components.
  - In angular put them in services.
- Update README.md to show how to use graphql

### Errors

Handle NotFound vs AuthenticationRequired vs Forbidden vs PasswordExpired in OCI calls

- prompt for login on AuthenticationRequired
- prompt for new password on PasswordExpired (and isolate)
- just show error on Forbidden and NotFound

### THINGS TO DO

Authentication

- handle auth errors and clear session
  - use apollo-link-error for finding auth errors and handling
  - https://www.apollographql.com/docs/link/links/error/
- loginWithToken for SSO
- initial refresh only if a jwt token exists and is not expired
- handle password change error

permission services should be simplified

- call all needed objects in one query
- do a mutation for assigning services, which should force an update on servicesAssigned

### Idea: Custom Hooks with passable fragments

```
export const defaultFragment = gql`
  fragment userServicesAssigned on UserServicesAssigned {
    _id
    userId
    userServices {
      serviceName
      isActive
    }
    groupServices {
      serviceName
      isActive
    }
  }
`

export const useUserServicesAssigned = (userId, fragment) {
  const query = gql`
    query userServicesAssigned($userId: String!) {
      userServicesAssigned(userId: $userId) {
        ...${fragment || defaultFragment}
      }
    }
  `
  return useQuery(query)
}

------
import { useUserServicesAssigned } from '.'
const { loading, data, error } = useUserServicesAssigned('dusty')
```

### Updating cache

#### RefetchQuery

This will run whatever queries are given to update the cache

```
export const useResellerAdminCreate = resellerId => {
  const [exec, results] = useMutation(RESELLER_ADMIN_CREATE_MUTATION, {
    refetchQueries: [{ query: RESELLER_ADMIN_LIST_QUERY, variables: { resellerId } }]
  })
  return [input => exec({ variables: { input } }), results]
}
```

#### Update Function

This updates the cache directly.

```
export const useResellerAdminCreate = () => {
  const [exec, results] = useMutation(RESELLER_ADMIN_CREATE_MUTATION, {
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
  return [input => exec({ variables: { input } }), results]
}


```
