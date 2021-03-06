import angular from 'angular'
import Worker from './data.worker.js'
import template from './index.html'

angular.module('odin.group').component('groupCallRecordData', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    startTime: '<',
    endTime: '<',
    label: '<'
  }
})

controller.$inject = [
  'Alert',
  'GroupCallRecordsService',
  '$rootScope',
  '$timeout'
]
function controller(Alert, GroupCallRecordsService, $rootScope, $timeout) {
  var ctrl = this

  ctrl.filters = [
    {
      name: 'Placed',
      value: 'Placed',
      show: true
    },
    {
      name: 'Placed Missed',
      value: 'PlacedMissed',
      show: true
    },
    {
      name: 'Received',
      value: 'Received',
      show: true
    },
    {
      name: 'Received Missed',
      value: 'ReceivedMissed',
      show: true
    },
    {
      name: 'Redirect',
      value: 'Redirect',
      show: true
    },
    {
      name: 'Other',
      value: '',
      show: true
    }
  ]

  ctrl.$onInit = onInit
  ctrl.$onDestroy = onDestroy
  ctrl.download = download
  ctrl.toggleFilter = toggleFilter
  ctrl.onPagination = onPagination
  ctrl.searchUser = searchUser
  ctrl.onSelectUser = onSelectUser
  ctrl.searchText = searchText

  let worker

  function onInit() {
    worker = new Worker()
    worker.addEventListener('message', onFilteredRecords)

    ctrl.details = []
    ctrl.loading = true
    loadDetails()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onDestroy() {
    worker.terminate()
  }

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function toggleFilter(filter) {
    filter.show = !filter.show
    filterRecords()
  }

  function searchText() {
    filterRecords()
  }

  // Send filters to worker
  function filterRecords() {
    ctrl.isFiltering = true
    worker.postMessage({
      filters: ctrl.filters,
      records: ctrl.records,
      search: ctrl.search,
      userId: ctrl.searchUserId
    })
  }

  // Receive filters from worker
  function onFilteredRecords(event) {
    $timeout(() => {
      ctrl.details = event.data
      ctrl.isFiltering = false
    }, 1)
  }

  function loadDetails() {
    return GroupCallRecordsService.detail(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.startTime,
      ctrl.endTime
    ).then(function(data) {
      ctrl.records = data
      ctrl.details = angular.copy(data)
    })
  }

  function download() {
    GroupCallRecordsService.download(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.startTime,
      ctrl.endTime
    )
  }

  function searchUser() {
    $rootScope.$emit('userSearch:load', {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      onSelect: onSelectUser
    })
  }

  function onSelectUser(user) {
    ctrl.searchUserId = user && user.userId
    filterRecords()
  }
}
