import React, { useEffect } from 'react'
//import { UiLoadingCard, UiMenu } from '@/components/ui'
// import CSVReader from 'react-csv-reader'
// import styled from 'styled-components'
import _ from 'lodash'
import { BulkTaskService  } from '@/components/bulk'
import { useAlerts } from '@/store/alerts'
import { StorageService, UtilityService } from '@/utils'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

  const required = ['task']

// useEffect( () => {

  const handleFileData = (data, localStorageKey='BulkImportService') => {
    return transform(data)
    .then(function(data) {
      return addIndex(data)
    })
    .then(function(data) {
      return clean(data)
    })
    // addIndex(data).then(function(data) {
    // return clean(data)
    // })
    .then(function(data) {
      return booleanTostring(data)
    })
    .then(function(data) {
    return addServiceProvidersGroups(data)
    })
    .then(function(data) {
    return validate(data)
    })
    .then(function(data) {
    return StorageService.setStorage(localStorageKey, data)
    })
    // .then( () => {
    // // setNavigateToImport(true)
    // })
    .catch( (error) => {
      console.log('VVVVVVVVVVVVVVV')
      console.log(error)
      throw error || 'Data Import Error'
      // return Promise.reject(error || 'Data Import Error')
      //throw error || 'Data Import Error';
      // return new Promise( (resolve, reject) => {
      //   reject(error)
      // })

    // alertDanger( error || 'Data Import Error' )

    })
  }

  // handleFileData(props.data)
// export const BulkImportService = () => {
  // export const BulkImportService = {
  //   handleFileData: handleFileData
  // }
// }
	// }, [])


  const parserOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.replace(/\W/g, "_")
  }

  const transform = (data) => {
    return new Promise(function(resolve) {
      const response = _.isString(data)
        // ? CsvService.import(data)
        ? data : UtilityService.flatten(data)
      resolve(response)
    })
  }

  const clean = (data) => {
    return new Promise(function(resolve) {
      data.map( user => {
        delete user.status
        delete user.error
        return user
      })
      resolve(data)
    })
  }

  const addServiceProvidersGroups = (data) => {
    return Promise.all(data.map( addServiceProviderGroup )).then(function() {
      return data
    })
  }

  /* Note this has to be develop */
  const addServiceProviderGroup = (user) => {
    if(user.serviceProviderId && user.groupId) {
      return user
      // Promise.resolve(user)
    } else {
      // Promise.resolve(user)
      return user;
    }
  }

  const addIndex = (data) => {
    return new Promise(function(resolve) {
      /* eslint-disable-next-line unicorn/no-for-loop */
      for (const [i, element] of data.entries()) {
        element['index'] = i + 1
      }
      resolve(data)
    })
  }

const validate = (data) => {
    return new Promise(function(resolve, reject) {
      if(_.castArray(data).length === 0) return reject("No Data Provided")
      data.forEach(row => {
        const service = BulkTaskService.getTaskDetails(row.task)
        if(!service) throw new Error(`Invalid task type ${row.task}`)
        _.uniq(required.concat(service.required)).forEach(function(key) {
          if (!row[key]) {
            return reject(`Missing required key: ${key}`)
            //throw new Error(`Missing required key: ${key}`)
          }
        })
      });
      resolve(data)
    })
}

const booleanTostring = (data) => {
  return Promise.all(data.map(booleanTostringValue)).then(function() {
    return data
  })
}

const booleanTostringValue = (user) => {
  Object.keys(user).map( key => {
    user[key] = (user[key] === null || user[key] === '' || user[key] === undefined) ? '': user[key].toString()
  })

  return user
}

export const BulkImportService = {
  handleFileData: handleFileData
}