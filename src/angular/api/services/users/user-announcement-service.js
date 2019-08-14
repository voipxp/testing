import angular from 'angular'

angular.module('odin.api').factory('UserAnnouncementService', UserAnnouncementService)

UserAnnouncementService.$inject = ['$http', 'Route']
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
  var url = Route.api('/users/announcements')
  return service

  function index(userId, type) {
    var params = { userId: userId }
    if (type) {
      params['type'] = type
    }
    return $http.get(url(), { params: params }).then(function(response) {
      return response.data
    })
  }

  function available(userId, type) {
    var params = { userId: userId, available: true }
    if (type) {
      params['type'] = type
    }
    return $http.get(url(), { params: params }).then(function(response) {
      return response.data
    })
  }

  function store(userId, announcement) {
    return $http.post(url(), announcement).then(function(response) {
      return response.data
    })
  }

  function show(userId, name, mediaType) {
    return $http
      .get(url(), {
        params: { userId: userId, name: name, mediaType: mediaType }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, announcement) {
    return $http.put(url(), announcement).then(function(response) {
      return response.data
    })
  }

  function destroy(userId, announcement) {
    return $http
      .delete(url(), {
        params: {
          userId: userId,
          name: announcement.name,
          mediaType: announcement.mediaType
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
