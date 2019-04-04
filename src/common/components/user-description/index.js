import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('userDescription', {
  template,
  controller,
  bindings: { user: '<' }
})

function controller() {
  var ctrl = this
  ctrl.$onChanges = onChanges

  function onChanges(changes) {
    if (changes.user && changes.user.currentValue) {
      ctrl.name = _.uniq([ctrl.user.firstName, ctrl.user.lastName]).join(' ')
    }
  }
}
