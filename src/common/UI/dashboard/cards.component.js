;(function() {
  angular.module('odin.common').component('pbsDashboardCards', {
    templateUrl: 'common/UI/dashboard/cards.component.html',
    bindings: { cards: '<', title: '@', filter: '<', limitTo: '<' },
    controller: function($location, Alert) {
      this.open = function(event) {
        var card = event.item
        if (card.path) {
          return $location.path(card.path)
        }
        Alert.notify.warning('MIGRATION IN PROGRESS')
      }
    }
  })
})()
