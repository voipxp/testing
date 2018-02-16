;(function() {
  angular
    .module('odin.group')
    .factory('GroupAnnouncementService', GroupAnnouncementService)

  function GroupAnnouncementService($http, Route) {
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

    function url(serviceProviderId, groupId, name, mediaType) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'announcements'
      )(name, mediaType)
    }

    function index(serviceProviderId, groupId, type) {
      var params = {}
      if (type) {
        params['announcementType'] = type
      }
      return $http
        .get(url(serviceProviderId, groupId), { params: params })
        .then(function(response) {
          return response.data
        })
    }

    function available(serviceProviderId, groupId, type) {
      var params = { available: true }
      if (type) {
        params['announcementType'] = type
      }
      return $http
        .get(url(serviceProviderId, groupId), { params: params })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, announcement) {
      return $http
        .post(url(serviceProviderId, groupId), announcement)
        .then(function(response) {
          return response.data
        })
    }

    function encodeName(name) {
      return name.replace(/\//g, '%2F')
    }

    function show(serviceProviderId, groupId, name, mediaType) {
      return $http
        .get(url(serviceProviderId, groupId, encodeName(name), mediaType))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, announcement) {
      return $http
        .put(
          url(
            serviceProviderId,
            groupId,
            encodeName(announcement.name),
            announcement.mediaType
          ),
          announcement
        )
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, announcement) {
      return $http
        .delete(
          url(
            serviceProviderId,
            groupId,
            encodeName(announcement.name),
            announcement.mediaType
          )
        )
        .then(function(response) {
          return response.data
        })
    }
  }
})()
