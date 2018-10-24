;(function() {
  angular
    .module('odin.serviceProvider')
    .component('serviceProviderTrunkGroupsCallCapacityReport', {
      templateUrl:
        'serviceProvider/components/trunkGroups/callCapacityReport.component.html',
      controller: Controller,
      bindings: { serviceProviderId: '<', module: '<' }
    })

  function Controller(
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
        key: 'groupName',
        label: 'Group Name'
      },
      {
        key: 'userLimit',
        label: 'User Limit'
      },
      {
        key: 'groupTrunkCapacity.maxActiveCalls',
        label: 'Max Active'
      },
      {
        key: 'groupTrunkCapacity.maxAvailableActiveCalls',
        label: 'Max Available'
      },
      {
        key: 'groupTrunkCapacity.burstingMaxActiveCalls',
        label: 'Bursting Max Active'
      },
      {
        key: 'groupTrunkCapacity.burstingMaxAvailableActiveCalls',
        label: 'Bursting Max Available'
      },
      {
        key: 'service.quantity',
        label: 'Quantity'
      },
      {
        key: 'service.usage',
        label: 'Usage'
      },
      {
        key: 'service.allowed',
        label: 'Allowed'
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

    function displayMax(attr) {
      var value = attr
      return value === -1 ? 'Unlimited' : value
    }

    function loadCallCapacityReport() {
      return ServiceProviderTrunkGroupCallCapacityReportService.index(
        ctrl.serviceProviderId
      ).then(function(data) {
        ctrl.settings = data
        var groups = _.map(data.groups, function(group) {
          group.groupTrunkCapacity.burstingMaxAvailableActiveCalls = displayMax(
            group.groupTrunkCapacity.burstingMaxAvailableActiveCalls
          )
          group.service.quantity = displayMax(group.service.quantity)
          group.service.allowed = displayMax(group.service.allowed)
          return group
        })

        ctrl.settings.groups = groups
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
})()
