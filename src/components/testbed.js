import React, { useState } from 'react'
import { Button } from 'rbx'
import { Table } from '/components/ui'

const users = [
  {
    userId: 'ddoris@parkbenchsolutions.com',
    firstName: 'Dusty',
    lastName: 'Doris'
  },
  {
    userId: 'mtribbe@parkbenchsolutions.com',
    firstName: 'Marc',
    lastName: 'Tribbe'
  },
  {
    userId: 'mreverman@parkbenchsolutions.com',
    firstName: 'Mark',
    lastName: 'Reverman'
  },
  { userId: 'jlee@parkbenchsolutions.com', firstName: 'James', lastName: 'Lee' }
]

const columns = [
  {
    key: 'userId',
    label: 'User Id'
  },
  {
    key: 'lastName',
    label: 'Last Name'
  },
  {
    key: 'firstName',
    label: 'First Name'
  }
]

const TestBed = () => {
  const [showSelect, setShowSelect] = useState(false)

  const onClick = row => {
    console.log('clicked', row)
  }

  const onSelect = selection => {
    console.log('selected', selection)
    setShowSelect(false)
  }

  const toggleSelect = () => setShowSelect(v => !v)

  return (
    <>
      <Button onClick={toggleSelect} style={{ marginBottom: '1rem' }}>
        {showSelect ? 'Hide' : 'Show'} Select
      </Button>
      <Table
        columns={columns}
        rowKey="userId"
        rows={users}
        onClick={onClick}
        onSelect={onSelect}
        showSelect={showSelect}
        pageSize={10}
      />
    </>
  )
}

export default TestBed
