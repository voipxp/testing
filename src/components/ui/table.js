/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'natural-orderby'
import { get, isFunction } from 'lodash'
import styled from 'styled-components'
import { Table, Input, Icon, Checkbox, Button, Field, Control } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSortUp,
  faSortDown,
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import paginate from 'jw-paginate'
import Pagination from './pagination'
import { useSetState } from '/hooks'
import cx from 'classnames'

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

const UiTable = ({
  columns,
  rowKey,
  rows = [],
  pageSize = 10,
  showSelect = false,
  hideSearch = false,
  onClick,
  onSelect
}) => {
  const [state, setState] = useSetState({
    currentPage: 0,
    totalPages: 0,
    filteredItems: [],
    pagedItems: [],
    selectedItems: {},
    search: '',
    sortBy: null,
    sortOrder: 'asc'
  })

  useEffect(() => {
    console.log('useEffect:sortBy')
    if (!state.sortBy) setState({ sortBy: rowKey })
  }, [rowKey, setState, state.sortBy])

  useEffect(() => {
    console.log('useEffect:filter')
    const sortKey = state.sortBy || rowKey
    if (!state.search) {
      return setState({
        filteredItems: orderBy(rows, v => v[sortKey], state.sortOrder)
      })
    }
    const regex = new RegExp(state.search, 'i')
    const newItems = rows.filter(row => {
      for (const key of Object.keys(row)) {
        if (regex.test(row[key])) return true
      }
      return false
    })
    setState({
      filteredItems: orderBy(newItems, v => v[sortKey], state.sortOrder)
    })
  }, [rowKey, rows, setState, state.search, state.sortBy, state.sortOrder])

  useEffect(() => {
    console.log('useEffect:paginate')
    const pager = paginate(
      state.filteredItems.length,
      state.currentPage,
      pageSize
    )
    setState({
      currentPage: pager.currentPage,
      totalPages: pager.totalPages,
      pagedItems: state.filteredItems.slice(
        pager.startIndex,
        pager.endIndex + 1
      )
    })
  }, [pageSize, setState, state.currentPage, state.filteredItems])

  const handleSort = column => {
    if (state.sortBy === column.key) {
      setState({ sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' })
    } else {
      setState({ sortBy: column.key })
    }
  }

  const onFirst = () => setState({ currentPage: 1 })
  const onPrevious = () => setState({ currentPage: state.currentPage - 1 })
  const onNext = () => setState({ currentPage: state.currentPage + 1 })
  const onLast = () => setState({ currentPage: state.totalPages })

  const canClick = isFunction(onClick)
  const canSelect = showSelect && isFunction(onSelect)
  const isAllSelected =
    Object.keys(state.selectedItems).length === state.filteredItems.length

  const handleClick = row => {
    if (canSelect) {
      selectRow(row)
    } else if (canClick) {
      onClick(row)
    }
  }

  const handleSelectAll = () => {
    if (isAllSelected) {
      setState({ selectedItems: {} })
    } else {
      const selectedItems = state.filteredItems.reduce((obj, item) => {
        obj[item[rowKey]] = true
        return obj
      }, {})
      setState({ selectedItems })
    }
  }

  const isSelected = row => {
    return !!state.selectedItems[row[rowKey]]
  }

  const selectRow = row => {
    const id = row[rowKey]
    const { selectedItems } = { ...state }
    if (selectedItems[id]) {
      delete selectedItems[id]
    } else {
      selectedItems[id] = true
    }
    setState({ selectedItems })
  }

  const sendSelected = () => {
    const selectedKeys = Object.keys(state.selectedItems)
    onSelect(rows.filter(row => selectedKeys.includes(row[rowKey])))
  }

  const headingIcon = column => {
    if (column.key !== state.sortBy) return null
    return (
      <Icon size="small" align="left">
        <FontAwesomeIcon
          icon={state.sortOrder === 'asc' ? faSortUp : faSortDown}
        />
      </Icon>
    )
  }

  return (
    <>
      {!hideSearch && (
        <Input
          type="search"
          placeholder="Filter Results"
          value={state.search}
          onChange={e => setState({ search: e.target.value })}
          style={{ marginBottom: '1rem' }}
        />
      )}
      {canSelect && (
        <Field kind="addons">
          <Control>
            <Button onClick={() => onSelect([])}>
              <Icon size="small">
                <FontAwesomeIcon icon={faTimes} />
              </Icon>
            </Button>
          </Control>
          <Control expanded>
            <Button static fullwidth>
              Items Selected:&nbsp;
              <strong>{Object.keys(state.selectedItems).length}</strong>
            </Button>
          </Control>
          <Control>
            <Button color="primary" onClick={() => sendSelected()}>
              <Icon size="small">
                <FontAwesomeIcon icon={faCheck} />
              </Icon>
            </Button>
          </Control>
        </Field>
      )}
      <WrappedTable>
        <Table
          fullwidth
          bordered
          striped
          narrow
          className={cx({ tableHover: canClick || canSelect })}
        >
          <Table.Head>
            <Table.Row>
              {canSelect && (
                <Table.Heading
                  textAlign="centered"
                  onClick={() => handleSelectAll()}
                >
                  <Checkbox checked={isAllSelected} onChange={() => {}} />
                </Table.Heading>
              )}
              {columns.map(column => (
                <Table.Heading
                  key={column.key}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <a
                    href="javascript:void(0)"
                    onClick={() => handleSort(column)}
                  >
                    {column.label}
                    {headingIcon(column)}
                  </a>
                </Table.Heading>
              ))}
            </Table.Row>
          </Table.Head>
          {state.pagedItems.length === 0 ? (
            <Table.Foot>
              <Table.Row>
                <Table.Cell colSpan="100">No Data Found</Table.Cell>
              </Table.Row>
            </Table.Foot>
          ) : (
            <Table.Body>
              {state.pagedItems.map(row => (
                <Table.Row key={row[rowKey]} onClick={() => handleClick(row)}>
                  {canSelect && (
                    <Table.Cell textAlign="centered">
                      <Checkbox checked={isSelected(row)} onChange={() => {}} />
                    </Table.Cell>
                  )}
                  {columns.map(column => (
                    <Table.Cell
                      key={column.key}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {isFunction(column.render)
                        ? column.render(row)
                        : get(row, column.key)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>
      </WrappedTable>
      <Pagination
        align="right"
        pages={state.totalPages}
        page={state.currentPage}
        onFirst={onFirst}
        onNext={onNext}
        onPrevious={onPrevious}
        onLast={onLast}
      />
    </>
  )
}

UiTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func
    })
  ).isRequired,
  rows: PropTypes.array.isRequired,
  rowKey: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  hideSearch: PropTypes.bool,
  showSelect: PropTypes.bool,
  onClick: PropTypes.func,
  onSelect: PropTypes.func
}
export default UiTable
