import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reducers } from "./root.reducer";
import sagas from "./root.saga";

const config = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["tasksReducer"],
  debug: true,
  transforms: [
    {
      in: (state: any, key: string) => {
        if (key === "tasksReducer") {
          // Only persist the 'favourites' field
          return { favourites: state.favourites };
        }
        return state;
      },
      out: (state: any, key: string) => state,
      config: {},
    },
  ],
};

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

const persistor = persistStore(store);
sagaMiddleware.run(sagas);

// persistor.purge();

export { persistor, store };
