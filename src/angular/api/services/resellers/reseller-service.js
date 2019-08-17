import angular from 'angular'
import {
  RESELLER_LIST_QUERY,
  RESELLER_CREATE_MUTATION,
  RESELLER_UPDATE_MUTATION,
  RESELLER_DELETE_MUTATION
} from '@/graphql/reseller'

angular.module('odin.api').factory('ResellerService', Service)
Service.$inject = ['GraphQL']

function Service(GraphQL) {
  const service = { index, store, update, destroy }
  return service

  function index() {
    return GraphQL.query({ query: RESELLER_LIST_QUERY }).then(res => res.data.resellers)
  }

  function store(reseller) {
    return GraphQL.mutate({
      mutation: RESELLER_CREATE_MUTATION,
      variables: { input: reseller }
    }).then(res => res.resellerCreate)
  }

  function update(reseller) {
    return GraphQL.mutate({
      mutation: RESELLER_UPDATE_MUTATION,
      variables: { input: reseller }
    }).then(res => res.data.resellerUpdate)
  }

  function destroy(resellerId) {
    return GraphQL.mutate({
      mutation: RESELLER_DELETE_MUTATION,
      variables: { resellerId },
      refetchQueries: [{ query: RESELLER_LIST_QUERY }]
    }).then(res => res.data.resellerDelete)
  }
}
