;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserCallForwardingSelectiveCriteriaService',
      UserCallForwardingSelectiveCriteriaService
    )

  function UserCallForwardingSelectiveCriteriaService($http, Route) {
    var url = Route.api('/services/users/callforwardingselective')
    var service = {
      index: index,
      create: create,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = {
      forwardToNumberSelection: [
        'Forward To Default Number',
        'Forward To Specified Number',
        'Do not forward'
      ],
      fromDnCriteriaSelection: ['Any', 'Specified Only']
    }
    return service

    function index(id) {
      return $http.get(url(id, 'criteria')).then(function(response) {
        return response.data
      })
    }

    function create(id, obj) {
      return $http.post(url(id, 'criteria'), obj).then(function(response) {
        return response.data
      })
    }

    function show(id, name) {
      return $http.get(url(id, 'criteria', name)).then(function(response) {
        return response.data
      })
    }

    function update(id, name, obj) {
      return $http.put(url(id, 'criteria', name), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(id, name) {
      return $http.delete(url(id, 'criteria', name)).then(function(response) {
        return response.data
      })
    }
  }
})()
