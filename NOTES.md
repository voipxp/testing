ideas

common queries can be inside custom hooks that call out to graphql

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

permission services should be simplified

- call all needed objects in one query

do a mutation for assigning services, which should force an update on servicesAssigned
