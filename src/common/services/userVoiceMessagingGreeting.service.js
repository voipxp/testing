;(function() {
  angular
    .module('odin.common')
    .factory('UserVoiceMessagingGreetingService', Service)

  function Service($http, Route) {
    var service = { show: show, update: update }
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

    function url(id) {
      return Route.api('/services/users')(id, 'voicemessaging', 'greetings')
    }

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(id, obj) {
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
