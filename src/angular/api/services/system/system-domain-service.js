import angular from 'angular'
import gql from 'graphql-tag'
angular.module('odin.api').factory('SystemDomainService', SystemDomainService)

const SYSTEM_DOMAIN_LIST_QUERY = gql`
  query systemDomains {
    systemDomains {
      default
      domains
    }
  }
`
SystemDomainService.$inject = ['GraphQL']
function SystemDomainService(GraphQL) {
  const service = { index }
  return service

  function index() {
    return GraphQL.query({ query: SYSTEM_DOMAIN_LIST_QUERY }).then(res => res.data.systemDomains)
  }
}
