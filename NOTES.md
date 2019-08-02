## GRAPHQL NOTES

### THINGS

- Make fragments for most calls OR make custom hooks?

### TO CREATE IN GRAPHQL

- all store items
- all existing items that are missing mutations
  - User, Group, Service Provider

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
