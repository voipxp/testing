;(function() {
  angular.module('odin.common').filter('pbsDate', Controller)

  function Controller() {
    return function(input, format) {
      if (!input) return ''
      format = format || 'medium'
      var date = Sugar.Date.create(input)
      if (!Sugar.Date.isValid(date)) return ''
      var staticOptions = ['short', 'medium', 'long', 'full', 'relative']
      if (_.includes(staticOptions, format)) {
        return Sugar.Date[format](date)
      } else {
        return Sugar.Date.format(date, format)
      }
    }
  }
})()
