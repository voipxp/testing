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
    ctrl.parse = parse

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function open() {
      ctrl.search = {}
      Alert.modal.open(ctrl.modalId, function(close) {
        GroupCallRecordsService.open(
          ctrl.serviceProviderId,
          ctrl.groupId,
          ctrl.search.start.toISOString(),
          ctrl.search.end.toISOString()
        )
        close()
      })
    }

    function parse(type) {
      if (type !== 'start' && type !== 'end') return
      if (!ctrl.input[type]) {
        ctrl.search[type] = null
        return
      }
      var params = {}
      var opts = { past: true, params: params }
      var parsed = Sugar.Date.create(ctrl.input[type], opts)
      if (!Sugar.Date.isValid(parsed)) {
        ctrl.search[type] = null
        return
      }
      if (type === 'end' && !params.hour) {
        parsed = Sugar.Date.endOfDay(parsed)
      }
      ctrl.search[type] = parsed
    }

    $scope.$on('groupCallRecordSearchModal:load', open)
  }
})()
