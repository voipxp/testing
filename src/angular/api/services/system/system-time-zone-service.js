import angular from 'angular'
import gql from 'graphql-tag'

angular.module('odin.api').factory('SystemTimeZoneService', Service)

const SYSTEM_TIME_ZONE_QUERY = gql`
  query systemTimeZones {
    systemTimeZones {
      timeZones {
        key
        displayName
      }
    }
  }
`

Service.$inject = ['GraphQL']
function Service(GraphQL) {
  const service = { index }
  return service

  function index() {
    return GraphQL.query({
      query: SYSTEM_TIME_ZONE_QUERY
    }).then(res => res.data.systemTimeZones.timeZones)
  }
}
