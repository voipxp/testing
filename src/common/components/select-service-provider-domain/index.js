import angular from 'angular'

const template = `
  <pbs-input-select ng-model="$ctrl.ngModel"
    loading="$ctrl.loading"
    ng-options="domain as domain for domain in $ctrl.domains.domains"
    ng-required="$ctrl.ngRequired">
    <option ng-if="!$ctrl.ngRequired"
      value="">None</option>
  </pbs-input-select>
  `

angular.module('odin.common').component('selectGroupDomain', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    ngRequired: '<',
    ngModel: '='
  }
})

controller.$inject = ['Alert', 'ServiceProviderDomainService']
function controller(Alert, ServiceProviderDomainService) {
  this.$onInit = () => {
    this.loading = true
    ServiceProviderDomainService.index(this.serviceProviderId)
      .then(data => (this.domais = data))
      .catch(Alert.notify.danger)
      .finally(() => (this.loading = false))
  }
}
