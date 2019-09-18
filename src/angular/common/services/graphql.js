import angular from 'angular'
import { client } from '@/apollo'

angular.module('odin.common').factory('GraphQL', GraphQL)

GraphQL.$inject = ['$q', '$timeout']
function GraphQL($q, $timeout) {
  return { query, mutate, watchQuery }

  function query(args) {
    console.log('calledQuery', args)
    return $q((resolve, reject) =>
      client
        .query(args)
        .then(resolve)
        .catch(reject)
    )
  }

  function mutate(args) {
    console.log('calledMutate', args)
    return $q((resolve, reject) => {
      client
        .mutate(args)
        .then(resolve)
        .catch(reject)
    })
  }

  function watchQuery(args, callback) {
    client.watchQuery(args).subscribe(result => {
      $timeout(() => callback(result.data), 0)
    })
  }
}
