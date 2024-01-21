import { configureStore } from '@reduxjs/toolkit'

import rootReducer from '../reducer/index'
//import usersReducer from '../reducers/usersReducer'

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    rootReducer,
    //users: usersReducer
  }
})

export default store

// import { applyMiddleware, createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk'
// import rootReducer from '../reducers/index'


// const store = createStore (
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// )


// export default store