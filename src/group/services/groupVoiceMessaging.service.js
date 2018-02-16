;(function() {
  angular
    .module('odin.group')
    .factory('GroupVoiceMessagingService', GroupVoiceMessagingService)

  function GroupVoiceMessagingService($http, Route) {
    var service = { show: show, update: update }
    service.options = {
      useMailServerSetting: ['System Mail Server', 'Group Mail Server'],
      mailServerNetAddress: { minLength: 1, maxLength: 80 },
      mailServerProtocol: ['POP3', 'IMAP'],
      maxMailboxLengthMinutes: [
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900
      ],
      holdPeriodDays: [0, 1, 2, 3, 4, 5, 6, 7, 15, 30, 60]
    }

    return service

    function url(serviceProviderId, groupId) {
      return Route.api('/services/groups')(
        serviceProviderId,
        groupId,
        'voicemessaging'
      )
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, obj) {
      return $http
        .put(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
