import angular from 'angular'

angular.module('odin.group').factory('GroupAnnouncementService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, available, store, show, update, destroy }
  var url = Route.api('/groups/announcements')
  service.options = { mediaTypes: ['WMA', 'WAV', '3GP', 'MOV'] }

  return service

  function index(serviceProviderId, groupId, announcementType) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId,
          groupId,
          announcementType
        }
      })
      .then(response => response.data)
  }

  function available(serviceProviderId, groupId, announcementType) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId,
          groupId,
          announcementType,
          available: true
        }
      })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, announcement) {
    return $http.post(url(), announcement).then(response => response.data)
  }

  function show(serviceProviderId, groupId, name, mediaType) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId,
          groupId,
          name,
          mediaType
        }
      })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, announcement) {
    return $http.put(url(), announcement).then(response => response.data)
  }

  function destroy(serviceProviderId, groupId, announcement) {
    return $http
      .delete(url(), {
        params: {
          serviceProviderId,
          groupId,
          name: announcement.name,
          mediaType: announcement.mediaType
        }
      })
      .then(response => response.data)
  }
}
