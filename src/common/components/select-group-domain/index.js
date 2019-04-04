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

controller.$inject = ['Alert', 'GroupDomainService']
function controller(Alert, GroupDomainService) {
  this.$onInit = () => {
    this.loading = true
    GroupDomainService.index(this.serviceProviderId, this.groupId)
      .then(data => (this.domains = data))
      .catch(Alert.notify.danger)
      .finally(() => (this.loading = false))
  }
}
