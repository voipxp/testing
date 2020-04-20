import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiSelectableTable } from '@/components/ui'

export const BulkSelectNumbers = ({
  phoneNumbers=[],
  setSelectedNumbers
}) => {
  const [available, setAvailable] = useState([...phoneNumbers])
  const [selected, setSelected] = useState([])
  const numbers = []

  useEffect(() => {
    const formNumbers = (numRange) => {
      let code = ''
      let [min, max] = numRange.split(' - ')
      if(min.includes('-')) {
        const minArr = min.split('-')
        code = minArr[0]
        min = minArr[1]
      }
      if(max.includes('-')) {
        const maxArr = max.split('-')
        max = maxArr[1]
      }
      const minNumber = parseInt(min)
      const maxNumber = parseInt(max)
      const diff = maxNumber - minNumber

      for(let i=0; i <= diff; i++) {
        let newNumber = minNumber + i
        if(code) newNumber = code + '-' + newNumber
        numbers.push({number: newNumber})
      }
    }

    phoneNumbers.map( number => {
      if( number.includes(' - ') ) {
        formNumbers(number)
      }
      else numbers.push({number: number})
      setAvailable(numbers)
      return number
    })

  }, [])

  useEffect( () => {
    const numbers = selected.map(el => el.number)
    setSelectedNumbers(numbers)
  }, [available, selected])

  return (
    <>
      <UiSelectableTable
        title="Numbers"
        availableUser={available}
        setAvailableUser={(availableItem) => setAvailable(availableItem)}
        selectedUser={selected}
        setSelectedUser={(selectedItem) => setSelected(selectedItem)}
        rowKey='number'
      />
    </>
	)
}

BulkSelectNumbers.propTypes = {
  phoneNumbers: PropTypes.array,
  setSelectedNumbers: PropTypes.func
}
