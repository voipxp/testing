import angular from 'angular'
import template from './index.html'
import Sugar from 'sugar-date'
import _ from 'lodash'
angular.module('odin.system').component('systemServiceUtilizationReport', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  'Alert',
  'SystemServiceUtilization',
  'Route',
  '$location',
  'CsvService',
  'DownloadService'
]
function controller(
  Alert,
  SystemServiceUtilization,
  Route,
  $location,
  CsvService,
  DownloadService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onClick = onClick
  ctrl.settings = {}
  ctrl.download = download

  ctrl.columnsGroupServices = [
    {
      key: 'serviceProviderId',
      label: 'Service Provider ID'
    },
    {
      key: 'serviceProviderName',
      label: 'Service Provider Name'
    },
    {
      key: 'isEnterprise',
      label: 'Enterprise'
    },
    {
      key: 'groupId',
      label: 'Group Id'
    },
    {
      key: 'groupName',
      label: 'Group Name'
    },
    {
      key: 'serviceName',
      label: 'Service Name'
    },
    {
      key: 'usage',
      label: 'Usage'
    },
    {
      key: 'limited',
      label: 'Limited'
    },
    {
      key: 'userLimit',
      label: 'User Limit'
    },
    {
      key: 'userCount',
      label: 'Users'
    }
  ]

  ctrl.columnsServicePacks = [
    {
      key: 'serviceProviderId',
      label: 'Service Provider ID'
    },
    {
      key: 'serviceProviderName',
      label: 'Service Provider Name'
    },
    {
      key: 'isEnterprise',
      label: 'Enterprise'
    },
    {
      key: 'groupId',
      label: 'Group Id'
    },
    {
      key: 'groupName',
      label: 'Group Name'
    },
    {
      key: 'servicePackName',
      label: 'Service Pack Name'
    },
    {
      key: 'usage',
      label: 'Usage'
    },
    {
      key: 'limited',
      label: 'Limited'
    },

    {
      key: 'userLimit',
      label: 'User Limit'
    },
    {
      key: 'userCount',
      label: 'Users'
    }
  ]

  ctrl.columnsUserServices = [
    {
      key: 'serviceProviderId',
      label: 'Service Provider ID'
    },
    {
      key: 'serviceProviderName',
      label: 'Service Provider Name'
    },
    {
      key: 'isEnterprise',
      label: 'Enterprise'
    },
    {
      key: 'groupId',
      label: 'Group Id'
    },
    {
      key: 'groupName',
      label: 'Group Name'
    },
    {
      key: 'serviceName',
      label: 'Service Name'
    },
    {
      key: 'usage',
      label: 'Usage'
    },
    {
      key: 'limited',
      label: 'Limited'
    },
    {
      key: 'userLimit',
      label: 'User Limit'
    },
    {
      key: 'userCount',
      label: 'Users'
    }
  ]

  ctrl.columnsGroupServicesSummary = [
    {
      key: 'serviceName',
      label: 'Service Name'
    },
    {
      key: 'usage',
      label: 'Usage'
    }
  ]

  ctrl.columnsServicePacksSummary = [
    {
      key: 'servicePackName',
      label: 'Service Name'
    },
    {
      key: 'usage',
      label: 'Usage'
    }
  ]

  ctrl.columnsUserServicesSummary = [
    {
      key: 'serviceName',
      label: 'Service Name'
    },
    {
      key: 'usage',
      label: 'Usage'
    }
  ]

  function onInit() {
    ctrl.loading = true
    loadServicePackReport()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }
  function loadServicePackReport() {
    return SystemServiceUtilization.index().then(function(data) {
      ctrl.items = data
      ctrl.groupServicesSummary = _(data.groupServices)
        .groupBy('serviceName')
        .map((objs, key) => ({
          serviceName: key,
          usage: _.sumBy(objs, 'usage')
        }))
        .value()
      ctrl.servicePackServicesSummary = _(data.servicePackServices)
        .groupBy('servicePackName')
        .map((objs, key) => ({
          servicePackName: key,
          usage: _.sumBy(objs, 'usage')
        }))
        .value()
      ctrl.userServicesSummary = _(data.userServices)
        .groupBy('serviceName')
        .map((objs, key) => ({
          serviceName: key,
          usage: _.sumBy(objs, 'usage')
        }))
        .value()

      return ctrl.items
    })
  }
  function onClick(item) {
    var returnTo = $location.url()
    Route.open('groups', item.serviceProviderId, item.groupId).search({
      returnTo: returnTo
    })
  }
  function download() {
    var now = Sugar.Date.format(new Date(), '%Y-%m-%d')
    var filename1 = 'odin-group-service-details-' + now + '.csv'
    var filename2 = 'odin-service-pack-details-' + now + '.csv'
    var filename3 = 'odin-user-service-details-' + now + '.csv'
    var filename4 = 'odin-group-service-summary-' + now + '.csv'
    var filename5 = 'odin-service-pack-summary-' + now + '.csv'
    var filename6 = 'odin-user-service-summary-' + now + '.csv'

    CsvService.export(ctrl.items.groupServices).then(function(csv) {
      DownloadService.download(csv, filename1)
    })
    CsvService.export(ctrl.items.servicePackServices).then(function(csv) {
      DownloadService.download(csv, filename2)
    })
    CsvService.export(ctrl.items.userServices).then(function(csv) {
      DownloadService.download(csv, filename3)
    })
    CsvService.export(ctrl.items.groupServices).then(function(csv) {
      DownloadService.download(csv, filename4)
    })
    CsvService.export(ctrl.items.servicePackServices).then(function(csv) {
      DownloadService.download(csv, filename5)
    })
    CsvService.export(ctrl.items.userServices).then(function(csv) {
      DownloadService.download(csv, filename6)
    })
  }
}
