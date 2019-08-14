import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.ui').component('pbsListBuilder', {
  template,
  controller,
  bindings: { data: '=', schema: '<' }
})

function controller() {
  const ctrl = this
  ctrl.$onChanges = onChanges
  ctrl.properties = []

  function onChanges(changes) {
    if (changes.schema && changes.schema.currentValue) {
      organizeProperties()
    }
  }

  function organizeProperties() {
    ctrl.properties = []
    _.forIn(ctrl.schema.properties, function(value, key) {
      ctrl.properties.push(
        Object.assign({ key: key, required: _.includes(ctrl.schema.required, key) }, value)
      )
    })
  }
}
