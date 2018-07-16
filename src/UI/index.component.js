;(function() {
  var template =
    '<pbs-navigation>' +
    '  <pbs-breadcrumb title="$ctrl.title" href="$ctrl.href"></pbs-breadcrumb>' +
    '  <pbs-breadcrumb title="$ctrl.component"></pbs-breadcrumb>' +
    '</pbs-navigation>'
  angular.module('odin.UI').component('pbsDocNav', {
    template: template,
    bindings: { component: '@' },
    controller: function() {
      this.title = 'UI'
      this.href = '#!/UI'
    }
  })

  angular.module('odin.UI').component('pbsDoc', {
    templateUrl: 'UI/index.component.html',
    controller: Controller
  })

  function Controller(Route) {
    var ctrl = this
    var route = Route.open('UI')

    ctrl.onClick = function(event) {
      route(event.component)
    }

    ctrl.columns = [
      {
        key: 'component',
        label: 'Component'
      },
      {
        key: 'description',
        label: 'Description'
      }
    ]

    ctrl.items = [
      {
        component: 'pbsDataTable',
        description: 'Data Table Component'
      },
      {
        component: 'pbsButtonDropdown',
        description: 'Compact Button Dropdown'
      },
      {
        component: 'pbsInputCheckbox',
        description: 'Form Checkbox'
      },
      {
        component: 'pbsInputSwitch',
        description: 'Form Checkbox Switch'
      },
      {
        component: 'pbsInputRadio',
        description: 'Form Radio'
      },
      {
        component: 'pbsInputSelect',
        description: 'Form Select'
      },
      {
        component: 'pbsInputFile',
        description: 'Form File Upload'
      },
      {
        component: 'pbsInputDatetimeParse',
        description: 'Form Datetime Input (Natural Language Parser)'
      },
      {
        component: 'pbsInputDatetime',
        description: 'Form Datetime Input'
      },
      {
        component: 'pbsFormBuilder',
        description: 'OpenAPI Form Builder'
      }
    ]
  }
})()
