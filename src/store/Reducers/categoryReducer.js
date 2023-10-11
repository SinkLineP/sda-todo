import { initialState } from "../States/categoryInitialState";
import {CategoryActionTypes} from "../Types/ActionTypes";


function CategoryReducer(state = initialState, action) {
  switch (action.type) {
    case CategoryActionTypes.ADD_CATEGORY:
      return [...state, action.payload];

    case CategoryActionTypes.EDIT_CATEGORY:
      const { categoryId, updatedCategory } = action.payload;
      return state.map((category) => category.id === categoryId ? {...category, ...updatedCategory} : category);

    case CategoryActionTypes.REMOVE_CATEGORY:
      return state.filter((category) => category.id !== action.payload);

    default:
      return state;
  }
}

export default CategoryReducer;

