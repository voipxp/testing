;(function() {
  angular.module('odin.UI').component('pbsFormBuilder', {
    templateUrl: 'UI/pbsFormBuilder/pbsFormBuilder.component.html',
    bindings: { data: '=', schema: '<' },
    controller: Controller
  })

  function Controller() {
    var ctrl = this
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
          Object.assign(
            { key: key, required: _.includes(ctrl.schema.required, key) },
            value
          )
        )
      })
      console.log('ctrl.properties', ctrl.properties)
    }

    function setDefaultData() {
      ctrl.properties.forEach(function(property) {
        if (ctrl.data[property.key] || ctrl.data[property.key] === 0) return
        if (property.type === 'boolean') {
          ctrl.data[property.key] = !!property.default
        } else {
          var val = property.default
          ctrl.data[property.key] = val || val === 0 ? val : null
        }
      })
      console.log('ctrl.data', ctrl.data)
    }
  }
})()
