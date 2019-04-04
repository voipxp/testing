// Convert complex js object to dot notation js object
// url: https://github.com/vardars/dotize
// author: vardars

var dotize = dotize || {}

dotize.convert = function(object, prefix) {
  var newObject = {}

  if ((!object || typeof object != 'object') && !Array.isArray(object)) {
    if (prefix) {
      newObject[prefix] = object
      return newObject
    } else {
      return object
    }
  }

  function isNumber(f) {
    return !isNaN(parseInt(f))
  }

  function isEmptyObject(object_) {
    for (var property in object_) {
      if (Object.hasOwnProperty.call(object_, property)) return false
    }
  }

  function getFieldName(field, prefix, isRoot, isArrayItem, isArray) {
    if (isArray)
      return (
        (prefix ? prefix : '') +
        (isNumber(field) ? '.' + field : (isRoot ? '' : '.') + field)
      )
    else if (isArrayItem) return (prefix ? prefix : '') + '.' + field
    else return (prefix ? prefix + '.' : '') + field
  }

  return (function recurse(o, p, isRoot) {
    var isArrayItem = Array.isArray(o)
    for (var f in o) {
      var currentProperty = o[f]
      if (currentProperty && typeof currentProperty === 'object') {
        if (Array.isArray(currentProperty)) {
          newObject = recurse(
            currentProperty,
            getFieldName(f, p, isRoot, false, true),
            isArrayItem
          ) // array
        } else {
          if (isArrayItem && isEmptyObject(currentProperty) == false) {
            newObject = recurse(
              currentProperty,
              getFieldName(f, p, isRoot, true)
            ) // array item object
          } else if (isEmptyObject(currentProperty) == false) {
            newObject = recurse(currentProperty, getFieldName(f, p, isRoot)) // object
          } else {
            //
          }
        }
      } else {
        if (isArrayItem || isNumber(f)) {
          newObject[getFieldName(f, p, isRoot, true)] = currentProperty // array item primitive
        } else {
          newObject[getFieldName(f, p, isRoot)] = currentProperty // primitive
        }
      }
    }

    return newObject
  })(object, prefix, true)
}

if (typeof module != 'undefined') {
  module.exports = dotize
}
