;(function() {
  angular.module('odin.group').factory('GroupCallParkService', Service)

  function Service($http, Route) {
    var url = Route.api('services', 'groups', 'callpark')

    var service = {
      recall: recall,
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

    function recall(serviceProviderId, groupId) {
      return $http
        .get(url('recall'), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(settings) {
      return $http.put(url(), settings).then(function(response) {
        return response.data
      })
    }
  }
})()
