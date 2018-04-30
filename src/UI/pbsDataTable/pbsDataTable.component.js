;(function() {
  angular.module('odin.UI').component('pbsDataTable', {
    templateUrl: 'UI/pbsDataTable/pbsDataTable.component.html',
    controller: Controller,
    bindings: {
      orderBy: '@',
      columns: '<',
      items: '<',
      limitTo: '<',
      filter: '<',
      showSelect: '=',
      onClick: '&?',
      onSelect: '&?',
      isBordered: '<',
      isNarrow: '<',
      isCompact: '<',
      isStriped: '<'
    }
  })

  function Controller(EventEmitter) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.click = click
    ctrl.select = select
    ctrl.sendSelect = sendSelect
    ctrl.toggleAll = toggleAll
    ctrl.sort = sort
    ctrl.selected = []
    ctrl.getValue = getValue

    function onInit() {
      ctrl.order = {
        key: ctrl.orderBy || _.get(ctrl.columns, '0.key'),
        reverse: false
      }
      ctrl.canClick = _.isFunction(ctrl.onClick)
    }

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function click(item) {
      if (!ctrl.showSelect && _.isFunction(ctrl.onClick)) {
        ctrl.onClick(EventEmitter(item))
      }
    }

    function getValue(item, key) {
      return _.get(item, key)
    }

    function toggleAll() {
      ctrl.selected = ctrl.selectAll ? angular.copy(ctrl.items) : []
    }

    function select() {
      ctrl.selectAll = ctrl.selected.length === ctrl.items.length
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

    function cancel() {
      ctrl.selected = []
      ctrl.selectAll = false
      ctrl.showSelect = false
    }

    function sendSelect() {
      if (_.isFunction(ctrl.onSelect) && ctrl.selected.length > 0) {
        ctrl.onSelect(EventEmitter(ctrl.selected))
      }
      cancel()
    }
  }
})()
