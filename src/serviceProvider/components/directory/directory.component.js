;(function() {
  angular
    .module('odin.serviceProvider')
    .component('serviceProviderPhoneDirectory', {
      templateUrl:
        'serviceProvider/components/directory/directory.component.html',
      controller: Controller
    })

  function Controller(
    Alert,
    ServiceProviderPhoneDirectoryService,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.serviceProviderId = $routeParams.serviceProviderId

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.loading = true
      loadDirectory()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDirectory() {
      return ServiceProviderPhoneDirectoryService.show(
        ctrl.serviceProviderId
      ).then(function(data) {
        ctrl.users = data
        console.log('users', data)
      })
    }
  }
})()
