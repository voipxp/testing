/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import paginate from 'jw-paginate'
import cx from 'classnames'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import { orderBy } from 'natural-orderby'
import { Table, Input, Icon, Button, Field, Control } from 'rbx'
import { UiPagination } from './ui-pagination'
import { UiInputCheckbox } from './ui-input-checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSortUp,
  faSortDown,
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

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

/**
 * Renders a data table. You must pass in the **columns** prop which contains the data schema. The **rows** which are an array of objects to display in the table. The **rowKey** which is the unique identifier in each row.
 *
 * The table will automatically paginate the data (defaults to 10) and show a filter search bar. You can set **hideSearch** to true to disable the search bar.
 *
 * If **onClick** is a callback function, the table will be hoverable and the row clicked will be passed back to the callback.
 *
 * If **onSelect** is a callback function, then the table is selectable. You must set **showSelect** to true, to show the selection. The **onSelect** callback will be passed an array of selected rows. NOTE: Canceling the select returns an empty array.
 *
 * The columns schema defines the **key** in each column and an optional **label** to present in the table header. By default, the value of `row[column.key]` will be displayed. If a **render** prop is passed, the render prop will be executed passing in the **row** instead.
 */
export const UiDataTable = ({
  columns,
  rowKey,
  rows = [],
  pageSize = 10,
  showSelect = false,
  hideSearch = false,
  onClick,
  onSelect
}) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedItems, setSelectedItems] = React.useState({})
  const [search, setSearch] = React.useState('')
  const [sortBy, setSortBy] = React.useState(rowKey)
  const [sortOrder, setSortOrder] = React.useState('asc')

  const filteredItems = React.useMemo(() => {
    if (!search) return orderBy(rows, v => v[sortBy], sortOrder)
    const regex = new RegExp(search, 'i')
    const newItems = rows.filter(row => {
      for (const key of Object.keys(row)) {
        if (regex.test(row[key])) return true
      }
      return false
    })
    return orderBy(newItems, v => v[sortBy], sortOrder)
  }, [rows, search, sortBy, sortOrder])

  const pager = React.useMemo(() => {
    return paginate(filteredItems.length, currentPage, pageSize)
  }, [currentPage, filteredItems.length, pageSize])

  const pagedItems = React.useMemo(() => {
    return filteredItems.slice(pager.startIndex, pager.endIndex + 1)
  }, [filteredItems, pager])

  const handleSearch = e => setSearch(e.target.value)
  const handleSort = (e, column) => {
    e.preventDefault()
    sortBy === column.key
      ? setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      : setSortBy(column.key)
  }

  const onFirst = () => setCurrentPage(1)
  const onPrevious = () => setCurrentPage(page => page - 1)
  const onNext = () => setCurrentPage(page => page + 1)
  const onLast = () => setCurrentPage(pager.totalPages)

  const canClick = isFunction(onClick)
  const canSelect = showSelect && isFunction(onSelect)
  const allSelected = Object.keys(selectedItems).length === filteredItems.length

  const handleClick = row => {
    if (canSelect) {
      selectRow(row)
    } else if (canClick) {
      onClick(row)
    }
  }

  const handleSelectAll = () => {
    allSelected
      ? setSelectedItems({})
      : setSelectedItems(
          filteredItems.reduce((obj, item) => {
            obj[item[rowKey]] = true
            return obj
          }, {})
        )
  }

  const isSelected = row => !!selectedItems[row[rowKey]]

  const selectRow = row => {
    const id = row[rowKey]
    const newSelectedItems = { ...selectedItems }
    if (newSelectedItems[id]) {
      delete newSelectedItems[id]
    } else {
      newSelectedItems[id] = true
    }
    setSelectedItems(newSelectedItems)
  }

  const cancelSelection = () => {
    setSelectedItems([])
    onSelect([])
  }

  const sendSelected = () => {
    const selectedKeys = Object.keys(selectedItems)
    onSelect(rows.filter(row => selectedKeys.includes(row[rowKey])))
    setSelectedItems([])
  }

  const headingIcon = column => {
    if (column.key !== sortBy) return null
    return (
      <Icon size="small" align="left">
        <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
      </Icon>
    )
  }

  return (
    <>
      {!hideSearch && rows.length > 1 && (
        <Input
          type="search"
          placeholder="Filter Results"
          value={search}
          onChange={handleSearch}
          style={{ marginBottom: '1rem' }}
        />
      )}
      {canSelect && (
        <Field kind="addons">
          <Control>
            <Button onClick={cancelSelection}>
              <Icon size="small">
                <FontAwesomeIcon icon={faTimes} />
              </Icon>
            </Button>
          </Control>
          <Control expanded>
            <Button static fullwidth>
              Items Selected:&nbsp;
              <strong>{Object.keys(selectedItems).length}</strong>
            </Button>
          </Control>
          <Control>
            <Button color="primary" onClick={sendSelected}>
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
                <Table.Heading textAlign="centered" onClick={handleSelectAll}>
                  <UiInputCheckbox checked={allSelected} />
                </Table.Heading>
              )}
              {columns.map(column => (
                <Table.Heading
                  key={column.key}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <a href="" onClick={e => handleSort(e, column)}>
                    {column.label || column.key}
                    {headingIcon(column)}
                  </a>
                </Table.Heading>
              ))}
            </Table.Row>
          </Table.Head>
          {pagedItems.length === 0 ? (
            <Table.Foot>
              <Table.Row>
                <Table.Cell colSpan="100">No Data Found</Table.Cell>
              </Table.Row>
            </Table.Foot>
          ) : (
            <Table.Body>
              {pagedItems.map(row => (
                <Table.Row key={row[rowKey]} onClick={() => handleClick(row)}>
                  {canSelect && (
                    <Table.Cell textAlign="centered">
                      <UiInputCheckbox checked={isSelected(row)} />
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
      <UiPagination
        align="right"
        pages={pager.totalPages}
        page={currentPage}
        onFirst={onFirst}
        onNext={onNext}
        onPrevious={onPrevious}
        onLast={onLast}
      />
    </>
  )
}

UiDataTable.propTypes = {
  /** Schema of the table columns */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
      render: PropTypes.func
    })
  ).isRequired,
  /** Rows of data to render in table */
  rows: PropTypes.array.isRequired,
  /** Unique ID for each row */
  rowKey: PropTypes.string.isRequired,
  /** Customize pagination size */
  pageSize: PropTypes.number,
  /** Disable the Search Bar */
  hideSearch: PropTypes.bool,
  /** Allow Selecting rows */
  showSelect: PropTypes.bool,
  /** Callback when a Row is clicked */
  onClick: PropTypes.func,
  /** Callback when Rows are selected */
  onSelect: PropTypes.func
}
