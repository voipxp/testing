import sampleSize from 'lodash/sampleSize'
import shuffle from 'lodash/shuffle'

export const generatePassword = (rules = {}) => {
  var config = {
    digits: (rules.restrictMinDigits && parseInt(rules.minDigits)) || 1,
    upper: (rules.restrictMinUpperCaseLetters && parseInt(rules.minUpperCaseLetters)) || 1,
    lower: (rules.restrictMinLowerCaseLetters && parseInt(rules.minLowerCaseLetters)) || 1,
    special:
      (rules.restrictMinNonAlphanumericCharacters &&
        parseInt(rules.minNonAlphanumericCharacters)) ||
      1,
    length: parseInt(rules.minLength) || 8
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
  var special = ['!', '@', '#', '$', '^', '&', '{', '}', '*', '.', '-', '(', ')', '_']
  var chars = []
    .concat(sampleSize(digits, config.digits))
    .concat(sampleSize(upper, config.upper))
    .concat(sampleSize(lower, config.lower))
    .concat(sampleSize(special, config.special))
  if (chars.length < config.length) {
    chars = chars.concat(sampleSize(lower, config.length - chars.length))
  }
  return shuffle(chars).join('')
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
