import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('usersReport', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  'Alert',
  'UserReportService',
  'Route',
  '$routeParams',
  'CsvService',
  'DownloadService',
  '$location'
]
function controller(
  Alert,
  UserReportService,
  Route,
  $routeParams,
  CsvService,
  DownloadService,
  $location
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onClick = onClick
  ctrl.download = download
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId

  ctrl.columns = [
    {
      key: 'userId',
      label: 'User ID'
    },
    {
      key: 'groupId',
      label: 'Group ID'
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
      key: 'phoneNumber',
      label: 'Phone'
    },
    {
      key: 'extension',
      label: 'Extension'
    },
    {
      key: 'phoneNumberActivated',
      label: 'Activated',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'inTrunkGroup',
      label: 'In Trunk',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'deviceType',
      label: 'Device Type'
    },
    {
      key: 'macAddress',
      label: 'MAC Address'
    },
    {
      key: 'servicePacks',
      label: 'Service Packs'
    },
    {
      key: 'userServices',
      label: 'User Services'
    },
    {
      key: 'premiumServices',
      label: 'Premium Services'
    }
  ]

  function onInit() {
    if (ctrl.groupId) {
      _.remove(ctrl.columns, { key: 'groupId' })
    }
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
        ctrl.users = data.map(function(user) {
          return {
            userId: String(user.userId),
            groupId: user.groupId || '',
            serviceProviderId: user.serviceProviderId || '',
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
            userServices: user.userServices.join(','),
            premiumServices: user.premiumServices.join(',')
          }
        })
      }
    )
  }

  function onClick(user) {
    var returnTo = $location.url()
    Route.open(
      'users',
      user.serviceProviderId,
      user.groupId,
      user.userId
    ).search({ returnTo: returnTo })
  }

  function download() {
    var filename =
      _.compact([
        'odin-users-report',
        ctrl.serviceProviderId,
        ctrl.groupId
      ]).join('-') + '.csv'
    CsvService.export(ctrl.users).then(function(csv) {
      DownloadService.download(csv, filename)
    })
  }
}
