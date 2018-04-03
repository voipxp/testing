;(function() {
  angular.module('odin.user').component('userCallRecordSearchModal', {
    templateUrl:
      'user/components/callRecords/user/userCallRecordSearchModal.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, HashService, $scope, UserCallRecordsService) {
    var ctrl = this

    ctrl.$onInit = onInit

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function open() {
      ctrl.search = {}
      Alert.modal.open(ctrl.modalId, function(close) {
        UserCallRecordsService.open(
          ctrl.serviceProviderId,
          ctrl.groupId,
          ctrl.userId,
          ctrl.search.start,
          ctrl.search.end
        )
        close()
      })
    }

    $scope.$on('userCallRecordSearchModal:load', open)
  }
})()
