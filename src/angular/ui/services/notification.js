// import _ from 'lodash'
import angular from 'angular'
import { Alert } from '@/utils/alerts'

angular.module('odin.ui').factory('Notification', () => Alert)

// Notification.$inject = ['$timeout', '$ngRedux']
// function Notification($timeout, $ngRedux) {
//   const ALERT_TIMEOUT = 5000
//   const notifications = []
//   const service = {
//     primary: primary,
//     link: link,
//     info: info,
//     success: success,
//     warning: warning,
//     danger: danger,
//     notifications: notifications,
//     add: add,
//     remove: remove
//   }
//   return service

//   function add(type, message, timeout) {
//     timeout = timeout || ALERT_TIMEOUT
//     const notification = { type: type, message: parse(message) }
//     $timeout(function() {
//       notifications.push(notification)
//     }, 1)
//     notification.timeout = $timeout(function() {
//       remove(notification)
//     }, timeout)
//     return notification
//   }

//   function remove(notification) {
//     if (!notification) return
//     $timeout.cancel(notification.timeout)
//     $timeout(function() {
//       _.remove(notifications, notification)
//     }, 1)
//   }

//   function primary(message, timeout) {
//     return add('is-primary', message, timeout)
//   }

//   function link(message, timeout) {
//     return add('is-link', message, timeout)
//   }

//   function info(message, timeout) {
//     return add('is-info', message, timeout)
//   }

//   function success(message, timeout) {
//     return add('is-success', message, timeout)
//   }

//   function warning(message, timeout) {
//     return add('is-warning', message, timeout)
//   }

//   function danger(message, timeout) {
//     return add('is-danger', message, timeout || 15000)
//   }

//   function parse(message) {
//     if (!message) return 'Unknown Error'
//     if (message.data) return parse(message.data)
//     const error = message.error || message.message || message
//     return error.toString()
//   }
// }
