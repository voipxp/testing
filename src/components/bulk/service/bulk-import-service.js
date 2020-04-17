//import { UiLoadingCard, UiMenu } from '@/components/ui'
// import CSVReader from 'react-csv-reader'
// import styled from 'styled-components'
import _ from 'lodash'
import { BulkTaskService } from '@/components/bulk'
import { StorageService, UtilityService } from '@/utils'

const required = ['task']

const handleFileData = (data, localStorageKey = 'BulkImportService') => {
  return transform(data)
    .then(function(data) {
      return addIndex(data)
    })
    .then(function(data) {
      return clean(data)
    })
    .then(function(data) {
      return booleanTostring(data)
    })
    .then(function(data) {
      return validate(data)
    })
    .then(function(data) {
      return StorageService.setStorage(localStorageKey, data)
    })
    .catch(error => {
      throw error || 'Data Import Error'
    })
}

const transform = data => {
  return new Promise(function(resolve) {
    const response = _.isString(data) ? data : UtilityService.flatten(data)
    resolve(response)
  })
}

const clean = data => {
  return new Promise(function(resolve) {
    data.map(user => {
      delete user.status
      delete user.error
      return user
    })
    resolve(data)
  })
}

const addIndex = data => {
  return new Promise(function(resolve) {
    /* eslint-disable-next-line unicorn/no-for-loop */
    for (const [i, element] of data.entries()) {
      element['index'] = i + 1
    }
    resolve(data)
  })
}

const validate = data => {
  return new Promise(function(resolve, reject) {
    if (_.castArray(data).length === 0) return reject('No Data Provided')
    data.forEach(row => {
      const service = BulkTaskService.getTaskDetails(row.task)
      if (!service) throw new Error(`Invalid task type ${row.task}`)
      _.uniq(required.concat(service.required)).forEach(function(key) {
        if (!row[key]) {
          return reject(`Missing required key: ${key}`)
        }
      })
    })
    resolve(data)
  })
}

const booleanTostring = data => {
  return Promise.all(data.map(booleanTostringValue)).then(function() {
    return data
  })
}

const booleanTostringValue = user => {
  Object.keys(user).map(key => {
    user[key] =
      user[key] === null || user[key] === '' || user[key] === undefined
        ? ''
        : user[key].toString()
  })

  return user
}

export const BulkImportService = {
  handleFileData: handleFileData
}
