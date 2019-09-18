import angular from 'angular'
import { client } from '@/apollo'

angular.module('odin.common').factory('GraphQL', GraphQL)

GraphQL.$inject = ['$q', '$timeout']
function GraphQL($q, $timeout) {
  return { query, mutate, watchQuery }

  function query(args) {
    return $q((resolve, reject) =>
      client
        .query(args)
        .then(data => resolve(angular.copy(data)))
        .catch(reject)
    )
  }

  function mutate(args) {
    return $q((resolve, reject) => {
      client
        .mutate(args)
        .then(data => resolve(angular.copy(data)))
        .catch(reject)
    })
  }

  function watchQuery(args, callback) {
    client.watchQuery(args).subscribe(result => {
      $timeout(() => callback(angular.copy(result.data)), 0)
    })
  }
}
