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

angular.module('odin.common').component('selectDomain', {
  template,
  controller,
  bindings: { ngRequired: '<', ngModel: '=' }
})

controller.$inject = ['Alert', 'SystemDomainService']
function controller(Alert, SystemDomainService) {
  this.$onInit = () => {
    this.loading = true
    SystemDomainService.index()
      .then(data => (this.domains = data))
      .catch(Alert.notify.danger)
      .finally(() => (this.loading = false))
  }
}
