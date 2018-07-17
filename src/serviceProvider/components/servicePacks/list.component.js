;(function() {
  angular.module('odin.serviceProvider').component('servicePacksList', {
    templateUrl: 'serviceProvider/components/servicePacks/list.component.html',
    require: { parent: '^servicePacks' }
  })
})()
