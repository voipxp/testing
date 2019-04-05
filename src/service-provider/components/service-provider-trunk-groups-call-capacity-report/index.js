import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('serviceProviderTrunkGroupsCallCapacityReport', {
    template,
    controller,
    bindings: { serviceProviderId: '<', module: '<' }
  })

controller.$inject = [
  'Alert',
  'ServiceProviderTrunkGroupCallCapacityReportService',
  '$routeParams',
  'Route',
  '$location'
]
function controller(
  Alert,
  ServiceProviderTrunkGroupCallCapacityReportService,
  $routeParams,
  Route,
  $location
) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.$onInit = onInit
  ctrl.onClick = onClick
  ctrl.displayMax = displayMax
  ctrl.settings = {}

  ctrl.columns = [
    {
      key: 'groupId',
      label: 'Group ID'
    },
    {
      key: 'name',
      label: 'Trunk Name'
    },
    {
      key: 'maxActiveCalls',
      label: 'Trunk Group Max Active'
    },
    {
      key: 'maxIncomingCalls',
      label: 'Max Incoming Calls'
    },
    {
      key: 'maxOutgoingCalls',
      label: 'Max Outgoing Calls'
    },
    {
      key: 'enableBursting',
      label: 'Bursting Enabled',
      type: 'boolean',
      align: 'centered'
    }
  ]

  function onInit() {
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.loading = true
    loadCallCapacityReport()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function displayMax(attribute) {
    var value = attribute
    return value === -1 ? 'Unlimited' : value
  }

  function loadCallCapacityReport() {
    return ServiceProviderTrunkGroupCallCapacityReportService.show(
      ctrl.serviceProviderId
    ).then(function(data) {
      ctrl.settings = data
      var groupTrunkGroupDetails = _.map(data.groupTrunkGroupDetails, function(
        groupTrunkGroupDetails
      ) {
        groupTrunkGroupDetails.burstingMaxAvailableActiveCalls = displayMax(
          groupTrunkGroupDetails.burstingMaxAvailableActiveCalls
        )
        groupTrunkGroupDetails.quantity = displayMax(
          groupTrunkGroupDetails.quantity
        )
        groupTrunkGroupDetails.allowed = displayMax(
          groupTrunkGroupDetails.allowed
        )
        return groupTrunkGroupDetails
      })
      ctrl.settings.groups = groupTrunkGroupDetails
      return data
    })
  }
  function onClick(group) {
    var returnTo = $location.url()
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      group.groupId,
      'trunkGroups'
    ).search({ returnTo: returnTo })
  }
}