import angular from 'angular'

angular.module('odin.bulk').factory('BulkTagService', BulkTagService)

function BulkTagService() {
  var tags = [
    {
      tag: '{{ userId }}',
      example: '5133334444@example.com'
    },
    {
      tag: '{{ userIdPrefix }}',
      example: '5133334444'
    },
    {
      tag: '{{ index }}',
      example: '1'
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
      tag: '{{ phoneNumberLast3 }}',
      example: '444'
    },
    {
      tag: '{{ phoneNumberLast4 }}',
      example: '4444'
    },
    {
      tag: '{{ phoneNumberLast5 }}',
      example: '34444'
    },
    {
      tag: '{{ lastName }}',
      example: 'lastName'
    },
    {
      tag: '{{ firstName }}',
      example: 'firstName'
    },
    {
      tag: '{{ extension }}',
      example: '4444'
    },
    {
      tag: '{{ domain }}',
      example: 'mydomain.com'
    },
    {
      tag: '{{ defaultDomain }}',
      example: 'groupdomain.com'
    },
    {
      tag: '{{ serviceProviderId }}',
      example: 'serviceProvider1'
    },
    {
      tag: '{{ groupId }}',
      example: 'group1'
    },
    {
      tag: '{{ generatePassword }}',
      example: 'Alk34!n5'
    },
    {
      tag: '{{ generatePasscode }}',
      example: '43683'
    }
  ]

  tags.forEach(function(tag) {
    tag.property = tag.tag.replace(/\W/g, '')
  })

  function index() {
    return tags
  }

  function view() {
    var object = {}
    tags.forEach(function(tag) {
      object[tag.property] = tag.example
    })
    return object
  }

  return { index: index, view: view }
}
