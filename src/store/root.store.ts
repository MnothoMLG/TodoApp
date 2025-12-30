import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./root.reducer";
import sagas from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false, // Disable thunk if you're only using sagas
    }).concat(sagaMiddleware), // Add saga middleware,
});

sagaMiddleware.run(sagas);

export { store };
