;(function() {
  angular.module('odin.common').component('pbsNotifications', {
    templateUrl: 'common/UI/alerts/notifications.component.html',
    controller: function(Notification) {
      this.$onInit = function() {
        this.notifications = Notification.notifications
      }
      this.remove = Notification.remove
    }
  })
})()
