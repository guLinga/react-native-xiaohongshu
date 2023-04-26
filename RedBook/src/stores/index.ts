import { configureStore } from "@reduxjs/toolkit";
import UserStore from "./UserStore";
import HomeList from './HomeStore';

const store = configureStore({
  reducer: {
    users: UserStore,
    home: HomeList
  }
})
export default store;