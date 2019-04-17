/*
  Notes:
    hoverable based on onClick?
    selectable
    sortable
*/
import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { get, orderBy, isFunction } from 'lodash'
import styled from 'styled-components'
import { Table, Input } from 'rbx'
import paginate from 'jw-paginate'
import Pagination from './pagination'
import { useSetState } from '/hooks'

const WrappedTable = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
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
    search: ''
  })

  const filterItems = useCallback(() => {
    const ordered = orderBy(rows, rowKey)
    if (hideSearch || !state.search) {
      return setState({ filteredItems: ordered })
    }
    const regex = new RegExp(state.search, 'i')
    const newItems = ordered.filter(row => {
      for (const key of Object.keys(row)) {
        if (regex.test(row[key])) return true
      }
      return false
    })
    setState({ filteredItems: newItems })
  }, [hideSearch, rowKey, rows, setState, state.search])

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
    filterItems()
  }, [filterItems])

  useEffect(() => {
    paginateItems()
  }, [paginateItems])

  const onFirst = () => paginateItems(1)
  const onPrevious = () => paginateItems(state.currentPage - 1)
  const onNext = () => paginateItems(state.currentPage + 1)
  const onLast = () => paginateItems(state.totalPages)
  const handleClick = row => isFunction(onClick) && onClick(row)

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
        <Table fullwidth bordered striped hoverable narrow>
          <Table.Head>
            <Table.Row>
              {columns.map(column => (
                <Table.Heading
                  key={column.key}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {column.label}
                </Table.Heading>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {state.pagedItems.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan="100">No Data Found</Table.Cell>
              </Table.Row>
            ) : (
              state.pagedItems.map(row => (
                <Table.Row key={row[rowKey]} onClick={() => handleClick(row)}>
                  {columns.map(column => (
                    <Table.Cell
                      key={column.key}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {get(row, column.key)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
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
