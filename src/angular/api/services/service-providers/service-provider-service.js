import angular from 'angular'
import gql from 'graphql-tag'
import {
  SERVICE_PROVIDER_LIST_FRAGMENT,
  SERVICE_PROVIDER_SHOW_FRAGMENT
} from '@/graphql'

angular.module('odin.api').factory('ServiceProviderService', service)

service.$inject = ['$http', 'Route', '$rootScope', 'GraphQL']
function service($http, Route, $rootScope, GraphQL) {
  var url = Route.api('/service-providers')
  var service = { index, show, store, update, destroy }

  $rootScope.$on('ServiceProviderService:updated', () => index())

  const SERVICE_PROVIDER_LIST_QUERY = gql`
    query serviceProviders {
      serviceProviders {
        ...ServiceProviderListFragment
      }
      ${SERVICE_PROVIDER_LIST_FRAGMENT}
    }
  `

  const SERVICE_PROVIDER_SHOW_QUERY = gql`
    query serviceProvider($serviceProviderId: String!) {
      serviceProvider(serviceProviderId: $serviceProviderId) {
        ...ServiceProviderShowFragment
      }
      ${SERVICE_PROVIDER_SHOW_FRAGMENT}
    }
  `

  const SERVICE_PROVIDER_UPDATE_MUTATION = gql`
    mutation serviceProviderUpdate($input: ServiceProviderUpdateInput!) {
      serviceProviderUpdate(input: $input) {
        ...ServiceProviderShowFragment
      }
      ${SERVICE_PROVIDER_SHOW_FRAGMENT}
    }
  `

  return service

  function index() {
    return GraphQL.query({
      query: SERVICE_PROVIDER_LIST_QUERY
    }).then(res => res.data.serviceProviders)
  }

  function store(serviceProvider) {
    return $http.post(url(), serviceProvider).then(response => {
      return response.data
    })
  }

  function show(serviceProviderId) {
    return GraphQL.query({
      query: SERVICE_PROVIDER_SHOW_QUERY,
      variables: { serviceProviderId }
    }).then(res => res.data.serviceProvider)
  }

  function update(serviceProviderId, serviceProvider) {
    return GraphQL.mutate({
      mutation: SERVICE_PROVIDER_UPDATE_MUTATION,
      variables: { input: serviceProvider },
      refetchQueries: [{ query: SERVICE_PROVIDER_LIST_QUERY }]
    }).then(res => res.data.serviceProviderUpdate)
  }

  function destroy(serviceProviderId) {
    return $http
      .delete(url(), { params: { serviceProviderId } })
      .then(response => {
        return response.data
      })
  }
}
