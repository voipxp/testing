import angular from 'angular'
import gql from 'graphql-tag'
angular.module('odin.api').factory('GroupDomainService', GroupDomainService)

const GROUP_DOMAINS_QUERY = gql`
  query groupDomains($serviceProviderId: String!, $groupId: String!) {
    groupDomains(serviceProviderId: $serviceProviderId, groupId: $groupId) {
      _id
      serviceProviderId
      groupId
      default
      domains
    }
  }
`

GroupDomainService.$inject = ['GraphQL']
function GroupDomainService(GraphQL) {
  const service = { index: index }
  return service

  function index(serviceProviderId, groupId) {
    return GraphQL.query({
      query: GROUP_DOMAINS_QUERY,
      variables: { serviceProviderId, groupId }
    }).then(res => res.data.groupDomains)
  }
}
