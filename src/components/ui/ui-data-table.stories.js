import React from 'react'
import { UiDataTable, UiButton } from '.'

export default {
  title: 'Components|UiDataTable',
  component: UiDataTable
}

export const Example = () => {
  const [showSelect, setShowSelect] = React.useState(false)
  const toggle = () => setShowSelect(!showSelect)
  return (
    <>
      <UiButton
        color="link"
        icon="bulk"
        style={{ marginBottom: '1rem', float: 'right' }}
        onClick={toggle}
      >
        Select
      </UiButton>
      <UiDataTable
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'last', label: 'Last Name' },
          { key: 'first', label: 'First Name' },
          {
            key: 'full',
            label: 'Full Name',
            render: row => `${row.first} ${row.last}`
          }
        ]}
        rows={[
          { id: '1', first: 'Monkey', last: 'Man' },
          { id: '2', first: 'Cat', last: 'Girl' },
          { id: '3', first: 'Dog', last: 'Hammer' }
        ]}
        rowKey="id"
        pageSize={2}
        showSelect={showSelect}
        onSelect={rows => console.log('rows', rows) || toggle()}
        onClick={row => console.log('clicked', row)}
      />
    </>
  )
}
