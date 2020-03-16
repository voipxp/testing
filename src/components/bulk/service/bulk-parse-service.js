// import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { BulkTemplateService } from '@/components/bulk'
import GroupPasswordService from '@/api/groups/group-password-service'
import GroupPasscodeService from '@/api/groups/group-passcode-service'
import ServiceProviderPasscodeService from '@/api/service-providers/service-provider-passcode-service'
import { generatePassword, generatePasscode } from '@/utils'
// parse all users at once

  // validate all the users at once
  const parse = (users) => {
    debugger
    const promises = _.castArray(users).map(function(user) {
      return parseUser(user)
    })
    return Promise.all(promises).then(function() {
      return users
    })

	  // return new Promise( (resolve, reject) => {
		//   resolve(users)
	  // })
  }

  function parseUser(user, count) {
    var max = 2
    count = count || 0
    return Object.keys(user)
      .reduce(function(promise, key) {
        return promise.then(function() {
          return parseKey(key, user)
        })
      }, Promise.resolve())
      .then(function(user) {
        return validateTags(user)
      })
      .catch(function() {
        // try again unless over max
        // console.log('parseUser', error)
        return count > max ? user : parseUser(user, count + 1)
      })
  }

  function parseKey(key, user) {
    const template = user[key]
    // skip keys without a tag
    if (!/{/.exec(template)) return Promise.resolve(user)

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

  function generateView(user, template) {
    const view = {...user}
    return addGeneratePasswordTag(template, view)
      // .then(function(view) {
      //   // return view
      //   // debugger
      //   return addGeneratePasscodeTag(template, view)
      // })
      .then((view) => {
        return view
      })
    //   .then(function() {
    //     return addGenerateSipPasswordTag(template, view)
    //   })
    //   .then(function() {
    //     return addDefaultDomainTag(template, view)
    //   })
    //   .then(function() {
    //     addPhoneNumberTags(template, view)
    //     addUserIdPrefixTag(template, view)
    //   })
    //   .then(function() {
    //     return view
    //   })
  }

  function addGeneratePasswordTag(template, view) {
    if (!hasTag('generatePassword', template)) return new Promise.resolve()
    return loadPasswordRules(view).then(function(rules) {
      view.generatePassword = function() {
        return generatePassword(rules)
      }
      return view
    })
  }

  function addGeneratePasscodeTag(template, view) {
    if (!hasTag('generatePasscode', template)) return new Promise.resolve()
    return loadPasscodeRules(view).then(function(rules) {
      view.generatePasscode = function() {
        return generatePasscode(rules)
      }
      return view
    })
  }

  function loadPasscodeRules(user) {
    var defaultRules = {}
    return loadGroupPasscodeRules(
      user.serviceProviderId,
      user.groupId,
      defaultRules
    )
  }

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
      return ServiceProviderPasscodeService.show(serviceProviderId).catch(
        function() {
          return defaultRules
        }
      )
    }

  function loadPasswordRules(user) {
    const defaultRules = {}
    return GroupPasswordService.show(
      user.serviceProviderId,
      user.groupId
    ).catch(function() {
      return defaultRules
    })
  }

  function hasTag(tag, template) {
    return _.includes(getTags(template), tag)
  }

  function getTags(template) {
    const tagRegExp = /{{[^}}]*}}/g
    template = (template && template.toString()) || ''
    const matches = template.match(tagRegExp) || []
    return matches.map(function(match) {
      return match.replace(/[^a-z0-9]/gi, '')
    })
  }

  const validate = (users, required) => {
    const promises = _.castArray(users).map(function(user) {
      return validateTags(user).then(function() {
        return validateRequired(user, required)
      })
    })
    return Promise.all(promises).then(() => {
		  return users
	  })
  }

  const validateRequired = (user, required) => {
    return new Promise(function(resolve, reject) {
      _.castArray(required).forEach(function(key) {
        const value = user[key]
        if (!value || /{/.exec(value)) {
          return reject('Required Field ' + key)
        }
      })
      resolve(user)
    })
  }

  const validateTags = (user) => {
    return new Promise(function(resolve, reject) {
      Object.keys(user).forEach(function(key) {
        var value = user[key]
        if (/{/.exec(value)) {
          return reject('Unresolved Tag ' + key)
        }
      })
      resolve(user)
    })
  }

export const BulkParseService = {
		bulkParse: parse,
		validateBulk: validate
	}
