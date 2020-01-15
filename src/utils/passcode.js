import sampleSize from 'lodash/sampleSize'
import shuffle from 'lodash/shuffle'

export const generatePasscode = (rules = {}) => {
  var config = {
    digits: (rules.restrictMinDigits && parseInt(rules.minDigits)) || 4,
    length: parseInt(rules.minLength) || 6
  }
  var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  var chars = [].concat(sampleSize(digits, config.digits))
  if (chars.length < config.length) {
    chars = chars.concat(sampleSize(digits, config.length - chars.length))
  }
  return shuffle(chars).join('')
}
