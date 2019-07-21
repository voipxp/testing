import angular from 'angular'
import { client } from '@/apollo'

angular.module('odin.common').factory('GraphQL', GraphQL)

GraphQL.$inject = ['$q']
function GraphQL($q) {
  return { query }

  function query(args) {
    return $q((resolve, reject) =>
      client
        .query(args)
        .then(resolve)
        .catch(reject)
    )
  }
}
