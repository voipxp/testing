import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterStatistics', {
  template,
  controller,
  bindings: { serviceUserId: '=' }
})

controller.$inject = ['Alert', 'GroupCallCenterStatisticsService', '$filter']
function controller(Alert, GroupCallCenterStatisticsService, $filter) {
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
        var start = $filter('date')(ctrl.statistics.statisticsRange.start, 'medium')
        var end = $filter('date')(ctrl.statistics.statisticsRange.end, 'medium')
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
