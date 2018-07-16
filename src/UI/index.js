;(function() {
  var routes = [
    {
      component: 'pbsDoc'
    },
    {
      path: 'pbsDataTable',
      component: 'pbsDataTableDoc'
    },
    {
      path: 'pbsButtonDropdown',
      component: 'pbsButtonDropdownDoc'
    },
    {
      path: 'pbsInputCheckbox',
      component: 'pbsInputCheckboxDoc'
    },
    {
      path: 'pbsInputSwitch',
      component: 'pbsInputSwitchDoc'
    },
    {
      path: 'pbsInputRadio',
      component: 'pbsInputRadioDoc'
    },
    {
      path: 'pbsInputSelect',
      component: 'pbsInputSelectDoc'
    },
    {
      path: 'pbsInputFile',
      component: 'pbsInputFileDoc'
    },
    {
      path: 'pbsInputDatetimeParse',
      component: 'pbsInputDatetimeParseDoc'
    },
    {
      path: 'pbsInputDatetime',
      component: 'pbsInputDatetimeDoc'
    },
    {
      path: 'pbsFormBuilder',
      component: 'pbsFormBuilderDoc'
    }
  ]
  angular
    .module('odin.UI', ['hc.marked', 'angularFileInput'])
    .config(function(PbsRouteProvider) {
      PbsRouteProvider.set(routes, 'UI')
    })
})()
