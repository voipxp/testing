/*
  Notes:
    hoverable based on onClick?
    selectable
    sortable
*/
import React, { useEffect, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { get, orderBy, isFunction } from 'lodash'
import styled from 'styled-components'
import { Table, Input } from 'rbx'
import paginate from 'jw-paginate'
import Pagination from './pagination'

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
  const [pagination, setPagination] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const [filteredItems, setFilteredItems] = useState([])
  const [pageItems, setPageItems] = useState([])

  const paginateItems = useCallback(
    currentPage => {
      const pager = paginate(filteredItems.length, currentPage, pageSize)
      setPagination(pager)
      setPageItems(filteredItems.slice(pager.startIndex, pager.endIndex + 1))
    },
    [filteredItems, pageSize]
  )

  const filterItems = useCallback(() => {
    const ordered = orderBy(rows, rowKey)
    if (hideSearch || !searchTerm) return setFilteredItems(ordered)
    const regex = new RegExp(searchTerm, 'i')
    const newItems = ordered.filter(row => {
      for (const key of Object.keys(row)) {
        if (regex.test(row[key])) return true
      }
      return false
    })
    setFilteredItems(newItems)
  }, [hideSearch, rowKey, rows, searchTerm])

  const onFirst = () => paginateItems(1)
  const onPrevious = () => paginateItems(pagination.currentPage - 1)
  const onNext = () => paginateItems(pagination.currentPage + 1)
  const onLast = () => paginateItems(pagination.totalPages)

  const handleClick = row => {
    if (isFunction(onClick)) onClick(row)
  }

  useEffect(() => {
    filterItems()
  }, [filterItems])

  useEffect(() => {
    paginateItems(1)
  }, [paginateItems])

  return (
    <>
      {!hideSearch && (
        <Input
          type="search"
          placeholder="Filter Results"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
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
            {pageItems.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan="100">No Data Found</Table.Cell>
              </Table.Row>
            ) : (
              pageItems.map(row => (
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
        pages={pagination.totalPages}
        page={pagination.currentPage}
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
