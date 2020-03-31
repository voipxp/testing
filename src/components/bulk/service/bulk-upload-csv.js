import React, { useState } from 'react'
import { UiLoadingCard } from '@/components/ui'
import CSVReader from 'react-csv-reader'
import _ from 'lodash'
import { BulkTaskService } from '@/components/bulk'
import { useAlerts } from '@/store/alerts'
import { StorageService,UtilityService } from '@/utils'
import { Button } from 'rbx'
import PropTypes from 'prop-types'

export const BulkUploadCsv = ({
  localStorageKey='BulkImportService',
  uploading,
  finalStep,
}) => {
  const { alertDanger } = useAlerts()
  // const [loading, setLoading] = useState(false)
  const required = ['task']

  const handleFileData = (data, fileName) => {

      transform(data).then(function(data) {
        uploading(true)
        return addIndex(data)
      })
      .then(function(data) {
        return clean(data)
      })
      .then(function(data) {
        return validate(data)
      })
      .then(function(data) {
        return StorageService.setStorage(localStorageKey, data)
      })
      .finally( () => {
        uploading(false)
        document.querySelector("#uploadCSV").value = '';
        finalStep()
      })
      .catch( (error) => {
        uploading(false)
        alertDanger( error || 'Data Import Error' )
      })
  }

  const parserOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    //transformHeader: header => header.replace(/\W/g, "_")
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
            throw new Error(`Missing required key: ${key}`)
          }
        })
      });
      resolve(data)
    })
}

    return (
      <>
        <CSVReader
          onFileLoaded={handleFileData}
          parserOptions={parserOptions}
          inputStyle={{display:'none'}}
          inputId="uploadCSV"
        />
        <Button
          className="button ng-isolate-scope  has-text-right ng-scope" 
          color="buttonColor file-cta"
        >
          <span className="icon">
            <i className="fas fa-upload" ng-class="iconClass"></i>
          </span>
          <span color="buttonText" className="ng-binding">Upload Sheet</span>
        </Button>
      </>
    )
}

BulkUploadCsv.propTypes = {
  localStorageKey: PropTypes.string,
  uploading: PropTypes.func,
  finalStep: PropTypes.func
}
