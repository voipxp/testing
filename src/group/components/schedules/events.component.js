;(function() {
  angular.module('odin.group').component('groupScheduleEvents', {
    templateUrl: 'group/components/schedules/events.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      scheduleName: '<',
      scheduleType: '<'
    }
  })

  function Controller(Alert, GroupEventService, EventHelper) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.edit = edit
    ctrl.RRule = RRule

    function onInit() {
      ctrl.loading = true
      loadEvents()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadEvents() {
      return GroupEventService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.scheduleName,
        ctrl.scheduleType
      ).then(function(data) {
        ctrl.events = data.map(function(data) {
          return EventHelper.parse(data)
        })
        console.log('events', ctrl.events)
        return data
      })
    }

    function add() {
      ctrl.editEvent = {}
      ctrl.rrule = {}
      Alert.modal.open('editGroupEventModal', function(close) {
        create(ctrl.editEvent, ctrl.rrule, close)
      })
    }

    function edit(event) {
      ctrl.editEvent = angular.copy(event)
      ctrl.rrule = EventHelper.fromRRule(event)
      Alert.modal.open(
        'editGroupEventModal',
        function(close) {
          // capture name changes
          if (event.eventName !== ctrl.editEvent.eventName) {
            ctrl.editEvent.newEventName = ctrl.editEvent.eventName
            ctrl.editEvent.eventName = event.eventName
          }
          update(ctrl.editEvent, ctrl.rrule, close)
        },
        function(close) {
          Alert.confirm
            .open('Are you sure you want to remove this Event?')
            .then(function() {
              destroy(ctrl.editEvent, close)
            })
        }
      )
    }

    function create(event, rrule, callback) {
      event.rrule = EventHelper.toRRule(rrule)
      Alert.spinner.open()
      GroupEventService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.scheduleName,
        ctrl.scheduleType,
        event
      )
        .then(loadEvents)
        .then(function() {
          Alert.notify.success('Event Created')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function update(event, rrule, callback) {
      event.rrule = EventHelper.toRRule(rrule)
      Alert.spinner.open()
      GroupEventService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.scheduleName,
        ctrl.scheduleType,
        event
      )
        .then(loadEvents)
        .then(function() {
          Alert.notify.success('Event Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(event, callback) {
      Alert.spinner.open()
      GroupEventService.destroy(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.scheduleName,
        ctrl.scheduleType,
        event.eventName
      )
        .then(loadEvents)
        .then(function() {
          Alert.notify.warning('Event Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
