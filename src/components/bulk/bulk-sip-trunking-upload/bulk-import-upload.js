import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import isFunction from 'lodash/isFunction'
import PropTypes from 'prop-types'
import { BulkParseService, BulkImport, BulkUploadCsv } from '@/components/bulk'
import { StorageService } from '@/utils'
import { Button } from 'rbx'
import { UiLoading, UiCardModal } from '@/components/ui'
import { CSVLink } from "react-csv"
import { useAlerts } from '@/store/alerts'
import RecentTask from '@/components/bulk/recent-tasks/recent-task'

import {
  UiDataTableEditable,
  UiCard
} from '@/components/ui'

  export const BulkImportUpload = ({
    localStorageKey='BulkImportService',
    setDisableNextButton,
    beforComplete,
    onLoad,
    onComplete,
    initialData,
    addUsers,
    expectedTaskType
  }) => {
    const [users, setUsers] = useState([])
    const [keys, setKeys] = useState([])
    const [task, setTask] = useState('')
    const [taskId, setTaskId] = useState('')
    const [loading, setLoading]= useState(true)
    const [action, setAction] = useState({})
    const [importTask, setImportTask] = useState(false)
    const [isTaskExist, setIsTaskExist] = useState(false)
    const [deleteLocalStorage, setDeleteLocalStorage] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [loadingTable, setLoadingTable] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)

    const canBeforComplete = isFunction(beforComplete)
    const canOnLoad = isFunction(onLoad)
    const canOnComplete = isFunction(onComplete)
    const canSetDisableNextButton = isFunction(setDisableNextButton)
    const { alertDanger } = useAlerts()

    const finalSteps = () => {
      setIsProcessing(false)
      if (canSetDisableNextButton) setDisableNextButton(false)
      setIsTaskExist(false)
      setDeleteLocalStorage(false)
    }

    const onError = () => {
      setIsProcessing(false)
      if (canSetDisableNextButton) setDisableNextButton(true)
      setImportTask(false)
    }

    useEffect( () => {
      const deleteLocalStorageData = async () => {
        if(deleteLocalStorage) {
          StorageService.clearStorage(localStorageKey).then(function() {
            finalSteps()
            if(canOnComplete) onComplete(users)
          })
        }
      }

      deleteLocalStorageData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorageKey, deleteLocalStorage])

    useEffect( () => {
      if(canOnLoad) onLoad(users, (data) => setUsers(data))
    }, [users, setUsers, onLoad, canOnLoad])

    useEffect( () => {
      if(taskId) setShowErrorModal(true)
    }, [taskId])


    useEffect( () => {
      setLoading(true)
      if (canSetDisableNextButton) setDisableNextButton(true)
      setImportTask(false)
      onInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorageKey])

    const handleDataChange = (data) => {
        setUsers(data)
    }

    const submitTask = () => {
      if(canBeforComplete) {
        beforComplete(users)
        .then(() => {
          setIsProcessing(true)
          setImportTask(true)
        })
      }

      setIsProcessing(true)
      setImportTask(true)
    }

    const onInit = () => {
      if (canSetDisableNextButton) setDisableNextButton(true)
      loadData()
      .then((data) => {
        return clean(data)
      })
      .then( (data) => {
        if(addUsers) return addUsersOnLoad(data)
        else return data
      })
      .then((data) => {
        return validate(data)
      })
      .finally( (data) => {
        setIsTaskExist(true)
        setLoading(false)
        // if(canComplete) onImportComplete(data[0])
      })
      .catch( (error) => {
        errorHandler(error)
      })
    }

    const errorHandler = (error) => {
      if(_.includes(error, 'Unresolved Tag')) {
        alertDanger(error)
      }
      else if(error === 'Error in loading data') {
        setDeleteLocalStorage(true)
      }
      else {
        alertDanger(error)
        setDeleteLocalStorage(true)
      }
    }

    const addUsersOnLoad = (data) => {
      const temp = {...data[0]}

      return new Promise(function(resolve, reject) {
        initialData.users.forEach( (userId, index) => {
          temp['userId'] = userId
          data[index] = {...temp}
        })

        return resolve(data)
      })

    }

    const loadData = () => {
      return new Promise(function(resolve, reject) {
        try {
          StorageService.getStorage(localStorageKey)
          .then((data) => {
            if(!data) return reject('Error in loading data')
            if(data.length > 0 && data[0]['task'] !== expectedTaskType) return reject('Invalid Task Type')

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
        return BulkParseService.validateBulk(users, action.required || [])
      })
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
          setTaskId={ (id) => setTaskId(id) }
        /> : null
      }

      {
        <UiCard
          title={ isTaskExist ? task : 'Task'}
          buttons={
            <>
              <BulkUploadCsv
                localStorageKey={localStorageKey}
                uploading={ (boolValue) => setLoadingTable(boolValue)}
                finalStep={onInit}
              />
              {
                isTaskExist
                ?
                <>
                  <CSVLink data={users} headers={keys} filename={task+".csv"}>
                    <Button
                      className="button ng-isolate-scope is-link"
                      color="buttonColor"
                      style={{marginRight:'8px'}}
                    >
                      <span className="icon">
                        <i className="fas fa-download" ng-class="iconClass"></i>
                      </span>
                      <span color="buttonText" className="ng-binding">Download Sheet</span>
                    </Button>
                  </CSVLink>

                  <Button
                    className="button ng-isolate-scope is-success has-text-right ng-scope"
                    color="buttonColor"
                    onClick={submitTask}
                    state={isProcessing ? 'loading' : ''}
                  >
                    <span className="icon">
                      <i className="fas fa-check" ng-class="iconClass"></i>
                    </span>
                    <span color="buttonText" className="ng-binding">Submit Task</span>
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
            isTaskExist
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

        {   /* Task Error Modal */
          taskId
          ?
            <div>
            <UiCardModal
              title="Task Details"
              isOpen={showErrorModal}
              onCancel={() => setShowErrorModal(false)}
            >
            <RecentTask
              id={taskId}
            />
            </UiCardModal>
            </div>
          :
          null
        }

        </UiCard>
      }
    </>
  }

  BulkImportUpload.propTypes = {
    localStorageKey: PropTypes.string,
    setDisableNextButton: PropTypes.func,
    beforComplete: PropTypes.func,
    onLoad: PropTypes.func,
    onComplete: PropTypes.func,
    initialData: PropTypes.object,
    addUsers: PropTypes.bool,
    expectedTaskType: PropTypes.string,
  }
