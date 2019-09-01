import angular from 'angular'
import gql from 'graphql-tag'
angular.module('odin.api').factory('ServiceProviderDomainService', ServiceProviderDomainService)

const SERVICE_PROVIDER_DOMAINS_QUERY = gql`
  query serviceProviderDomains($serviceProviderId: String!) {
    serviceProviderDomains(serviceProviderId: $serviceProviderId) {
      _id
      serviceProviderId
      default
      domains
    }
  }
`

ServiceProviderDomainService.$inject = ['GraphQL']
function ServiceProviderDomainService(GraphQL) {
  const service = { index }
  return service

  function index(serviceProviderId) {
    return GraphQL.query({
      query: SERVICE_PROVIDER_DOMAINS_QUERY,
      variables: { serviceProviderId }
    }).then(res => res.data.serviceProviderDomains)
  }
}
