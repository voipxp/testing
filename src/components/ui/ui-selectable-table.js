/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'
import _ from 'lodash'
import { orderBy } from 'natural-orderby'
import { Table, Input } from 'rbx'
import { UiCard} from '@/components/ui'

const StyledDiv = styled.div`
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: .75rem;
`
const WrappedTable = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;

  table.tableHover tbody > tr:hover {
    cursor: pointer;
    background-color: hsl(217, 71%, 53%) !important;
    color: #fff;
  }
`


export const UiSelectableTable = ({
  title,
  availableUser=[],
  selectedUser=[],
  rowKey,
  hideSearch = false,
  setAvailableUser,
  setSelectedUser,
  showMoveBtn
}) => {

  const [searchAvailable, setSearchAvailable] = React.useState('')
  //const [showUpDownArrow, setShowUpDownArrow] = React.useState(false)
  //setShowUpDownArrow(showMove)
  const [searchSelected, setSearchSelected] = React.useState('')

  const sortBy = React.useState(rowKey)
  const sortOrder = React.useState('asc')

  const availableItems = React.useMemo(() => {
    if (!searchAvailable) return orderBy(availableUser, v => v[sortBy], sortOrder)
    const regex = new RegExp(searchAvailable, 'i')
    const newItems = availableUser.filter(row => {
      for (const key of Object.keys(row)) {
        if (regex.test(row[key])) return true
      }
      return false
    })
    return orderBy(newItems, v => v[sortBy], sortOrder)
  }, [availableUser, searchAvailable, sortBy, sortOrder])


  const selectedItems = React.useMemo(() => {
    if (!searchSelected) return orderBy(selectedUser, v => v[sortBy], sortOrder)
    const regex = new RegExp(searchSelected, 'i')
    const newItems = selectedUser.filter(row => {
      for (const key of Object.keys(row)) {
        if (regex.test(row[key])) return true
      }
      return false
    })
    return orderBy(newItems, v => v[sortBy], sortOrder)
  }, [selectedUser, searchSelected, sortBy, sortOrder])


  const handleSearchAvailable = e => setSearchAvailable(e.target.value)
  const handleSearchSelected = e => setSearchSelected(e.target.value)

  const setStateData = (availableItems, selectedItems) => {
    setAvailableUser(availableItems)
    setSelectedUser(selectedItems)
  }

  function addAll() {
    const availableItems = [...availableUser]
    const selectedItems = [...selectedUser]

    for (var i = 0; i < availableItems.length; i++) {
      selectedItems.push(availableItems[i])
      availableItems.splice(i, 1)
      i--
    }
    setStateData(availableItems, selectedItems)
  }

  function up(event, user) {
    const selectedItems = [...selectedUser]
    event.stopPropagation()
    
    var index = _.indexOf(selectedItems, user)
    if (index === selectedUser.length - 1) return
    move(index, index + 1)
  }
 
  function down(event, user) { 
    event.stopPropagation()
    const selectedItems = [...selectedUser]
    var index = _.indexOf(selectedItems, user)
    if (index === 0) return
    move(index, index - 1)
  }

  function move(from, to) {
    const selectedItems = [...selectedUser]
    selectedItems.splice(to, 0, selectedItems.splice(from, 1)[0])
    setSelectedUser(selectedItems)
  }

  function removeAll() {
    const availableItems = [...availableUser]
    const selectedItems = [...selectedUser]

    for (var i = 0; i < selectedItems.length; i++) {
      availableItems.push(selectedItems[i])
      selectedItems.splice(i, 1)
      i--
    }

    setStateData(availableItems, selectedItems)
  }

  const add = (row) => {
    const availableItems = [...availableUser]
    const selectedItems = [...selectedUser]
    _.remove(availableItems, row)
    selectedItems.push(row)

    setStateData(availableItems, selectedItems)
  }

  const remove = (row) => {
    const availableItems = [...availableUser]
    const selectedItems = [...selectedUser]

    _.remove(selectedItems, row)
    availableItems.push(row)

    setStateData(availableItems, selectedItems)
  }

  return (
    <UiCard title={title}>
        <div style={{display: 'flex'}}>
          <StyledDiv>
          <h4 style={{marginBottom: '1rem'}}>
            Available ({availableItems.length})
            <small className="is-pulled-right"><a onClick={addAll}>Select All</a></small>
          </h4>
          {!hideSearch && availableUser.length > 1 && (
          <Input
            type="search"
            placeholder="Filter Results"
            value={searchAvailable}
            onChange={handleSearchAvailable}
            style={{ marginBottom: '1rem' }}
          />
        )}
        <WrappedTable>
          <Table
            fullwidth
            bordered
            striped
            narrow
            className={cx({ tableHover: true })}
          >
            {availableItems.length === 0 ? (
              <Table.Foot>
                <Table.Row>
                  <Table.Cell colSpan="100">No {title} Available</Table.Cell>
                </Table.Row>
              </Table.Foot>
            ) : (
                <Table.Body>
                  {availableItems.map(row => (
                    <Table.Row key={row[rowKey]} onClick={() => add(row)}>
                <Table.Cell>
                  { row[rowKey] }
                </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              )}
              </Table>
          </WrappedTable>
        </StyledDiv>

        <StyledDiv>
          <h4 style={{marginBottom: '1rem'}}>
            Selected ({selectedItems.length})
            <small className="is-pulled-right"><a onClick={removeAll}>Select All</a></small>
          </h4>
            {!hideSearch && selectedUser.length > 1 && (
              <Input
                type="search"
                placeholder="Filter Results"
                value={searchSelected}
                onChange={handleSearchSelected}
                style={{ marginBottom: '1rem' }}
              />
            )}
            <WrappedTable>
              <Table
                fullwidth
                bordered
                striped
                narrow
                className={cx({ tableHover: true })}
              >
                {selectedItems.length === 0 ? (
                  <Table.Foot>
                    <Table.Row>
                      <Table.Cell colSpan="100">
                      No {title} Selected</Table.Cell>
                    </Table.Row>
                  </Table.Foot>
                ) : (
                  <Table.Body>
                    {selectedItems.map(row => (
                    <Table.Row key={row[rowKey]} >
                      <Table.Cell onClick={() => remove(row)} >
                      { showMoveBtn ? (
                      <div
                        className="field has-addons is-pulled-right"
                      >
                      <p className="control">
                        <a
                          className="button is-small"
                           
                          onClick={(event) => up(event ,row )}
                        >
                          <span className="icon">
                            <i className ="fas fa-chevron-down"></i>
                          </span>
                        </a>
                            
                      </p>
                      <p className="control">
                        <a
                          className="button is-small"
                          // eslint-disable-next-line no-undef
                          onClick={( event ) => down( event, row )}
                        >
                          <span className="icon">
                            <i className ="fas fa-chevron-up"></i>
                          </span>
                        </a>
                      </p>
                      
                    </div> 
                    ) : ''} 
                    {row[rowKey]} 
                      </Table.Cell>
                    </Table.Row>
                    ))}
                  </Table.Body>
                )}
              </Table>
            </WrappedTable>
          </StyledDiv>
        </div>
     </UiCard>
  )

}

UiSelectableTable.propTypes = {
  title: PropTypes.string.isRequired,
  availableUser: PropTypes.array,
  selectedUser: PropTypes.array,
  rowKey: PropTypes.string,
  hideSearch: PropTypes.bool,
  setAvailableUser: PropTypes.func,
  setSelectedUser: PropTypes.func,
  showMoveBtn:PropTypes.bool
}
