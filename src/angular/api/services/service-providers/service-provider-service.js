import angular from 'angular'
import {
  SERVICE_PROVIDER_LIST_QUERY,
  SERVICE_PROVIDER_CREATE_MUTATION,
  SERVICE_PROVIDER_SHOW_QUERY,
  SERVICE_PROVIDER_UPDATE_MUTATION,
  SERVICE_PROVIDER_DELETE_MUTATION
} from '@/graphql'

angular.module('odin.api').factory('ServiceProviderService', service)

service.$inject = ['GraphQL']
function service(GraphQL) {
  const service = { index, show, store, update, destroy }
  return service

  function index(resellerId) {
    return GraphQL.query({
      query: SERVICE_PROVIDER_LIST_QUERY,
      variables: { resellerId }
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
