angular.module('odin.common').directive('pbsBreadcrumb', Breadcrumb)

function Breadcrumb() {
  return {
    restrict: 'E',
    templateUrl: 'common/UI/navigation/breadcrumb.directive.html',
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
