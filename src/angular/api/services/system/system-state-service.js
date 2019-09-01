import angular from 'angular'
import gql from 'graphql-tag'

const SYSTEM_STATE_OR_PROVINCES_QUERY = gql`
  query systemStateOrProvinces {
    systemStateOrProvinces {
      stateOrProvinces {
        key
        displayName
      }
    }
  }
`

angular.module('odin.api').factory('SystemStateService', Service)

Service.$inject = ['GraphQL']
function Service(GraphQL) {
  const service = { index }
  return service

  function index() {
    return GraphQL.query({ query: SYSTEM_STATE_OR_PROVINCES_QUERY }).then(
      res => res.data.systemStateOrProvinces.stateOrProvinces
    )
  }
}
