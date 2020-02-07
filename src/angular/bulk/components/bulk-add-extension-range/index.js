/*
  Make on the fly and add extension range
    OR
  Generate a add extension range
*/
import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkAddExtensionRange', {
  template,
  controller,
  bindings: {
    userCount: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'NumberService',
  '$scope',
  'EventEmitter',
  'HashService',
  '$q'
]
function controller(
  Alert,
  NumberService,
  $scope,
  EventEmitter,
  HashService,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.validateNumber = /^\d+$/;

  function onInit() {
    ctrl.modalId = HashService.guid()
    ctrl.range = ''
  }


  function open() {
    Alert.modal.open(ctrl.modalId, function(close) {
      createRange(ctrl.range, close)
    })
  }

  function createRange(range, callback) {
    sendUpdate(range, callback)
  }

  function sendUpdate(range, callback) {
    ctrl.onUpdate(EventEmitter({ range: range }))
    callback()
  }

  $scope.$on('bulkAddExtensionRange:load', open)
}
