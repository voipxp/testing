import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupCallRecordsService', GroupCallRecordsService)

GroupCallRecordsService.$inject = ['$http', 'Route', 'Session', '$window']
function GroupCallRecordsService($http, Route, Session, $window) {
  var url = Route.api('/groups/call-records')
  var service = {
    related,
    detail,
    download,
    received,
    placed,
    missed,
    users,
    stats
  }

  service.options = {
    reportType: ['detail', 'received', 'placed', 'missed', 'users', 'stats']
  }

  return service

  function detail(serviceProviderId, groupId, startTime, endTime, bypass) {
    return $http
      .get(url('detail'), {
        params: {
          serviceProviderId,
          groupId,
          startTime,
          endTime,
          limit: bypass ? 'false' : null
        }
      })
      .then(res => res.data)
  }

  // construct url to download csv file
  function download(serviceProviderId, groupId, startTime, endTime) {
    const params = {
      serviceProviderId: encodeURIComponent(serviceProviderId),
      groupId: encodeURIComponent(groupId),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      _authToken: Session.data('token')
    }
    const query = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')
    $window.open(`${url('download')}?${query}`)
  }

  function received(serviceProviderId, groupId, startTime, endTime) {
    return $http
      .get(url('received'), {
        params: { serviceProviderId, groupId, startTime, endTime }
      })
      .then(res => res.data)
  }

  function related(
    serviceProviderId,
    groupId,
    startTime,
    endTime,
    relatedCallIdReason
  ) {
    return $http
      .get(url('related'), {
        params: {
          serviceProviderId,
          groupId,
          relatedCallIdReason,
          startTime: startTime.toJSON(),
          endTime: endTime.toJSON()
        }
      })
      .then(res => res.data)
  }

  function placed(serviceProviderId, groupId, startTime, endTime) {
    return $http
      .get(url('placed'), {
        params: { serviceProviderId, groupId, startTime, endTime }
      })
      .then(res => res.data)
  }

  function missed(serviceProviderId, groupId, startTime, endTime) {
    return $http
      .get(url('missed'), {
        params: { serviceProviderId, groupId, startTime, endTime }
      })
      .then(res => res.data)
  }

  function users(serviceProviderId, groupId, startTime, endTime) {
    return $http
      .get(url('users'), {
        params: { serviceProviderId, groupId, startTime, endTime }
      })
      .then(res => res.data)
  }

  function stats(serviceProviderId, groupId, startTime, endTime) {
    return $http
      .get(url('stats'), {
        params: { serviceProviderId, groupId, startTime, endTime }
      })
      .then(res => res.data)
  }
}
