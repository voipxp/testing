;(function() {
  angular.module('odin.UI').component('pbsListBuilder', {
    templateUrl: 'UI/pbsListBuilder/pbsListBuilder.component.html',
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
  }
})()
