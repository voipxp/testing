import angular from 'angular'
import { RRule } from 'rrule'
import template from './index.html'

angular.module('odin.group').component('groupScheduleEvents', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    name: '<',
    type: '<'
  }
})

controller.$inject = ['Alert', 'GroupEventService', 'EventHelper']
function controller(Alert, GroupEventService, EventHelper) {
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
      ctrl.name,
      ctrl.type
    ).then(data => {
      ctrl.events = data.map(EventHelper.parse)
    })
  }

  function add() {
    ctrl.editEvent = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      name: ctrl.name,
      type: ctrl.type
    }
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

  function create(event, _rrule, callback) {
    event.rrule = EventHelper.toRRule(_rrule)
    Alert.spinner.open()
    GroupEventService.store(event)
      .then(loadEvents)
      .then(function() {
        Alert.notify.success('Event Created')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function update(event, _rrule, callback) {
    event.rrule = EventHelper.toRRule(_rrule)
    Alert.spinner.open()
    GroupEventService.update(event)
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
    GroupEventService.destroy(event)
      .then(loadEvents)
      .then(function() {
        Alert.notify.warning('Event Removed')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
