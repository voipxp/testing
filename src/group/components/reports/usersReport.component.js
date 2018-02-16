;(function() {
  angular.module('odin.group').component('usersReport', {
    templateUrl: 'group/components/reports/usersReport.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    UserReportService,
    Route,
    $location,
    $routeParams,
    CsvService,
    DownloadService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.download = download
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    function onInit() {
      ctrl.users = []
      Alert.spinner.open()
      loadReport()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadReport() {
      return UserReportService.index(ctrl.serviceProviderId, ctrl.groupId).then(
        function(data) {
          ctrl.users = data
          console.log('users', data)
        }
      )
    }

    function open(user) {
      var returnTo = $location.absUrl()
      Route.open('users')(
        ctrl.serviceProviderId,
        ctrl.groupId,
        user.userId
      ).search({ returnTo: returnTo })
    }

    function transformData(users) {
      return users.map(function(user) {
        return {
          userId: String(user.userId),
          lastName: user.lastName || '',
          firstName: user.firstName || '',
          phoneNumber: user.phoneNumber || '',
          extension: user.extension || '',
          phoneNumberActivated: !!user.phoneNumberActivated,
          inTrunkGroup: !!user.inTrunkGroup,
          deviceType: _.get(
            user,
            'accessDeviceEndpoint.accessDevice.deviceType',
            ''
          ),
          macAddress: _.get(
            user,
            'accessDeviceEndpoint.accessDevice.macAddress',
            ''
          ),
          servicePacks: user.servicePacks.join(','),
          premiumServices: user.premiumServices.join(',')
        }
      })
    }

    function download() {
      var filename =
        'odin-users-report-' +
        ctrl.serviceProviderId +
        '-' +
        ctrl.groupId +
        '.csv'
      CsvService.export(transformData(ctrl.users)).then(function(csv) {
        DownloadService.download(csv, filename)
      })
    }
  }
})()
