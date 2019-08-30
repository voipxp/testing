import React from 'react'
import { UiPagination } from '.'

export default {
  title: 'Components|UiPagination',
  component: UiPagination
}

export const example = () => {
  const UiPaginationExample = () => {
    const pages = 8
    const [page, setPage] = React.useState(1)
    const onFirst = () => setPage(1)
    const onNext = () => setPage(page === pages ? pages : page + 1)
    const onPrevious = () => setPage(page === 1 ? 1 : page - 1)
    const onLast = () => setPage(pages)

    return (
      <>
        <UiPagination
          align="left"
          pages={pages}
          page={page}
          onFirst={onFirst}
          onNext={onNext}
          onPrevious={onPrevious}
          onLast={onLast}
        />
        <UiPagination
          align="centered"
          pages={pages}
          page={page}
          onFirst={onFirst}
          onNext={onNext}
          onPrevious={onPrevious}
          onLast={onLast}
        />
        <UiPagination
          align="right"
          pages={pages}
          page={page}
          onFirst={onFirst}
          onNext={onNext}
          onPrevious={onPrevious}
          onLast={onLast}
        />
      </>
    )
  }
  return <UiPaginationExample />
}
