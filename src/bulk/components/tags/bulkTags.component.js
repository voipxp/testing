;(function() {
  angular.module('odin.bulk').component('bulkTags', {
    templateUrl: 'bulk/components/tags/bulkTags.component.html',
    controller: Controller,
    bindings: {
      hide: '<'
    }
  })
  function Controller(HashService, Alert, BulkTagService) {
    this.$onInit = function() {
      this.modalId = HashService.guid()
      this.tags = BulkTagService.index()
    }
    this.open = function() {
      Alert.modal.open(this.modalId)
    }
    this.close = function() {
      Alert.modal.close(this.modalId)
    }
    this.show = function(key) {
      return !_.includes(_.castArray(this.hide), key)
    }
  }
})()
