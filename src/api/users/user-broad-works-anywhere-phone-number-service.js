import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserBroadWorksAnywherePhoneNumberService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = {
    show: show,
    update: update,
    destroy: destroy,
    store: store
  }
  var url = Route.api('/users/broad-works-anywhere/phone-numbers')
  service.options = {}

  return service

  function store(userId, number) {
    return $http.post(url(), number).then(function(response) {
      return response.data
    })
  }

  function show(userId, phoneNumber) {
    return $http
      .get(url(), { params: { userId: userId, phoneNumber: phoneNumber } })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, phoneNumber, number) {
    return $http.put(url(), number).then(function(response) {
      return response.data
    })
  }

  function destroy(userId, phoneNumber) {
    return $http
      .delete(url(), { params: { userId: userId, phoneNumber: phoneNumber } })
      .then(function(response) {
        return response.data
      })
  }
}
