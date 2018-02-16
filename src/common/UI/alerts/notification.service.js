;(function() {
  angular.module('odin.common').factory('Notification', function($timeout) {
    var ALERT_TIMEOUT = 5000
    var notifications = []
    var service = {
      primary: primary,
      link: link,
      info: info,
      success: success,
      warning: warning,
      danger: danger,
      notifications: notifications,
      add: add,
      remove: remove
    }
    return service

    function add(type, message) {
      var notification = { type: type, message: parse(message) }
      notifications.push(notification)
      if (type !== 'is-danger') {
        notification.timeout = $timeout(function() {
          remove(notification)
        }, ALERT_TIMEOUT)
      }
    }

    function remove(notification) {
      $timeout.cancel(notification.timeout)
      _.remove(notifications, notification)
    }

    function primary(message) {
      add('is-primary', message)
    }

    function link(message) {
      add('is-link', message)
    }

    function info(message) {
      add('is-info', message)
    }

    function success(message) {
      add('is-success', message)
    }

    function warning(message) {
      add('is-warning', message)
    }

    function danger(message) {
      add('is-danger', message)
    }

    function parse(message) {
      if (!message) return 'Unknown Error'
      if (message.data) return parse(message.data)
      var error = message.error || message.message || message
      return error.toString()
    }
  })
})()
