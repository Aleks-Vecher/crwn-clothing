import { createSelector } from "reselect"
import { UserState } from "./user.reducer"
import { RootState } from '../store'


export const selectUserReucer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(
  selectUserReucer,
  (user) => user.currentUser
)