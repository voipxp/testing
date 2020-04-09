import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiListItem, UiLoading, UiDataTable } from '@/components/ui'
import { Button, Select, Input } from 'rbx'
import groupDomainAPI from '@/api/groups/domains'
import { useAlerts } from '@/store/alerts'

export const BulkAddNumbers = ({
  setData,
  numbersArray
}) => {
  const [numbers, setNumbers] = useState('')
  const [dns, setDns] = useState([])

  function handleInput(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    setNumbers(value)
  }

  useEffect(() => {
    bulkAssignNumbers(numbers)
  }, [numbers])

  useEffect(() => {
    setData(dns)
  }, [setData, dns])

  const bulkAssignNumbers = (bulkNumbers) => {
      if(bulkNumbers === '') return false

      const numbers = bulkNumbers.split('\n')
      numbersArray(numbers)
      const dns = numbers.map((number) => {
        if( number.includes(' - ') ) {
          const [min, max] = number.split(' - ')
            return {
              min: min,
              max: max
            }
        } else {
            return {
              min: number
            }
        }
      })

      setDns(dns)
  }

  return (
    <>

      <b>Please enter number or ranges on separate line</b>
        <br />
        2345678900<br />
        2345678905 - 2345678909<br /><br />
        <b
          >Use E164 format to specify country code different from default.<br
        /></b>
        +1-2345678900<br />
        +1-2345678905 - +1-2345678909<br /><br />

        <textarea
          className="textarea"
          rows="10"
          name='numbers'
          onChange={handleInput}
        />

    </>
	)
}

BulkAddNumbers.propTypes = {
  setData: PropTypes.func,
  numbersArray: PropTypes.func
}
