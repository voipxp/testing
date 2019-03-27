import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectTrunkAddressing', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    trunkAddressing: '=',
    onUpdate: '&'
  }
})

controller.$inject = ['$scope']
function controller($scope) {
  var ctrl = this
  ctrl.skipTrunkGroup = skipTrunkGroup
  ctrl.selectTrunkGroup = selectTrunkGroup
  ctrl.onSelectTrunkGroup = onSelectTrunkGroup
  ctrl.skipEnterpriseTrunk = skipEnterpriseTrunk
  ctrl.selectEnterpriseTrunk = selectEnterpriseTrunk
  ctrl.onSelectEnterpriseTrunk = onSelectEnterpriseTrunk

  function skipTrunkGroup() {
    _.unset(ctrl, 'trunkAddressing.trunkGroupDeviceEndpoint')
  }

  function selectTrunkGroup() {
    $scope.$broadcast('selectTrunkGroup:load')
  }

  function skipEnterpriseTrunk() {
    _.unset(ctrl, 'trunkAddressing.enterpriseTrunkName')
  }

  function selectEnterpriseTrunk() {
    $scope.$broadcast('selectEnterpriseTrunk:load')
  }

  function onSelectTrunkGroup(event) {
    var name = _.get(event, 'trunk.name')
    if (name) {
      _.set(ctrl, 'trunkAddressing.trunkGroupDeviceEndpoint.name', name)
    } else {
      skipTrunkGroup()
    }
  }

  function onSelectEnterpriseTrunk(event) {
    var name = _.get(event, 'trunk.enterpriseTrunkName')
    if (name) {
      _.set(ctrl, 'trunkAddressing.enterpriseTrunkName', name)
    } else {
      skipEnterpriseTrunk()
    }
  }
}
