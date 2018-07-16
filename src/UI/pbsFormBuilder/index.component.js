;(function() {
  angular.module('odin.UI').component('pbsFormBuilderDoc', {
    templateUrl: 'UI/pbsFormBuilder/index.component.html',
    controller: function(Alert) {
      var ctrl = this
      ctrl.tester = function() {
        Alert.modal.open('tester', function(close) {
          close()
        })
      }
      ctrl.$onInit = function() {
        ctrl.data = {}
        ctrl.schema = {
          title: 'Call Forwarding No Answer',
          type: 'object',
          required: ['textInput'],
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
              minimum: 1,
              maximum: 4
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
