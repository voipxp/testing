;(function() {
  angular.module('odin.UI').component('pbsDataTable', {
    templateUrl: 'UI/pbsDataTable/pbsDataTable.component.html',
    controller: Controller,
    bindings: {
      orderBy: '@',
      orderReverse: '<',
      columns: '<',
      filter: '<',
      hideSearch: '<',
      items: '<',
      isBordered: '<',
      isNarrow: '<',
      isCompact: '<',
      isStriped: '<',
      limitTo: '<',
      search: '=?',
      showSelect: '=',
      onClick: '&?',
      onSelect: '&?'
    }
  })

  function Controller(EventEmitter, $filter, $timeout) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.click = click
    ctrl.sendSelect = sendSelect
    ctrl.toggleAll = toggleAll
    ctrl.toggle = toggle
    ctrl.sort = sort
    ctrl.cancel = cancel
    ctrl.getValue = getValue

    function onInit() {
      ctrl.order = {
        key: ctrl.orderBy || _.get(ctrl.columns, '0.key'),
        reverse: ctrl.orderReverse
      }
      ctrl.selected = 0
      ctrl.selectAll = false
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
      var isSelected = !ctrl.selectAll
      filteredItems().forEach(function(item) {
        item._selected = isSelected
      })
      updateSelected()
    }

    function toggle() {
      $timeout(updateSelected, 1)
    }

    function selectedItems() {
      return _.filter(ctrl.items, { _selected: true })
    }

    function updateSelected() {
      ctrl.selected = selectedItems().length
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
      ctrl.items.forEach(function(item) {
        delete item._selected
      })
      ctrl.selected = 0
      ctrl.selectAll = false
      ctrl.showSelect = false
    }

    function sendSelect() {
      if (_.isFunction(ctrl.onSelect) && ctrl.selected > 0) {
        ctrl.onSelect(EventEmitter(selectedItems()))
      }
      cancel()
    }
  }
})()
