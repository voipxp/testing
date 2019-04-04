import angular from 'angular'

angular.module('odin.UI').directive('pbsTable', pbsTable)

function pbsTable() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass(
        'table is-fullwidth is-striped is-bordered is-narrow pbs-table'
      )
      var table = element[0]
      var wrapper = document.createElement('div')
      wrapper.style.display = 'block'
      wrapper.style.width = '100%'
      wrapper.style.overflowX = 'auto'
      table.parentNode.insertBefore(wrapper, table)
      wrapper.append(table)
    }
  }
}
