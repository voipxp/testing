## GRAPHQL NOTES

### QUERY HOOK API

Straight Up

```
  const useThing = (opts = {}) => {
    return useQuery(QUERY, opts)
  }

  const { data } = useThing({variables: {thingId }})
  const thing = data && data.thing
```

Helper on variables

```
  const useThing = (variables, opts = {}) => {
    return useQuery(QUERY, {variables, ...opts})
  }

  const { data } = useThing()
  const thing = data && data.thing
```

Helper on data

```
  const useThing = (variables, opts = {}) => {
    const query = useQuery(QUERY, {variables, ...opts})
    const data = query.data && query.data.thing
    return {...query, data}
  }

  const { data } = useThing()
  // data === thing
```

### MUTATION HOOK API

Straight Up

```
  const useThingUpdate = (opts = {}) => {
    return useMutation(QUERY, opts)
  }

  const [update] = useThingUpdate()
  update({variables: { input: thing }})
```

Helper on Variables

```
  const useThingUpdate = (opts = {}) => {
    const [exec, results] = useMutation(QUERY, opts)
    const mutate = useCallback((variables, opts = {}) => exec({variables, ...opts}))
    return [mutate, results]
  }

  const [update, { data }] = useThingUpdate()
  await update({input: thing})
  console.log(data.thingUpdate)
```

Helper on Variables and Results

```
  const useThingUpdate = (opts = {}) => {
    const [exec, results] = useMutation(QUERY, opts)
    const mutate = useCallback((variables, opts = {}) => exec({variables, ...opts}))
    const data = results.data && results.data.thingUpdate
    return [mutate, {...results, data}]
  }

  const [update, { data }] = useThingUpdate()
  await update({input: thing})
  console.log(data)
```

### TODO

- any API mutations with graphql queries left?
- Branding modules, application, ...
- things calling @/api
- any other things that could use caching

- Figure out the best format for hooks for both queries and mutations.

  - Do we want it to be uniform {data, loading, error}?
  - Do we want to use the second part of mutations [update, {error, loading}]?

- Update README.md to show how to use graphql

- SSO Token Login

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
  return useMutation(RESELLER_ADMIN_CREATE_MUTATION, {
    refetchQueries: [{ query: RESELLER_ADMIN_LIST_QUERY, variables: { resellerId } }]
  })
}
```

#### Update Function

This updates the cache directly.

```
export const useResellerAdminCreate = () => {
  return useMutation(RESELLER_ADMIN_CREATE_MUTATION, {
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
