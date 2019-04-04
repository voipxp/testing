import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.ui').component('pbsDashboardCards', {
  template,
  controller,
  bindings: { cards: '<', title: '@', filter: '<', limitTo: '<' }
})

controller.$inject = ['$location']
function controller($location) {
  this.open = function(event) {
    var card = event.item
    if (card.path) {
      return $location.path(card.path)
    }
  }
}
