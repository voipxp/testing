;(function() {
  angular.module('odin.common').component('selectEnterpriseTrunk', {
    templateUrl:
      'common/components/selectEnterpriseTrunk/selectEnterpriseTrunk.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', onUpdate: '&' }
  })

  function Controller(
    Alert,
    $q,
    GroupEnterpriseTrunkService,
    EnterpriseEnterpriseTrunkService,
    ServiceProviderService,
    HashService,
    EventEmitter,
    $scope
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.select = select

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function onChanges(changes) {
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
      if (changes.groupId) {
        ctrl.groupId = changes.groupId.currentValue
      }
    }

    function loadTrunks() {
      return loadServiceProvider().then(function() {
        if (ctrl.serviceProvider.isEnterprise) {
          return loadEnterpriseEnterpriseTrunks()
        } else {
          return loadGroupEnterpriseTrunks()
        }
      })
    }

    function loadServiceProvider() {
      return ServiceProviderService.show(ctrl.serviceProviderId).then(function(
        data
      ) {
        ctrl.serviceProvider = data
        console.log('serviceProvider', data)
      })
    }

    function loadGroupEnterpriseTrunks() {
      return GroupEnterpriseTrunkService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.trunks = data
        console.log('groupTrunks', data)
      })
    }

    function loadEnterpriseEnterpriseTrunks() {
      return EnterpriseEnterpriseTrunkService.index(
        ctrl.serviceProviderId
      ).then(function(data) {
        ctrl.trunks = data
        console.log('enterpriseTrunks', data)
      })
    }

    function load() {
      Alert.spinner.open()
      return loadTrunks()
        .then(function() {
          Alert.modal.open(ctrl.modalId)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function select(trunk) {
      ctrl.search = ''
      Alert.modal.close(ctrl.modalId)
      ctrl.onUpdate(EventEmitter({ trunk: trunk }))
    }

    $scope.$on('selectEnterpriseTrunk:load', load)
  }
})()
