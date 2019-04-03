import angular from 'angular'

angular.module('odin.UI').directive('pbsTableSearch', pbsTableSearch)

function pbsTableSearch() {
  return {
    restrict: 'E',
    template:
      '<input type="search" placeholder="search" class="pbs-table-search input">',
    replace: true
  }
}
