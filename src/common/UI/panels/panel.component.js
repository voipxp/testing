/*
  <pbs-panel title="My Panel"
    items="$ctrl.myItems"
    item-key='name'
    on-select="$ctrl.onSelectItem($event)">
  </pbs-panel>
*/
;(function() {
  angular.module('odin.common').component('pbsPanel', {
    templateUrl: 'common/UI/panels/panel.component.html',
    bindings: {
      title: '@',
      itemKey: '@',
      items: '<',
      filter: '<',
      limitTo: '<',
      onSelect: '&'
    },
    transclude: {
      buttons: '?pbsPanelButtons'
    },
    controller: function(EventEmitter) {
      var ctrl = this
      ctrl.select = select
      ctrl.itemName = itemName
      ctrl.onPagination = onPagination
      function onPagination(event) {
        ctrl.pager = event.pager
      }
      function itemName(item) {
        return _.get(item, ctrl.itemKey)
      }
      function select(item) {
        ctrl.onSelect(EventEmitter({ item: item }))
      }
    }
  })
})()
