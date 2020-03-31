import React, { useEffect } from 'react'
import { useAlerts } from '@/store/alerts'
import isFunction from 'lodash/isFunction'
import {TaskService} from '@/api/task/task-service'
import { BulkParseService } from '@/components/bulk'
import { StorageService, UtilityService } from '@/utils'
import { UiLoading } from '@/components/ui'

export const BulkImport = (
  {
  users=[],
  task,
  action,
  deleteLocalStorage,
  onError
  }
) => {
  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
  // let interval

  useEffect( () => {
    //setLoading(true)
    // setLocalStorageKey(props.localStorageKey)
    submit(users)
  }, [])

	const submit = (users) => {

      validate(users)
      .then(function() {
        return stringToBoolean(users)
      })
      .then(function() {
        return queue(users)
      })
      .then( (data) => {
        return startReload(data)
      })
      .then(function() {
        alertSuccess(task + " is successful")
        deleteLocalStorage(true)
      })
      .catch(function(error) {
        onError()
        alertDanger(error)
      })
  }

  const validate = (users) => {
    // return new Promise(function(resolve) {
    //   resolve(users)
    // })
    return BulkParseService.bulkParse(users)
      .then(function(users) {
        return BulkParseService.validateBulk(users, action.required || [])
      })
      .catch(function(error) {
        console.log(error)
        return Promise.reject('Data Error: ' + error)
      })
  }

  const stringToBoolean = (data) => {
    // return new Promise(function(resolve) {
    //   return  resolve(data)
    // })
    return Promise.all(data.map(stringToBooleanValue)).then(function() {
      return data
    })
  }

  function errors(task) {
    const users = (task && task.data) || []
    const status = { failed: 0, errors: 0 }

    return new Promise(function(resolve, reject) {
      users.forEach(function(user) {
        if (user.status === 'failed') {
          status.failed += 1
        } else if (user.status === 'completed' && user.error) {
          status.errors += 1
        }
      })
      const messages = []
      if (status.failed > 0) {
        messages.push(status.failed + ' Failed')
      }
      if (status.errors > 0) {
        messages.push(status.errors + ' Errors')
      }
      return resolve(messages.join(', ') || task.error)
    })
  }

  const startReload = (task) => {
    return new Promise(function(resolve, reject) {
      const interval = setInterval( () => {
          TaskService.show(task.id).then( (data) => {
            if(data.status === 'completed') {
              clearInterval(interval)
              if(data.error) return reject(data.error)
              else {
                errors(data).then( (error) => {
                  if(error) {
                    return reject('There is ' + error)
                  }
                  else return resolve(data.type + " is successfully created.")
                })
              }
            } else if(data.status === 'failed') {
              clearInterval(interval)
              return reject("Error in " + data.type)
            }
          })
      }
      , 2000);
    })
  }

  const queue = (users) => {
	  //return 	Route.open('bulk')
    // if(!isPermittedTask(ctrl.task)) return false  /* Check admin has policy for user create/delete */
    const taskTemp = {
      type: task,
      data: UtilityService.unflatten(users)
    }
    // Alert.spinner.open()
    return TaskService.create(taskTemp)
      .then(function(data) {
        alertSuccess('Import Queued: ' + data.id)
        // Route.open('bulk')
        return data
      })
      .finally(function(data) {
        return data
        // Alert.spinner.close()
      })
      .catch(function(error) {
        alertDanger(error.data)
      })
  }

  const stringToBooleanValue = (user) => {
    const newUser = {...user}
    Object.keys(newUser).forEach( key => {
        if( newUser[key] === "TRUE" || newUser[key] === "true" ) {
          newUser[key] = true
        }
        if( newUser[key] === "FALSE" || newUser[key] === "false" ) {
          newUser[key] = false
        }
    })

    return newUser
  }

  return null
}
