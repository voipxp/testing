;(function() {
  angular.module('odin.group').factory('GroupAnnouncementService', Service)

  function Service($http, Route) {
    var service = { index, available, store, show, update, destroy }
    var url = Route.api2('/groups/announcements')
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
        .then(res => res.data)
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
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, announcement) {
      return $http.post(url(), announcement).then(res => res.data)
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
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, announcement) {
      return $http.put(url(), announcement).then(res => res.data)
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
        .then(res => res.data)
    }
  }
})()
