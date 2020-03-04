// import React, { useState, useEffect } from 'react'
import _ from 'lodash'

// parse all users at once

  // validate all the users at once
  const parse = (users) => {
	  return new Promise( (resolve, reject) => {
		  resolve(users)
	  })
  }

  const validate = (users, required) => {
    debugger
    var promises = _.castArray(users).map(function(user) {
      return validateTags(user).then(function() {
        return validateRequired(user, required)
      })
    })
    return Promise.all(promises).then(() => {
		  return users
	  })
  }

  const validateRequired = (user, required) => {
    debugger
    return new Promise(function(resolve, reject) {
      _.castArray(required).forEach(function(key) {
        var value = user[key]
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
