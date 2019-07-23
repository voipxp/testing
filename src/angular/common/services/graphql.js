import angular from 'angular'
import { client } from '@/apollo'

angular.module('odin.common').factory('GraphQL', GraphQL)

GraphQL.$inject = ['$q', '$timeout']
function GraphQL($q, $timeout) {
  return { query, watchQuery }

  function query(args) {
    return $q((resolve, reject) =>
      client
        .query(args)
        .then(resolve)
        .catch(reject)
    )
  }

  function watchQuery(args, callback) {
    client.watchQuery(args).subscribe(result => {
      console.log('got result', result)
      $timeout(callback, 0)
    })
  }
}
