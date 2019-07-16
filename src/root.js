import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { App } from '@/components/app'
import { store, loadInitialState } from '@/store'
import api from '@/api'
import { clearSession } from '@/store/session'
import { client } from './apollo'

api.interceptors.response.use(
  response => response,
  error => {
    if (error.status === 401 || error.status === 403) {
      store.dispatch(clearSession())
    }
    return Promise.reject(error)
  }
)

export const Root = hot(() => {
  const [initialized, setInitialized] = React.useState(false)
  React.useEffect(() => {
    loadInitialState().then(() => setInitialized(true))
  }, [])
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <HashRouter hashType="hashbang">
          <App initialized={initialized} />
        </HashRouter>
      </Provider>
    </ApolloProvider>
  )
})
