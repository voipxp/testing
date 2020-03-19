import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { BulkParseService, BulkImport } from '@/components/bulk'
import { useAlerts } from '@/store/alerts'
import { StorageService } from '@/utils'
import { Button } from 'rbx'
import { UiLoading } from '@/components/ui'
import { CSVLink } from "react-csv"
import { BulkUploadCsv } from "./bulk-upload-csv"
import {
  UiDataTableEditable,
  UiCard
} from '@/components/ui'

  export const BulkImportStorage = ({
    localStorageKey='BulkImportService',
    setDisableNextButton
  }) => {
    const [users, setUsers] = useState([])
    const [keys, setKeys] = useState([])
    const [task, setTask] = useState('')
    const [loading, setLoading]= useState(true)
    const [action, setAction] = useState({})
    const [importTask, setImportTask] = useState(false)
    const [showImportTaskBtn, setShowImportTaskBtn] = useState(false)
    const [deleteLocalStorage, setDeleteLocalStorage] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [loadingTable, setLoadingTable] = useState(false)

    const finalSteps = () => {
      setIsProcessing(false)
      setDisableNextButton(false)
      setShowImportTaskBtn(false)
      setDeleteLocalStorage(false)
    }

    const onError = () => {
      setIsProcessing(false)
      setDisableNextButton(true)
      setImportTask(false)
    }

    useEffect( () => {
      const deleteLocalStorageData = async () => {
        if(deleteLocalStorage) {
          StorageService.clearStorage(localStorageKey).then(function() {
            finalSteps()
          })
        }
      }

      deleteLocalStorageData()
    }, [localStorageKey, deleteLocalStorage])

    useEffect( () => {
      setLoading(true)
      setDisableNextButton(true)
      setImportTask(false)
      onInit()
    }, [localStorageKey])

    const handleDataChange = (data) => {
        setUsers(data)
    }

    const submitTask = () => {
      // setLoading(true)
      setIsProcessing(true)
      setImportTask(true)
    }

    const onInit = () => {
      loadData()
      .then((data) => {
        return clean(data)
      })
      .then((data) => {
        return validate(data)
      })
      .finally( (data) => {
        setShowImportTaskBtn(true)
        setLoading(false)
      })
      .catch( (error) => {
        finalSteps()
      })
    }

    const loadData = () => {
      return new Promise(function(resolve, reject) {
        try {
          StorageService.getStorage(localStorageKey)
          .then((data) => {
            if(!data) return reject('Error in loading data')

            setUsers(data)
            setKeys(loadKeys(data))
            setTask(data[0]['task'])
            resolve(data)
            return data
          })
          // .then(function(data) {
          //   debugger
          //   console.log('there is error in action loading.')
          //   console.log(data)
          //   const task = data ? data[0]['task'] : null
          //   return BulkTaskService.getTaskDetails(task)
          // })
          .then(function(action) {
            setAction({...action})
            if (!action) return reject('Task missing or invalid')
          })
        } catch(error) {
            reject('Error in loading data')
        }
      })
    }

    const clean = (data) => {
      return Promise.all(
        data.map( (el) => {
          if (el.password === '__CHANGEME__') {
            el.password = null
          }
            return el;
        })
      ).then(() => {
        return data
      })
    }

    const loadKeys = (data) => {
      const hidden = ['index']
      const keys = _.pullAll(allKeys(data), hidden)
      keys.sort(function(a, b) {
        if (a === 'userId') return -1
        if (b === 'userId') return 1
        if (a === 'task') return -1
        if (b === 'task') return 1
        return a < b ? -1 : 1
      })
      return keys
    }

    const allKeys = (objects) => {
      var keys = {}
      objects.forEach(function(object) {
        _.forOwn(object, function(value, key) {
          if (!/\$/.exec(key) && !/index/.exec(key)) {
            keys[key] = key
          }
        })
      })
      keys = _.keys(keys).map( (el, i) => {
        return {key: el, label: el}
      })

      return keys
    }

    function validate(users) {
      return BulkParseService.bulkParse(users)
      .then(function() {
      BulkParseService.validateBulk(users, action.required || [])
    })

      // return BulkParseService.validateBulk(users, action.required || [])
      //   .catch(function(error) {
      //     return new Promise.reject('Data Error: ' + error)
      //   })
    }

    return loading ? <UiLoading /> :
    <>
      {
        ( importTask ) ?
        <BulkImport
          users={users}
          task={task}
          action={action}
          deleteLocalStorage={ (boolValue) => setDeleteLocalStorage(boolValue) }
          onError={onError}
        /> : ''
      }

      {
        <UiCard
          title={task || 'Upload Task'}
          buttons={
            <>
              <BulkUploadCsv
                localStorageKey={localStorageKey}
                uploading={ (boolValue) => setLoadingTable(boolValue)}
                finalStep={onInit}
              />
              {
                showImportTaskBtn
                ?
                <>
                  <CSVLink data={users} headers={keys} filename={task+".csv"}>
                  <Button color="success"
                    style={{marginRight:'8px'}}
                    size="small">Download Sheet</Button>
                  </CSVLink>
                  <Button
                    color="success"
                    size="small"
                    onClick={submitTask}
                    state={isProcessing ? 'loading' : ''}
                  >
                    Submit Task
                  </Button>
                </>
                :
                null
              }

            </>
          }
        >

        {
          (loadingTable)
          ?
          <UiLoading />
          :
          (
            showImportTaskBtn
            ?
            <UiDataTableEditable
              columns={keys}
              rows={users}
              rowKey="index"
              pageSize={20}
              handleDataChange={handleDataChange}
            />
            :
            <label>No Pending Task available !</label>
          )
        }
        </UiCard>
      }
    </>
  }

  BulkImportStorage.propTypes = {
    localStorageKey: PropTypes.string,
    setDisableNextButton: PropTypes.func
  }
