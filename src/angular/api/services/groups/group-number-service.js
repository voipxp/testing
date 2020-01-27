import angular from 'angular'

angular.module('odin.api').factory('GroupPhoneNumberSearchService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/dns/search')
  return { load:load }
  function load(serviceProviderId, groupId , q) {
    return $http.get(url(), { params: { serviceProviderId, groupId , q} }).then(response => response.data)
  }
}

