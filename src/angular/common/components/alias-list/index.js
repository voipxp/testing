import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.common')
  .component('aliasList', { template, controller, bindings: { profile: '=' } })

function controller() {
  var ctrl = this
  ctrl.add = add
  ctrl.remove = remove
  ctrl.newAlias = ''

  ctrl.$onInit = function() {}

  function add() {
    if (!ctrl.profile.aliases) {
      ctrl.profile.aliases = []
    }
    if (!_.includes(ctrl.profile.aliases, ctrl.newAlias)) {
      ctrl.profile.aliases.push(ctrl.newAlias)
    }
    ctrl.newAlias = ''
  }

  function remove(index) {
    ctrl.profile.aliases.splice(index, 1)
  }
}
