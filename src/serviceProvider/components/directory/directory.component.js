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
    $routeParams,
    CsvService,
    DownloadService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.download = download

    ctrl.columns = [
      {
        key: 'groupId',
        label: 'Group ID'
      },
      {
        key: 'userId',
        label: 'User ID'
      },
      {
        key: 'lastName',
        label: 'Last Name'
      },
      {
        key: 'firstName',
        label: 'First Name'
      },
      {
        key: 'number',
        label: 'Phone Number'
      },
      {
        key: 'extension',
        label: 'Extension'
      },
      {
        key: 'department',
        label: 'Department'
      }
    ]

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

    function download() {
      var now = new Date()
      var filename =
        ctrl.serviceProviderId + '-directory-' + now.toJSON() + '.csv'
      CsvService.export(ctrl.users)
        .then(function(data) {
          DownloadService.download(data, filename)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
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
