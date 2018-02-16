;(function() {
  angular
    .module('odin.user')
    .factory('UserAnnouncementService', UserAnnouncementService)

  function UserAnnouncementService($http, Route) {
    var service = {
      index: index,
      available: available,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = { mediaTypes: ['WMA', 'WAV', '3GP', 'MOV'] }

    return service

    function url(userId, name, mediaType) {
      return Route.api('users', userId, 'announcements')(name, mediaType)
    }

    function index(userId, type) {
      var params = {}
      if (type) {
        params['type'] = type
      }
      return $http
        .get(url(userId), { params: params })
        .then(function(response) {
          return response.data
        })
    }

    function available(userId, type) {
      var params = { available: true }
      if (type) {
        params['type'] = type
      }
      return $http
        .get(url(userId), { params: params })
        .then(function(response) {
          return response.data
        })
    }

    function encodeName(name) {
      return name.replace(/\//g, '%2F')
    }

    function store(userId, announcement) {
      return $http.post(url(userId), announcement).then(function(response) {
        return response.data
      })
    }

    function show(userId, name, mediaType) {
      return $http
        .get(url(userId, encodeName(name), mediaType))
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, announcement) {
      return $http
        .put(
          url(userId, encodeName(announcement.name), announcement.mediaType),
          announcement
        )
        .then(function(response) {
          return response.data
        })
    }

    function destroy(userId, announcement) {
      return $http
        .delete(
          url(userId, encodeName(announcement.name), announcement.mediaType)
        )
        .then(function(response) {
          return response.data
        })
    }
  }
})()
