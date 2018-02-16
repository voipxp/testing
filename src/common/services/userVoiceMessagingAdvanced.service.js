;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserVoiceMessagingAdvancedService',
      UserVoiceMessagingAdvancedService
    )

  function UserVoiceMessagingAdvancedService($http, Route) {
    var service = { show: show, update: update }
    service.options = {
      mailServerSelection: ['Group Mail Server', 'Personal Mail Server'],
      groupMailServerFullMailboxLimit: [
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
      personalMailServerProtocol: ['POP3', 'IMAP']
    }

    return service

    function url(id) {
      return Route.api('/services/users')(id, 'voicemessaging', 'advanced')
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
