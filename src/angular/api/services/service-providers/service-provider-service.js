import angular from 'angular'
import gql from 'graphql-tag'

angular.module('odin.api').factory('ServiceProviderService', service)

service.$inject = ['$http', 'Route', '$rootScope', 'CacheFactory', 'GraphQL']
function service($http, Route, $rootScope, CacheFactory, GraphQL) {
  var url = Route.api('/service-providers')
  var service = { index, show, store, update, destroy }
  var cache = CacheFactory('ServiceProviderService')

  $rootScope.$on('ServiceProviderService:updated', clearCache)

  return service

  function clearCache() {
    cache.removeAll()
  }

  function index() {
    const query = gql`
      query serviceProviders {
        serviceProviders {
          _id
          serviceProviderId
          serviceProviderName
          isEnterprise
        }
      }
    `
    return GraphQL.query({
      query,
      fetchPolicy: 'network-only'
    }).then(res => res.data.serviceProviders)
  }

  function store(serviceProvider) {
    return $http.post(url(), serviceProvider).then(response => {
      clearCache()
      return response.data
    })
  }

  function show(serviceProviderId) {
    const query = gql`
      query serviceProvider($serviceProviderId: String!) {
        serviceProvider(serviceProviderId: $serviceProviderId) {
          _id
          serviceProviderId
          serviceProviderName
          isEnterprise
          defaultDomain
          supportEmail
          useCustomRoutingProfile
          useServiceProviderLanguages
          contact {
            contactName
            contactNumber
            contactEmail
          }
          address {
            addressLine1
            addressLine2
            city
            stateOrProvince
            stateOrProvinceDisplayName
            zipOrPostalCode
            country
          }
        }
      }
    `
    return GraphQL.query({
      query,
      variables: { serviceProviderId },
      fetchPolicy: 'network-only'
    }).then(res => res.data.serviceProvider)
  }

  function update(serviceProviderId, serviceProvider) {
    return $http.put(url(), serviceProvider).then(response => {
      clearCache()
      return response.data
    })
  }

  function destroy(serviceProviderId) {
    return $http
      .delete(url(), { params: { serviceProviderId } })
      .then(response => {
        clearCache()
        return response.data
      })
  }
}
