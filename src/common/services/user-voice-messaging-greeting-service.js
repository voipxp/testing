import angular from 'angular'

angular
  .module('odin.common')
  .factory('UserVoiceMessagingGreetingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show: show, update: update }

  var url = Route.api('/users/voice-messaging/greetings')

  service.options = {
    busyAnnouncementSelection: ['Default', 'Personal'],
    noAnswerAnnouncementSelection: [
      'Default',
      'Personal',
      'Alternate01',
      'Alternate02',
      'Alternate03'
    ],
    disableMessageDepositAction: ['Disconnect', 'Forward'],
    noAnswerNumberOfRings: [
      0,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    greetingOnlyForwardDestination: {
      min: 1,
      max: 161
    }
  }

  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, obj) {
    return $http.put(url(), obj).then(function(response) {
      return response.data
    })
  }
}
