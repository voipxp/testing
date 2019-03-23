/*
  - Calls angular limitTo filter passing in the limit and offset
    - Requires an object with a limit and offset property
  - The pbsPagination component providers one in a callback
*/
import angular from 'angular'

angular.module('odin.common').filter('paginate', Paginate)

Paginate.$inject = ['limitToFilter']
function Paginate(limitToFilter) {
  return function(item, pager) {
    return limitToFilter(item, pager && pager.limit, pager && pager.offset)
  }
}
