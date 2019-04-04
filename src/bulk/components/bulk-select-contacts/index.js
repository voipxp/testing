import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectContacts', {
  template,
  controller,
  bindings: {
    mobilePhoneNumber: '<',
    pagerPhoneNumber: '<',
    emailAddress: '<',
    yahooId: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
  var ctrl = this
  ctrl.complete = complete

  function complete() {
    ctrl.onUpdate(
      EventEmitter({
        mobilePhoneNumber: ctrl.mobilePhoneNumber,
        pagerPhoneNumber: ctrl.pagerPhoneNumber,
        emailAddress: ctrl.emailAddress,
        yahooId: ctrl.yahooId
      })
    )
  }
}
