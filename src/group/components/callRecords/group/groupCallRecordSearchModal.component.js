;(function() {
  angular.module('odin.group').component('groupCallRecordSearchModal', {
    templateUrl:
      'group/components/callRecords/group/groupCallRecordSearchModal.component.html',
    controller: Controller,
    bindings: { groupId: '<', serviceProviderId: '<' }
  })

  function Controller(Alert, HashService, $scope, GroupCallRecordsService) {
    var ctrl = this

    ctrl.$onInit = onInit

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function open() {
      ctrl.search = {}
      Alert.modal.open(ctrl.modalId, function(close) {
        GroupCallRecordsService.open(
          ctrl.serviceProviderId,
          ctrl.groupId,
          ctrl.search.start,
          ctrl.search.end
        )
        close()
      })
    }

    $scope.$on('groupCallRecordSearchModal:load', open)
  }
})()
