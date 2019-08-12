import angular from 'angular'
import {
  USER_SERVICES_QUERY,
  USER_SERVICES_ASSIGNED_QUERY,
  USER_SERVICES_VIEWABLE_QUERY,
  USER_SERVICES_UPDATE_MUTATION
} from '@/graphql'
angular.module('odin.api').factory('UserServiceService', UserServiceService)

UserServiceService.$inject = ['$http', 'Route', 'GraphQL']
function UserServiceService($http, Route, GraphQL) {
  var service = {
    show: show,
    update: update,
    assigned: assigned,
    viewable: viewable
  }
  return service

  function show(userId) {
    return GraphQL.query({
      query: USER_SERVICES_QUERY,
      variables: { userId }
    }).then(res => res.data.userServices)
  }

  function assigned(userId) {
    return GraphQL.query({
      query: USER_SERVICES_ASSIGNED_QUERY,
      variables: { userId }
    }).then(res => res.data.userServicesAssigned)
  }

  function viewable(userId) {
    return GraphQL.query({
      query: USER_SERVICES_VIEWABLE_QUERY,
      variables: { userId }
    }).then(res => res.data.userServicesViewable)
  }

  function update(service) {
    return GraphQL.mutate({
      mutation: USER_SERVICES_UPDATE_MUTATION,
      variables: { input: service },
      refetchQueries: [
        {
          query: USER_SERVICES_ASSIGNED_QUERY,
          variables: { userId: service.userId }
        }
      ]
    }).then(res => res.data.serviceProviderCreate)
  }
}
