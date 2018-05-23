;(function() {
  angular
    .module('odin.group')
    .factory('GroupViewablePackService', GroupViewablePackService)

  function GroupViewablePackService($http, Route, $rootScope) {
    var service = {
      index: index,
      services: services,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      users: users,
      bulk: bulk
    }
    return service

    function url(serviceProviderId, groupId, viewablePackId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'viewablepacks'
      )(viewablePackId)
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function services(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId, 'services'))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, pack) {
      return $http
        .post(url(serviceProviderId, groupId), pack)
        .then(function(response) {
          $rootScope.$emit('GroupViewablePackService:updated')
          return response.data
        })
    }

    function show(serviceProviderId, groupId, packId) {
      return $http
        .get(url(serviceProviderId, groupId, packId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, pack) {
      return $http
        .put(url(serviceProviderId, groupId, pack.id), pack)
        .then(function(response) {
          $rootScope.$emit('GroupViewablePackService:updated')
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, pack) {
      return $http
        .delete(url(serviceProviderId, groupId, pack.id))
        .then(function(response) {
          $rootScope.$emit('GroupViewablePackService:updated')
          return response.data
        })
    }

    function bulkUrl(serviceProviderId, groupId) {
      return Route.api()(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'viewablepacksbulk'
      )
    }

    function users(serviceProviderId, groupId) {
      return $http
        .get(bulkUrl(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function bulk(serviceProviderId, groupId, data) {
      return $http
        .put(bulkUrl(serviceProviderId, groupId), data)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
