;(function() {
  angular.module('odin.common').factory('DateService', Service)

  function Service() {
    var service = {
      dayBegin: dayBegin,
      dayEnd: dayEnd
    }
    return service

    function dayBegin(when) {
      return Sugar.Date.beginningOfDay(Sugar.Date.create(when))
    }

    function dayEnd(when) {
      var time = Sugar.Date.endOfDay(Sugar.Date.create(when))
      time.setSeconds(59, 0)
      return time
    }
  }
})()
