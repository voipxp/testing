;(function() {
  angular
    .module('odin.common')
    .factory('UserVoiceMessagingAdvancedService', Service)

  function Service($http, Route) {
    var service = { show: show, update: update }

    var url = Route.api2('/users/voice-messaging/advanced')

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
})()
