import _ from 'lodash'
import dotize from '../lib/dotize'

  const castArray = (object) => {
    return _.castArray(object)
  }

  // flatten an object or a collection
  // { address: { city: 'city'} } to { 'address.city': 'city' }
  export const flatten = (data) => {
    if (!_.isArray(data)) return dotize.convert(data)
    return data.map(function(item) {
      return dotize.convert(item)
    })
  }

  // unflatten an object or collection
  // { 'address.city': 'city' } to { address: { city: 'city'} }
  const unflatten = (data) => {
    function unflat(object) {
      var newObject = {}
      _.forOwn(object, function(value, key) {
        _.set(newObject, key, value)
      })
      return newObject
    }
    if (!_.isArray(data)) return unflat(data)
    return data.map(function(item) {
      return unflat(item)
    })
  }

  // strip special from an object or collection
  const stripSpecial = (data) => {
    function strip(object) {
      return _.omitBy(object, function(value, key) {
        return /\$/.exec(key)
      })
    }
    if (!_.isArray(data)) return strip(data)
    return data.map(function(item) {
      return strip(item)
    })
  }

  // get all unique keys in a collection of objects
  const allKeys = (objects) => {
    var keys = {}
    objects.forEach(function(object) {
      _.forOwn(object, function(value, key) {
        if (!/\$/.exec(key)) {
          keys[key] = true
        }
      })
    })
    return _.keys(keys)
  }

  const getMediaType = (mimetype) => {
    switch (mimetype) {
      case 'audio/wav':
        return 'WAV'
      case 'video/x-ms-wma':
        return 'WMA'
      case 'video/3gpp':
        return '3GP'
      case 'video/quicktime':
        return 'MOV'
      default:
        return 'WAV'
    }
  }


	export const UtilityService =  {
		flatten: flatten,
		unflatten: unflatten,
		castArray: castArray,
		allKeys: allKeys,
		stripSpecial: stripSpecial,
		getMediaType: getMediaType
	}
