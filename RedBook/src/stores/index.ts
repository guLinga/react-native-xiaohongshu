import { configureStore } from "@reduxjs/toolkit";
import UserStore from "./UserStore";
import HomeList from './HomeStore';

export default configureStore({
  reducer: {
    users: UserStore,
    home: HomeList
  }
})