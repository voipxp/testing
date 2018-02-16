;(function() {
  angular.module('odin.group').factory('GroupCallParkService', Service)

  function Service($http, Route) {
    var service = {
      huntgroups: huntgroups,
      show: show,
      update: update
    }

    service.options = {
      recallTo: [
        'Parking User Only',
        'Parking User Then Alternate User',
        'Alternate User Only'
      ],
      recallTimer: {
        min: 30,
        max: 600
      },
      displayTimer: {
        min: 2,
        max: 15
      },
      ringPattern: [
        'Normal',
        'Long-Long',
        'Short-Short-Long',
        'Short-Long-Short'
      ]
    }
    return service

    function url(serviceProviderId, groupId, sub) {
      return Route.api(
        'services',
        'groups',
        serviceProviderId,
        groupId,
        'callpark',
        sub
      )()
    }

    function huntgroups(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId, 'huntgroups'))
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, settings) {
      return $http
        .put(url(serviceProviderId, groupId), settings)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
