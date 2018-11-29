;(function() {
  angular.module('odin.group').component('groupCallRecordData', {
    templateUrl: 'group/components/callRecords/group/data.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      startTime: '<',
      endTime: '<',
      label: '<'
    }
  })

  function Controller(Alert, GroupCallRecordsService, $rootScope) {
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
    ctrl.download = download
    ctrl.toggleFilter = toggleFilter
    ctrl.onPagination = onPagination
    ctrl.searchUser = searchUser
    ctrl.onSelectUser = onSelectUser

    function onInit() {
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

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function toggleFilter(filter) {
      filter.show = !filter.show
      setFilters()
    }

    // Set the data based on the filter
    function setFilters() {
      var filters = _.map(_.filter(ctrl.filters, { show: true }), 'value')
      var details = _.filter(ctrl.records, function(item) {
        return _.includes(filters, item.direction) && isUser(item)
      })
      ctrl.details = details
    }

    function isUser(user) {
      return ctrl.searchUserId ? user.userId === ctrl.searchUserId : true
    }

    function loadDetails() {
      return GroupCallRecordsService.detail(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.startTime,
        ctrl.endTime
      ).then(function(data) {
        ctrl.records = data
        setFilters()
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
      setFilters()
    }
  }
})()
