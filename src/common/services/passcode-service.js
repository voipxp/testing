import angular from 'angular'
import _ from 'lodash'

angular.module('odin.common').factory('PasscodeService', PasscodeService)

function PasscodeService() {
  var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  var service = { generate: generate, validate: validate }
  return service

  function generate(rules, user) {
    var config = getConfig(rules)
    var passcode = _.sample(digits)
    for (var i = 1; i < config.minLength; i++) {
      passcode += getNextDigit(passcode, rules, user)
    }
    return passcode
  }

  function getNextDigit(passcode, rules, user) {
    var nextDigit
    for (;;) {
      nextDigit = _.sample(digits)
      var nextPasscode = passcode + nextDigit
      if (validate(nextPasscode, rules, user)) {
        break
      }
    }
    return nextDigit
  }

  function getConfig(rules) {
    rules = rules || {}
    return {
      minLength: rules.minCodeLength || 6,
      maxLength: rules.maxCodeLength || 10,
      userNumber: rules.disallowUserNumber,
      userNumberReverse: rules.disallowReversedUserNumber,
      sequenceAscending:
        rules.disallowContiguousSequences && rules.numberOfAscendingDigits,
      sequenceDescending:
        rules.disallowContiguousSequences && rules.numberOfDescendingDigits,
      repeatingDigits:
        rules.disallowRepeatedDigits && rules.numberOfRepeatedDigits,
      repeatingPatterns: rules.disallowRepeatedPatterns
    }
  }

  function validate(passcode, rules, user) {
    if (!passcode) return false
    user = user || {}
    var config = getConfig(rules)
    return (
      true &&
      validateUserNumber(passcode, config, user) &&
      validateUserNumberReverse(passcode, config, user) &&
      validateSequenceAscending(passcode, config) &&
      validateSequenceDescending(passcode, config) &&
      validateRepeatingDigits(passcode, config) &&
      validateRepeatingPatterns(passcode, config)
    )
  }

  function validateUserNumber(passcode, config, user) {
    if (!config.userNumber) return true
    return user.phoneNumber !== passcode && user.extension !== passcode
  }

  function validateUserNumberReverse(passcode, config, user) {
    if (!config.userNumberReverse) return true
    var reverse = passcode
      .split('')
      .reverse()
      .join('')
    return user.phoneNumber !== reverse && user.extension !== reverse
  }

  function validateSequenceAscending(passcode, config) {
    if (!config.sequenceAscending) return true
    return checkConsecutive(passcode, config.sequenceAscending, 'ascending')
  }

  function validateSequenceDescending(passcode, config) {
    if (!config.sequenceDescending) return true
    return checkConsecutive(passcode, config.sequenceDescending, 'descending')
  }

  function validateRepeatingDigits(passcode, config) {
    if (!config.repeatingDigits) return true
    return checkConsecutive(passcode, config.repeatingDigits, 'repeating')
  }

  function validateRepeatingPatterns(passcode, config) {
    if (!config.repeatingPatterns) return true
    return true
  }

  // Check for consecutive characters.
  // Returns true if the number does not fail the test
  //   eg: number is OK to use
  // Parameters:
  //   str: string to check
  //   limit: limit to the number of consecutive chars
  //   type: 'ascending', 'descending', 'consecutive, 'repeating'
  function checkConsecutive(string, limit, type) {
    if (!string) return true
    if (!limit || limit < 2) return true
    // start with first digit as lastDigit
    var lastDigit = string.charCodeAt(0)
    var consecutive = 1
    var results = true
    // start on the second digit
    for (var i = 1; i < string.length; i++) {
      var currentDigit = string.charCodeAt(i)
      var delta = currentDigit - lastDigit
      lastDigit = currentDigit
      if (isConsecutive(type, delta)) {
        consecutive += 1
      } else {
        consecutive = 1
      }
      if (consecutive >= limit) {
        results = false
        break
      }
    }
    return results
  }

  function isConsecutive(type, delta) {
    if (type === 'ascending') {
      return delta === 1
    } else if (type === 'descending') {
      return delta === -1
    } else if (type === 'consecutive') {
      return Math.abs(delta) === 1
    } else if (type === 'repeating') {
      return delta === 0
    } else {
      return false
    }
  }
}

/*
<xs:element name="useRuleLevel" type="GroupPasscodeRulesLevel"/>
<xs:element name="disallowRepeatedDigits" type="xs:boolean"/>
<xs:element name="numberOfRepeatedDigits" type="PasscodeMaxRepeatedDigits"/>
<xs:element name="disallowRepeatedPatterns" type="xs:boolean"/>
<xs:element name="disallowContiguousSequences" type="xs:boolean"/>
<xs:element name="numberOfAscendingDigits" type="PasscodeMaxContiguousDigits"/>
<xs:element name="numberOfDescendingDigits" type="PasscodeMaxContiguousDigits"/>
<xs:element name="disallowUserNumber" type="xs:boolean"/>
<xs:element name="disallowReversedUserNumber" type="xs:boolean"/>
<xs:element name="disallowOldPasscode" type="xs:boolean"/>
<xs:element name="numberOfPreviousPasscodes" type="PasscodeHistoryCount"/>
<xs:element name="disallowReversedOldPasscode" type="xs:boolean"/>
<xs:element name="minCodeLength" type="PasscodeMinLength"/>
<xs:element name="maxCodeLength" type="PasscodeMaxLength"/>
<xs:element name="disableLoginAfterMaxFailedLoginAttempts" type="xs:boolean"/>
<xs:element name="maxFailedLoginAttempts" type="PortalMaxFailedLoginAttempts" minOccurs="0"/>
<xs:element name="expirePasscode" type="xs:boolean"/>
<xs:element name="passcodeExpiresDays" type="PasscodeExpiresDays" minOccurs="0"/>
<xs:element name="sendLoginDisabledNotifyEmail" type="xs:boolean"/>
<xs:element name="loginDisabledNotifyEmailAddress" type="EmailAddress" minOccurs="0"/>
*/
