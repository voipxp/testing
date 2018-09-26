;(function() {
  angular.module('odin.common').component('pbsTags', {
    templateUrl: 'common/components/tags/pbsTags.component.html',
    bindings: { hideTags: '<' },
    controller: function(HashService, Alert) {
      this.tags = [
        {
          tag: '{{ userId }}',
          example: '5133334444@example.com'
        },
        {
          tag: '{{ userIdPrefix }}',
          example: '5133334444'
        },
        {
          tag: '{{ userIdSuffix }}',
          example: 'mydomain.com'
        },
        {
          tag: '{{ phoneNumber }}',
          example: '+1-5133334444'
        },
        {
          tag: '{{ phoneNumberDigits }}',
          example: '15133334444'
        },
        {
          tag: '{{ phoneNumberShort }}',
          example: '5133334444'
        },
        {
          tag: '{{ extension }}',
          example: '4444'
        },
        {
          tag: '{{ lastName }}',
          example: 'Smith'
        },
        {
          tag: '{{ firstName }}',
          example: 'Jenny'
        },
        {
          tag: '{{ serviceProviderId }}',
          example: 'serviceProvider123'
        },
        {
          tag: '{{ groupId }}',
          example: 'group456'
        }
      ]
      this.$onInit = function() {
        this.modalId = HashService.guid()
        this.tags.forEach(function(tag) {
          tag.property = tag.tag.replace(/\W/g, '')
        })
      }
      this.open = function() {
        Alert.modal.open(this.modalId)
      }
      this.close = function() {
        Alert.modal.close(this.modalId)
      }
      this.show = function(tag) {
        return !_.includes(_.castArray(this.hideTags), tag.property)
      }
    }
  })
})()
