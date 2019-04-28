// import angular from 'angular'
// import _ from 'lodash'
// import template from './index.html'
//
// angular.module('odin.common').component('virtualUserServices', {
//   template,
//   controller,
//   bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
// })
//
// controller.$inject = ['Alert', 'UserServiceService', 'Module', '$q', '$window']
// function controller(Alert, UserServiceService, Module, $q, $window) {
//   var ctrl = this
//   ctrl.$onInit = onInit
//   ctrl.module = Module
//   ctrl.select = select
//
//   var ignoredServices = [
//     'Basic Call Logs',
//     'Charge Number',
//     'Communication Barring User-Control',
//     'Privacy',
//     'Client Call Control',
//     'Directory Number Hunting',
//     'Virtual On-Net Enterprise Extensions',
//     'Enhanced Call Logs',
//     'Calling Party Category'
//   ]
//
//   function onInit() {
//     ctrl.loading = true
//     return $q
//       .all([loadServices(), Module.load()])
//       .catch(Alert.notify.danger)
//       .finally(function() {
//         ctrl.loading = false
//       })
//   }
//
//   function select(service) {
//     ctrl.selectedService = service && service.serviceName
//     $window.scrollTo(0, 0)
//   }
//
//   function loadServices() {
//     return UserServiceService.assigned(ctrl.userId).then(function(data) {
//       ctrl.services = _.filter(data.userServices || [], function(service) {
//         return (
//           !_.includes(ignoredServices, service.serviceName) &&
//           Module.read(service.serviceName)
//         )
//       })
//     })
//   }
// }
