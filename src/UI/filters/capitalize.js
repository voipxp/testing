import angular from 'angular'
import _ from 'lodash'

angular.module('odin.common').filter('capitalize', Capitalize)

function Capitalize() {
  return function(input) {
    return _.isString(input) ? _.startCase(input) : ''
  }
}
