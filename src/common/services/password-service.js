import angular from 'angular'
import _ from 'lodash'

angular.module('odin.common').factory('PasswordService', PasswordService)

function PasswordService() {
  var service = { generate: generate }
  return service

  function generate(rules) {
    rules = rules || {}
    var config = {
      digits: (rules.restrictMinDigits && parseInt(rules.minDigits, 10)) || 1,
      upper:
        (rules.restrictMinUpperCaseLetters &&
          parseInt(rules.minUpperCaseLetters, 10)) ||
        1,
      lower:
        (rules.restrictMinLowerCaseLetters &&
          parseInt(rules.minLowerCaseLetters, 10)) ||
        1,
      special:
        (rules.restrictMinNonAlphanumericCharacters &&
          parseInt(rules.minNonAlphanumericCharacters, 10)) ||
        1,
      length: parseInt(rules.minLength, 10) || 8
    }
    var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var lower = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z'
    ]
    var upper = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ]
    var special = [
      '!',
      '@',
      '#',
      '$',
      '^',
      '&',
      '{',
      '}',
      '*',
      '.',
      '-',
      '(',
      ')',
      '_'
    ]
    var chars = []
      .concat(_.sampleSize(digits, config.digits))
      .concat(_.sampleSize(upper, config.upper))
      .concat(_.sampleSize(lower, config.lower))
      .concat(_.sampleSize(special, config.special))
    if (chars.length < config.length) {
      chars = chars.concat(_.sampleSize(lower, config.length - chars.length))
    }
    return _.shuffle(chars).join('')
  }
}

/*
<xs:element name="disallowUserId" type="xs:boolean"/>
<xs:element name="disallowOldPassword" type="xs:boolean"/>
<xs:element name="disallowReversedOldPassword" type="xs:boolean"/>
<xs:element name="restrictMinDigits" type="xs:boolean"/>
<xs:element name="minDigits" type="PasswordMinDigits"/>
<xs:element name="restrictMinUpperCaseLetters" type="xs:boolean"/>
<xs:element name="minUpperCaseLetters" type="PasswordMinUpperCaseLetters"/>
<xs:element name="restrictMinLowerCaseLetters" type="xs:boolean"/>
<xs:element name="minLowerCaseLetters" type="PasswordMinLowerCaseLetters"/>
<xs:element name="restrictMinNonAlphanumericCharacters" type="xs:boolean"/>
<xs:element name="minNonAlphanumericCharacters" type="PasswordMinNonAlphanumericCharacters"/>
<xs:element name="minLength" type="PasswordMinLength"/>
<xs:element name="maxFailedLoginAttempts" type="MaxFailedLoginAttempts"/>
<xs:element name="passwordExpiresDays" type="PasswordExpiresDays"/>
<xs:element name="sendLoginDisabledNotifyEmail" type="xs:boolean"/>
<xs:element name="loginDisabledNotifyEmailAddress" type="EmailAddress" minOccurs="0"/>
<xs:element name="disallowRulesModification" type="xs:boolean"/>
<xs:element name="disallowPreviousPasswords" type="xs:boolean"/>
<xs:element name="numberOfPreviousPasswords" type="PasswordHistoryCount"/>
*/
