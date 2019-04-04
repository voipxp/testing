import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.UI').directive('pbsBreadcrumb', Breadcrumb)

function Breadcrumb() {
  return {
    restrict: 'E',
    template,
    replace: true,
    controller: function() {
      this.$onChanges = function() {
        this.name = _.get(this.module, 'alias', this.title)
      }
    },
    scope: {},
    controllerAs: '$ctrl',
    bindToController: {
      title: '<',
      module: '<',
      href: '<',
      ngClick: '&?'
    }
  }
}
