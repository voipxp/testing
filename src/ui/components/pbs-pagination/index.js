/*
  IN VIEW:
    - We are capturing (items piped a search filter) into a scope variable results
    - We then use results.length to send to the pagination component
    - The pagination component sends us back a pager object every time its updated
    - We can use the pager.limit and pager.offset to pass to limitTo in the ng-repeat
    - The pbs-pagination element takes care of the prev, next arrows

  Just pass the pager to the paginate filter
  <tr ng-repeat="item in results = ($ctrl.items | filter:$ctrl.search) | paginate:$ctrl.pager">
    <td>{{ item.name }}</td>
  </tr>

  Or manually use the pager in a limitTo filter
  <tr ng-repeat="item in results = ($ctrl.items | filter:$ctrl.search) | limitTo:$ctrl.pager.limit:$ctrl.pager.offset">
    <td>{{ item.name }}</td>
  </tr>

  <pbs-pagination items="results.length"
    limit="25"
    on-update="$ctrl.onPagination($event)">
  </pbs-pagination>


  IN COMPONENT CONTROLLER
    - Capture the pager object and put it into scope for the view

    ctrl.onPagination = function(event) {
      ctrl.pager = event.pager
    }

*/

import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.ui').component('pbsPagination', {
  template,
  controller,
  bindings: { items: '<', limit: '<', onUpdate: '&', position: '@' }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.previous = previous
  ctrl.next = next
  ctrl.first = first
  ctrl.last = last

  function onInit() {
    if (ctrl.position === 'right') {
      ctrl.positionClass = 'is-right'
    } else if (ctrl.position === 'center') {
      ctrl.positionClass = 'is-centered'
    }
  }

  function offset() {
    return (ctrl.page - 1) * ctrl.limit
  }

  // always set page to 1 on changes
  function onChanges(changes) {
    if (changes.items || changes.limit) {
      ctrl.items = parseInt(ctrl.items, 10) || 0
      ctrl.limit = parseInt(ctrl.limit, 10) || 25
      ctrl.pages = Math.ceil(ctrl.items / ctrl.limit)
      ctrl.page = 1
      sendUpdate()
    }
  }

  function previous() {
    if (ctrl.page === 1) return
    ctrl.page--
    sendUpdate()
  }

  function next() {
    if (ctrl.page === ctrl.pages) return
    ctrl.page++
    sendUpdate()
  }

  function first() {
    ctrl.page = 1
    sendUpdate()
  }

  function last() {
    ctrl.page = ctrl.pages
    sendUpdate()
  }

  function sendUpdate() {
    var pager = {
      page: ctrl.page,
      pages: ctrl.pages,
      items: ctrl.items,
      limit: ctrl.limit,
      offset: offset()
    }
    ctrl.onUpdate(EventEmitter({ pager: pager }))
  }
}
