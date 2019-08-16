import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.ui').component('pbsFormBuilder', {
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
      setDefaultData()
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

  function setDefaultData() {
    ctrl.properties.forEach(function(property) {
      if (ctrl.data[property.key] || ctrl.data[property.key] === 0) return
      if (property.type === 'boolean') {
        ctrl.data[property.key] = !!property.default
      } else {
        const value = property.default
        ctrl.data[property.key] = value || value === 0 ? value : null
      }
    })
  }
}
