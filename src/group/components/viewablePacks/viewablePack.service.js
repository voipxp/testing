;(function() {
  angular
    .module('odin.group')
    .factory('GroupViewablePackService', GroupViewablePackService)

  function GroupViewablePackService($http, Route, $rootScope) {
    var service = { index, services, store, show, update, destroy, users, bulk }
    var url = Route.api('/groups/viewable-packs')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function services(serviceProviderId, groupId) {
      return $http
        .get(url('services'), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, pack) {
      return $http
        .post(url(), { ...pack, serviceProviderId, groupId })
        .then(res => {
          $rootScope.$emit('GroupViewablePackService:updated')
          return res.data
        })
    }

    function show(serviceProviderId, groupId, id) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, id } })
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, pack) {
      return $http
        .put(url(), { ...pack, serviceProviderId, groupId })
        .then(res => {
          $rootScope.$emit('GroupViewablePackService:updated')
          return res.data
        })
    }

    function destroy(serviceProviderId, groupId, id) {
      return $http
        .delete(url(), { params: { serviceProviderId, groupId, id } })
        .then(res => {
          $rootScope.$emit('GroupViewablePackService:updated')
          return res.data
        })
    }

    function users(serviceProviderId, groupId) {
      return $http
        .get(url('bulk'), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function bulk(serviceProviderId, groupId, data) {
      return $http.put(url('bulk'), data).then(res => res.data)
    }
  }
})()
