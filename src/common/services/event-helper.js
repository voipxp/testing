import angular from 'angular'
import _ from 'lodash'
import Sugar from 'sugar-date'
import { RRule, rrulestr } from 'rrule'

angular.module('odin.common').factory('EventHelper', EventHelper)

function EventHelper() {
  var service = { parse: parse, fromRRule: fromRRule, toRRule: toRRule }
  return service

  // make startTime and endTime date objects
  // add summary information for view
  function parse(event) {
    event.startTime = Sugar.Date.create(event.startTime)
    event.endTime = Sugar.Date.create(event.endTime)
    var summary = {}
    if (event.allDayEvent) {
      summary.duration = 'All Day'
      summary.startTime = Sugar.Date.medium(event.startTime)
    } else {
      summary.duration = Sugar.Number.duration(event.endTime - event.startTime)
      summary.startTime = Sugar.Date.long(event.startTime)
    }
    if (event.rrule) {
      var _rrule = rrulestr(event.rrule)
      event.nextTime = _rrule.after(Sugar.Date.create())
      summary.recurrence = _rrule.toText()
    } else {
      event.nextTime = Sugar.Date.isFuture(event.startTime) && event.startTime
      summary.recurrence = 'None'
    }
    event.summary = summary
    return event
  }

  // return RFC compliant rrule string
  function toRRule(options) {
    var freq = _.get(options, 'freq')
    if (_.isUndefined(freq)) return
    var _options = angular.copy(options)
    delete _options.dtstart
    var _rrule = new RRule(_options)
    return _rrule.toString()
  }

  // return parsed rrule
  function fromRRule(event) {
    if (!event.rrule) return {}
    var _rrule = rrulestr(event.rrule)
    var options = angular.copy(_rrule.origOptions)
    options.interval = options.interval || 1
    return options
  }
}
