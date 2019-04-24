import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroupProfile', {
  template,
  controller,
  require: { parent: '^groupPagingGroup' }
})

function controller() {
  var ctrl = this

  ctrl.update = update

  function update(event) {
    var instance = angular.copy(ctrl.parent.instance)
    instance.serviceInstanceProfile = event.profile
    ctrl.parent.update(instance, event.callback)
  }
}
