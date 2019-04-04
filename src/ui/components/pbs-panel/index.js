/*
  <pbs-panel title="My Panel"
    items="$ctrl.myItems"
    item-key='name'
    on-select="$ctrl.onSelectItem($event)">
  </pbs-panel>
*/

import angular from 'angular'
import _ from 'lodash'
import template from './index.html'
import './index.css'

angular.module('odin.ui').component('pbsPanel', {
  template,
  controller,
  bindings: {
    title: '@',
    itemKey: '@',
    items: '<',
    filter: '<',
    limitTo: '<',
    onSelect: '&'
  },
  transclude: { buttons: '?pbsPanelButtons' }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
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
