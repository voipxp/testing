/*
  - Calls angular limitTo filter passing in the limit and offset
    - Requires an object with a limit and offset property
  - The pbsPagination component providers one in a callback
*/
;(function() {
  angular.module('odin.common').filter('paginate', Paginate)

  function Paginate(limitToFilter) {
    return function(item, pager) {
      return limitToFilter(item, pager && pager.limit, pager && pager.offset)
    }
  }
})()
