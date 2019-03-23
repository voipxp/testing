import angular from 'angular'
import _ from 'lodash'

angular.module('odin.common').factory('NumberService', NumberService)

function NumberService() {
  var service = {
    expand: expand,
    generate: generate,
    regex: /^\+?(\d[\s-.]?){9,14}\d$/
  }
  return service

  function expand(numbers) {
    if (!_.isArray(numbers)) {
      numbers = [numbers]
    }
    return expandRanges(numbers)
  }

  function generate(start, length) {
    length = parseInt(length, 10)
    start = start.replace(/[^\d]/g, '')
    var results = []
    var zeroNumber = start[0] === '0' ? '0' : ''
    var startInt = parseInt(start, 10)
    for (var i = 0; i < length; i++) {
      var next = startInt + i
      var number = { min: zeroNumber + next.toString(), max: null }
      results.push(number)
    }
    return results
  }

  function expandRanges(ranges) {
    var expanded = []
    var regex = /(^\+\d+-)?(\d+)/
    ranges.forEach(function(range) {
      if (!range.min) {
        return
      }
      if (!range.max) {
        expanded.push(range)
        return
      }
      // parse range
      var matches = regex.exec(range.min)
      var prefix = matches[1] || ''
      var minString = matches[2] || ''
      var zeroNumber = minString[0] === '0' ? '0' : ''
      // set integer min
      var min = parseInt(minString, 10)
      // set integer max
      var max = parseInt(range.max.replace(regex, '$2'), 10)
      // guard against non-number
      if (!_.isNumber(min) && !_.isNumber(max)) return
      // guard against typo huge ranges
      if (min.toString().length !== max.toString().length) return
      // calculate all numbers in range
      for (var num = min; num <= max; num++) {
        var number = angular.copy(range)
        number.min = prefix + zeroNumber + num.toString()
        number.max = null
        expanded.push(number)
      }
    })
    return expanded
  }
}
