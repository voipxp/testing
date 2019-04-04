import angular from 'angular'
import _ from 'lodash'

const template = `
<strong ng-show="$ctrl.name">{{ $ctrl.name }}</strong>
<strong ng-show="!$ctrl.name">{{ $ctrl.userIdShort }}</strong>
<span ng-show="$ctrl.phone">({{ $ctrl.phone }})</span>
`
angular.module('odin.common').component('userSearchPanelUser', {
  template,
  controller,
  bindings: { user: '<' }
})

function controller() {
  var ctrl = this
  ctrl.$onChanges = onChanges

  function onChanges(changes) {
    if (changes.user && changes.user.currentValue) {
      ctrl.name = _.compact(
        _.uniq([ctrl.user.firstName, ctrl.user.lastName])
      ).join(' ')
      ctrl.phone = _.compact([ctrl.user.phoneNumber, ctrl.user.extension]).join(
        ', '
      )
    }
  }
}
