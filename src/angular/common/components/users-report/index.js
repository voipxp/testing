import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('usersReport', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupUserReportService',
  'Route',
  'CsvService',
  'DownloadService',
  '$location'
]
function controller(
  Alert,
  GroupUserReportService,
  Route,
  CsvService,
  DownloadService,
  $location
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onClick = onClick
  ctrl.download = download

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
      key: 'callingLineIdPhoneNumber',
      label: 'CLID'
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
      key: 'linePorts',
      label: 'Line Ports'
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
    ctrl.loading = true
    loadReport()
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function loadReport() {
    return GroupUserReportService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.users = data.map(function(user) {
        return {
          userId: String(user.userId),
          groupId: user.groupId || '',
          serviceProviderId: user.serviceProviderId || '',
          lastName: user.lastName || '',
          firstName: user.firstName || '',
          phoneNumber: user.phoneNumber || '',
          callingLineIdPhoneNumber: user.callingLineIdPhoneNumber || '',
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
          linePorts: user.userLinePorts.join(','),
          servicePacks: user.servicePacks.join(','),
          userServices: user.userServices.join(','),
          premiumServices: user.premiumServices.join(',')
        }
      })
    })
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
