;(function() {
  angular.module('odin.UI').component('pbsFormBuilderDoc', {
    templateUrl: 'UI/pbsFormBuilder/index.component.html',
    controller: function() {
      var ctrl = this
      ctrl.$onInit = function() {
        ctrl.data = {}
        ctrl.schema = {
          title: 'Call Forwarding No Answer',
          type: 'object',
          properties: {
            booleanInput: {
              title: 'Boolean Input',
              type: 'boolean'
            },
            textInput: {
              title: 'Text Input',
              type: 'string',
              minLength: 4,
              maxLength: 10
            },
            numberInput: {
              title: 'Number Input',
              type: 'integer',
              min: 1,
              max: 4
            },
            selectInput: {
              title: 'Select Input',
              type: 'string',
              enum: ['option 1', 'option 2', 'option 3'],
              default: 'option 1'
            }
          }
        }
      }
    }
  })
})()
