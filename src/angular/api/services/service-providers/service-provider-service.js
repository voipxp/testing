import angular from 'angular'
import gql from 'graphql-tag'
import {
  SERVICE_PROVIDER_LIST_FRAGMENT,
  SERVICE_PROVIDER_SHOW_FRAGMENT
} from '@/graphql'

angular.module('odin.api').factory('ServiceProviderService', service)

service.$inject = ['$http', 'Route', '$rootScope', 'GraphQL']
function service($http, Route, $rootScope, GraphQL) {
  const service = { index, show, store, update, destroy }

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

  const SERVICE_PROVIDER_CREATE_MUTATION = gql`
  mutation serviceProviderCreate($input: ServiceProviderCreateInput!) {
    serviceProviderCreate(input: $input) {
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

  const SERVICE_PROVIDER_DELETE_MUTATION = gql`
    mutation serviceProviderDelete($serviceProviderId: String!) {
      serviceProviderDelete(serviceProviderId: $serviceProviderId) {
        serviceProviderId
      }
    }
  `

  return service

  function index() {
    return GraphQL.query({
      query: SERVICE_PROVIDER_LIST_QUERY
    }).then(res => res.data.serviceProviders)
  }

  function store(serviceProvider) {
    return GraphQL.mutate({
      mutation: SERVICE_PROVIDER_CREATE_MUTATION,
      variables: { input: serviceProvider },
      refetchQueries: [{ query: SERVICE_PROVIDER_LIST_QUERY }]
    }).then(res => res.data.serviceProviderCreate)
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
    return GraphQL.mutate({
      mutation: SERVICE_PROVIDER_DELETE_MUTATION,
      variables: { serviceProviderId },
      refetchQueries: [{ query: SERVICE_PROVIDER_LIST_QUERY }]
    }).then(res => res.data.serviceProviderDelete)
  }
}
