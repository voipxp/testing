import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.ui').component('pbsNotifications', { template, controller })

controller.$inject = ['Notification']
function controller(Notification) {
  this.$onInit = function() {
    this.notifications = Notification.notifications
  }
  this.remove = Notification.remove
}
