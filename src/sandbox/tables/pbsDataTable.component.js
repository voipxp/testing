;(function() {
  angular.module('odin.sandbox').component('pbsDataTable', {
    templateUrl: 'sandbox/tables/pbsDataTable.component.html',
    controller: Controller,
    bindings: {
      orderBy: '@',
      columns: '<',
      items: '<',
      limitTo: '<',
      showSelect: '<',
      onClick: '&?',
      onSelect: '&?'
    }
  })

  function Controller(EventEmitter) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.click = click
    ctrl.select = select
    ctrl.toggleAll = toggleAll
    ctrl.sort = sort
    ctrl.selected = []

    function onInit() {
      ctrl.order = {
        key: ctrl.orderBy || _.get(ctrl.columns, '0.key'),
        reverse: false
      }
      ctrl.canClick = _.isFunction(ctrl.onClick)
      console.log('canClick', ctrl.canClick)
    }

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function click(item) {
      if (!ctrl.showSelect && _.isFunction(ctrl.onClick)) {
        ctrl.onClick(EventEmitter(item))
      }
    }

    function toggleAll() {
      console.log('toggleAll', ctrl.selectAll)
      ctrl.selected = ctrl.selectAll ? angular.copy(ctrl.items) : []
      sendSelect()
    }

    function select() {
      ctrl.selectAll = ctrl.selected.length === ctrl.items.length
      sendSelect()
    }

    function sort(key) {
      if (key === ctrl.order.key) {
        ctrl.order.reverse = !ctrl.order.reverse
      } else {
        ctrl.order.key = key
        ctrl.order.reverse = false
      }
      console.log('order', ctrl.order)
    }

    function sendSelect() {
      if (_.isFunction(ctrl.onSelect)) {
        ctrl.onSelect(EventEmitter(ctrl.selected))
      }
    }
  }
})()
