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
      console.log('onClick', event)
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
      }
    ]
  }
})()
