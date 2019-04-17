/*
  Notes:
    selectable
    test render prop
*/
/* eslint-disable jsx-a11y/anchor-is-valid,no-script-url */
import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'natural-orderby'
import { get, isFunction } from 'lodash'
import styled from 'styled-components'
import { Table, Input, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
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
  hideSearch = false,
  onClick
}) => {
  const [state, setState] = useSetState({
    currentPage: 0,
    totalPages: 0,
    filteredItems: [],
    pagedItems: [],
    search: '',
    sortBy: null,
    sortOrder: 'asc'
  })

  const handleSort = useCallback(
    column => {
      if (state.sortBy === column.key) {
        setState({ sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' })
      } else {
        setState({ sortBy: column.key })
      }
    },
    [setState, state.sortBy, state.sortOrder]
  )

  const filterItems = useCallback(() => {
    const sortKey = state.sortBy || rowKey
    const sorted = orderBy(rows, v => v[sortKey], state.sortOrder)
    if (hideSearch || !state.search) {
      return setState({ filteredItems: sorted })
    }
    const regex = new RegExp(state.search, 'i')
    const newItems = sorted.filter(row => {
      for (const key of Object.keys(row)) {
        if (regex.test(row[key])) return true
      }
      return false
    })
    setState({ filteredItems: newItems })
  }, [
    hideSearch,
    rowKey,
    rows,
    setState,
    state.search,
    state.sortBy,
    state.sortOrder
  ])

  const paginateItems = useCallback(
    currentPage => {
      const pager = paginate(state.filteredItems.length, currentPage, pageSize)
      setState({
        currentPage: pager.currentPage,
        totalPages: pager.totalPages,
        pagedItems: state.filteredItems.slice(
          pager.startIndex,
          pager.endIndex + 1
        )
      })
    },
    [pageSize, setState, state.filteredItems]
  )

  useEffect(() => {
    setState({ sortBy: rowKey })
  }, [rowKey, setState])

  useEffect(() => {
    filterItems()
  }, [filterItems])

  useEffect(() => {
    paginateItems()
  }, [paginateItems])

  const onFirst = () => paginateItems(1)
  const onPrevious = () => paginateItems(state.currentPage - 1)
  const onNext = () => paginateItems(state.currentPage + 1)
  const onLast = () => paginateItems(state.totalPages)
  const canClick = isFunction(onClick)
  const handleClick = row => canClick && onClick(row)

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
      <WrappedTable>
        <Table
          fullwidth
          bordered
          striped
          narrow
          className={cx({ tableHover: canClick })}
        >
          <Table.Head>
            <Table.Row>
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
  onClick: PropTypes.func
}
export default UiTable
