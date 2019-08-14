import angular from 'angular'
import _ from 'lodash'

angular.module('odin.bulk').factory('BulkParseService', BulkParseService)

BulkParseService.$inject = [
  '$q',
  'BulkTemplateService',
  'GroupDomainService',
  'GroupPasswordService',
  'PasswordService',
  'ServiceProviderPasscodeService',
  'GroupPasscodeService',
  'PasscodeService'
]
function BulkParseService(
  $q,
  BulkTemplateService,
  GroupDomainService,
  GroupPasswordService,
  PasswordService,
  ServiceProviderPasscodeService,
  GroupPasscodeService,
  PasscodeService
) {
  var service = {
    parse: parse,
    validate: validate
  }

  return service

  // parse all users at once
  function parse(users) {
    var promises = _.castArray(users).map(function(user) {
      return parseUser(user)
    })
    return $q.all(promises).then(function() {
      return users
    })
  }

  // parse each key one at a time and loop up
  // to three times if needed
  function parseUser(user, count) {
    var max = 2
    count = count || 0
    // console.log('count', count)
    // reduce function makes them sequential
    return Object.keys(user)
      .reduce(function(promise, key) {
        return promise.then(function() {
          return parseKey(key, user)
        })
      }, $q.when(true))
      .then(function() {
        return validateTags(user)
      })
      .catch(function() {
        // try again unless over max
        // console.log('parseUser', error)
        return count > max ? user : parseUser(user, count + 1)
      })
  }

  function parseKey(key, user) {
    var template = user[key]
    // skip keys without a tag
    if (!/{/.exec(template)) return $q.when(user)

    return generateView(user, template)
      .then(function(view) {
        return BulkTemplateService.parse(template, view)
      })
      .then(function(value) {
        // set the new value
        user[key] = value
        return user[key]
      })
      .catch(function() {
        // ignore to keep unresolved tags
        return user[key]
      })
  }

  function getTags(template) {
    var tagRegExp = /{{[^}}]*}}/g
    template = (template && template.toString()) || ''
    var matches = template.match(tagRegExp) || []
    return matches.map(function(match) {
      return match.replace(/[^a-z0-9]/gi, '')
    })
  }

  function hasTag(tag, template) {
    return _.includes(getTags(template), tag)
  }

  function generateView(user, template) {
    var view = angular.copy(user)

    return addGeneratePasswordTag(template, view)
      .then(function() {
        return addGeneratePasscodeTag(template, view)
      })
      .then(function() {
        return addDefaultDomainTag(template, view)
      })
      .then(function() {
        addPhoneNumberTags(template, view)
        addUserIdPrefixTag(template, view)
      })
      .then(function() {
        return view
      })
  }

  function addPhoneNumberTags(template, view) {
    if (hasTag('phoneNumberDigits', template)) {
      view.phoneNumberDigits = function() {
        if (this.phoneNumber) {
          return this.phoneNumber.toString().replace(/\D/g, '')
        }
      }
    }
    if (hasTag('phoneNumberShort', template)) {
      view.phoneNumberShort = function() {
        if (this.phoneNumber) {
          return this.phoneNumber.toString().replace(/^\+\d+-/g, '')
        }
      }
    }
    if (hasTag('phoneNumberLast3', template)) {
      view.phoneNumberLast3 = phoneNumberLast(3)
    }
    if (hasTag('phoneNumberLast4', template)) {
      view.phoneNumberLast4 = phoneNumberLast(4)
    }
    if (hasTag('phoneNumberLast5', template)) {
      view.phoneNumberLast5 = phoneNumberLast(5)
    }
    if (hasTag('phoneNumberLast6', template)) {
      view.phoneNumberLast6 = phoneNumberLast(6)
    }
  }

  function phoneNumberLast(amount) {
    return function() {
      if (this.phoneNumber) {
        return this.phoneNumber.slice(-amount)
      }
    }
  }

  function addUserIdPrefixTag(template, view) {
    if (hasTag('userIdPrefix', template)) {
      view.userIdPrefix = function() {
        return this.userId.toString().split('@')[0]
      }
    }
  }

  function addGeneratePasswordTag(template, view) {
    if (!hasTag('generatePassword', template)) return $q.resolve()
    return loadPasswordRules(view).then(function(rules) {
      view.generatePassword = function() {
        return PasswordService.generate(rules)
      }
    })
  }

  function addGeneratePasscodeTag(template, view) {
    if (!hasTag('generatePasscode', template)) return $q.resolve()
    return loadPasscodeRules(view).then(function(rules) {
      view.generatePasscode = function() {
        return PasscodeService.generate(rules, view)
      }
    })
  }

  function addDefaultDomainTag(template, view) {
    if (!hasTag('defaultDomain', template)) return $q.resolve()
    return loadDefaultDomain(view).then(function(domain) {
      view.defaultDomain = function() {
        return domain || this.domain
      }
    })
  }

  function loadPasswordRules(user) {
    var defaultRules = {}
    return GroupPasswordService.show(user.serviceProviderId, user.groupId).catch(function() {
      return defaultRules
    })
  }

  function loadPasscodeRules(user) {
    var defaultRules = {}
    return loadGroupPasscodeRules(user.serviceProviderId, user.groupId, defaultRules)
  }

  // First try the Group Rules
  //  - If it fails, then try the SP rules, pass the defaultRules along
  // If the group rules suggest to use the SP rules
  //  - Then try the SP rules, pass in the group rules as default
  // Otherwise, return the group rules
  function loadGroupPasscodeRules(serviceProviderId, groupId, defaultRules) {
    return GroupPasscodeService.show(serviceProviderId, groupId)
      .then(function(groupRules) {
        if (groupRules.useRuleLevel === 'Service Provider') {
          return loadServiceProviderPasscodeRules(serviceProviderId, groupRules)
        } else {
          return groupRules
        }
      })
      .catch(function() {
        return loadServiceProviderPasscodeRules(serviceProviderId, defaultRules)
      })
  }

  // Return the SP rules or the defaultRules passed in
  function loadServiceProviderPasscodeRules(serviceProviderId, defaultRules) {
    return ServiceProviderPasscodeService.show(serviceProviderId).catch(function() {
      return defaultRules
    })
  }

  function loadDefaultDomain(user) {
    return GroupDomainService.index(user['serviceProviderId'], user['groupId']).then(function(
      data
    ) {
      return data.default
    })
  }

  // validate all the users at once
  function validate(users, required) {
    var promises = _.castArray(users).map(function(user) {
      return validateTags(user).then(function() {
        return validateRequired(user, required)
      })
    })
    return $q.all(promises)
  }

  function validateRequired(user, required) {
    return $q(function(resolve, reject) {
      _.castArray(required).forEach(function(key) {
        var value = user[key]
        if (!value || /{/.exec(value)) {
          return reject('Required Field ' + key)
        }
      })
      resolve(user)
    })
  }

  function validateTags(user) {
    return $q(function(resolve, reject) {
      Object.keys(user).forEach(function(key) {
        var value = user[key]
        if (/{/.exec(value)) {
          return reject('Unresolved Tag ' + key)
        }
      })
      resolve(user)
    })
  }
}
