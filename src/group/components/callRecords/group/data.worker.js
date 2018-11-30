self.addEventListener('message', ({ data }) => {
  const { filters, records, search, userId } = data
  const directions = filters
    .filter(filter => filter.show)
    .map(filter => filter.value)
  const filteredRecords = records.filter(record => {
    return (
      filterDirection(record, directions) &&
      filterUser(record, userId) &&
      filterSearch(record, search)
    )
  })
  postMessage(filteredRecords)
})

function filterDirection(record, directions) {
  return directions.includes(record.direction)
}

function filterUser(record, userId) {
  return userId ? record.userId === userId : true
}

function filterSearch(record, search) {
  if (!search) return true
  const regexp = new RegExp(search, 'i')
  return Object.keys(record).find(key => regexp.test(record[key]))
}
