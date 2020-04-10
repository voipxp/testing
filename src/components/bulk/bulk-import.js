import React, { useState, useEffect } from 'react'
import { useAlerts } from '@/store/alerts'
import {TaskService} from '@/api/task/task-service'
import { BulkParseService } from '@/components/bulk'
import { UtilityService } from '@/utils'
import isFunction from 'lodash/isFunction'

export const BulkImport = (
  {
  users=[],
  task,
  action,
  deleteLocalStorage,
  onError,
  setTaskId
  }
) => {
  const { alertSuccess, alertDanger } = useAlerts()
  const canSetTaskId = isFunction(setTaskId)
  let taskId = ''

  useEffect( () => {
    submit(users)
  }, [])

	const submit = (users) => {

      validate(users)
      .then(function() {
        return stringToBoolean(users)
      })
      .then(function(result) {
        return queue(result)
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
        if(canSetTaskId) setTaskId(taskId)
      })
  }

  const validate = (users) => {
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
    // return Promise.all(data.map(stringToBooleanValue)).then(function() {
    //   return data
    // })

    const temp = data.map(stringToBooleanValue)
    return Promise.resolve([...temp])

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
    const taskTemp = {
      type: task,
      data: UtilityService.unflatten(users)
    }
    // Alert.spinner.open()
    return TaskService.create(taskTemp)
      .then(function(data) {
        taskId = data.id
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
    const temp = {}
    Object.keys(user).map( key => {
        if( user[key] === "TRUE" || user[key] === "true" ) {
          temp[key] = true
        }
        else if( user[key] === "FALSE" || user[key] === "false" ) {
          temp[key] = false
        }
        else temp[key] = user[key]
    })

    return temp
  }

  return null
}
