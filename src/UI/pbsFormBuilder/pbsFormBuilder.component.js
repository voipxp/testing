/*
example
{
  "properties": {
    "isActive": {
      "title": "Is Active",
      "type": "boolean"
    },
    "forwardToPhoneNumber": {
      "title": "Forward To Number",
      "type": "string",
      "minLength": 1,
      "maxLength": 161
    },
    "numberOfRings": {
      "title": "Number of Rings",
      "type": "integer",
      "enum": [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      "default": 0
    }
  },
  "title": "Call Forwarding No Answer",
  "type": "object"
}
*/

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
    ctrl.data = {}

    function onChanges(changes) {
      if (changes.schema && changes.schema.currentValue) {
        organizeProperties()
        setDefaultData()
      }
    }

    function organizeProperties() {
      ctrl.properties = []
      _.forIn(ctrl.schema.properties, function(value, key) {
        ctrl.properties.push(Object.assign({ key: key }, value))
      })
      console.log('ctrl.properties', ctrl.properties)
    }

    function setDefaultData() {
      ctrl.data = {}
      ctrl.properties.forEach(function(property) {
        console.log('property', property)
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
