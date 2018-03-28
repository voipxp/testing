;(function() {
  angular.module('odin.provisioning').component('serviceProviders', {
    templateUrl:
      'provisioning/components/serviceProviders/serviceProviders.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    ServiceProviderService,
    SystemDomainService,
    SystemStateService,
    $q,
    $scope,
    Route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.clone = clone
    ctrl.onClone = onClone
    ctrl.add = add
    ctrl.onCreate = onCreate
    ctrl.open = open
    ctrl.onPagination = onPagination

    function onInit() {
      ctrl.loading = true
      loadServiceProviders()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function loadServiceProviders() {
      return ServiceProviderService.index().then(function(data) {
        ctrl.serviceProviders = data
        return data
      })
    }

    function add() {
      $scope.$broadcast('serviceProviderCreate:load')
    }

    function clone() {
      $scope.$broadcast('serviceProviderClone:load')
    }

    function onClone(event) {
      open(event.serviceProvider)
    }

    function onCreate(event) {
      open(event.serviceProvider)
    }

    function open(serviceProvider) {
      Route.open('serviceProviders')(serviceProvider.serviceProviderId)
    }
  }
})()
