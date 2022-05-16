import { compose, createStore, applyMiddleware, Middleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './root-saga'
import { rootReducer } from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(
  (middleware): middleware is Middleware => Boolean(middleware)
)
const composedEnhancers = compose(applyMiddleware(...middleware))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
