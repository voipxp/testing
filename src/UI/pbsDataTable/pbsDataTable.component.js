;(function() {
  angular.module('odin.UI').component('pbsDataTable', {
    templateUrl: 'UI/pbsDataTable/pbsDataTable.component.html',
    controller: Controller,
    bindings: {
      orderBy: '@',
      columns: '<',
      filter: '<',
      hideSearch: '<',
      items: '<',
      isBordered: '<',
      isNarrow: '<',
      isCompact: '<',
      isStriped: '<',
      limitTo: '<',
      search: '=',
      showSelect: '=',
      onClick: '&?',
      onSelect: '&?'
    }
  })

  function Controller(EventEmitter, $filter) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.click = click
    ctrl.select = select
    ctrl.sendSelect = sendSelect
    ctrl.toggleAll = toggleAll
    ctrl.sort = sort
    ctrl.selected = []
    ctrl.cancel = cancel
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

    function filteredItems() {
      var search = $filter('filter')(ctrl.items, ctrl.search)
      return $filter('filter')(search, ctrl.filter)
    }

    function toggleAll() {
      ctrl.selected = ctrl.selectAll ? filteredItems() : []
    }

    function select() {
      ctrl.selectAll = ctrl.selected.length === filteredItems().length
    }

    function sort(key) {
      if (key === ctrl.order.key) {
        ctrl.order.reverse = !ctrl.order.reverse
      } else {
        ctrl.order.key = key
        ctrl.order.reverse = false
      }
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
