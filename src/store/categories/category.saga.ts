import { all, call, put, takeLatest } from 'typed-redux-saga/macro'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { fetchCategoriesSuccess, fetchCategoriesFaild } from './category.action'
import { CATEGORIES_ACTION_TYPES } from './category.types'


// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart())
//   try {
//     const categoriesArray = await getCategoriesAndDocuments()
//     dispatch(fetchCategoriesSuccess(categoriesArray))
//   } catch (error) {
//     dispatch(fetchCategoriesFaild(error))
//   }
// }

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments)
    yield* put(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    yield* put(fetchCategoriesFaild(error as Error))
  }
}

export function* onFetchCategories() {
  yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)])
}