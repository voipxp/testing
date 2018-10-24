;(function() {
  angular.module('odin.group').component('groupCallCenterStatistics', {
    templateUrl:
      'group/components/callCenters/callCenter/statistics/statistics.component.html',
    controller: Controller,
    bindings: { serviceUserId: '=' }
  })

  function Controller(Alert, GroupCallCenterStatisticsService, $filter) {
    var ctrl = this
    ctrl.$onInit = activate
    ctrl.view = view

    function activate() {
      ctrl.search = {}
    }

    function view() {
      Alert.spinner.open()
      loadStatistics()
        .then(function() {
          var start = $filter('date')(
            ctrl.statistics.statisticsRange.start,
            'medium'
          )
          var end = $filter('date')(
            ctrl.statistics.statisticsRange.end,
            'medium'
          )
          ctrl.modalTitle = start + ' - ' + end
          Alert.modal.open('groupCallCenterStatistics')
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadStatistics() {
      return GroupCallCenterStatisticsService.show(
        ctrl.serviceUserId,
        ctrl.search.start,
        ctrl.search.end
      ).then(function(data) {
        ctrl.statistics = data
        return data
      })
    }
  }
})()
