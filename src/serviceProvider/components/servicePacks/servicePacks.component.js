;(function() {
  angular.module('odin.serviceProvider').component('servicePacks', {
    templateUrl:
      'serviceProvider/components/servicePacks/servicePacks.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      returnTo: '<'
    }
  })

  function Controller(
    Alert,
    ServicePackService,
    ServiceProviderServiceService,
    Route,
    $q,
    $scope
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.open = open
    ctrl.setTitle = setTitle
    ctrl.add = add
    ctrl.onCreate = onCreate

    ctrl.states = {
      list: 'Service Packs',
      utilization: 'Service Packs Utilization',
      service: 'Service Usage',
      new: 'Create a Service Pack'
    }

    function onInit() {
      ctrl.state = 'list'
      ctrl.loading = true
      $q.all([loadServicePacks(), loadServices()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onChanges(changes) {
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
      if (changes.returnTo) {
        ctrl.returnTo = changes.returnTo.currentValue
      }
    }

    function loadServicePacks() {
      return ServicePackService.index(ctrl.serviceProviderId, true).then(
        function(data) {
          ctrl.servicePacks = data
          console.log('servicePacks', data)
        }
      )
    }

    function loadServices() {
      return ServiceProviderServiceService.show(ctrl.serviceProviderId).then(
        function(data) {
          ctrl.services = data.userServices || []
        }
      )
    }

    function open(servicePackName) {
      Route.open('serviceProviders', ctrl.serviceProviderId)(
        'servicePacks',
        servicePackName
      )
    }

    function setTitle(state, title) {
      ctrl.states[state] = title
    }

    function add() {
      $scope.$broadcast('servicePackCreate:load')
    }

    function onCreate(event) {
      open(event.servicePack.servicePackName)
    }
  }
})()
