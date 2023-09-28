import { initialState } from "../States/categoryInitialState";

const ActionTypes = {
  ADD_CATEGORY: 'ADD_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  EDIT_CATEGORY: 'EDIT_CATEGORY'
};

function CategoryReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case ActionTypes.REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
      };
    case ActionTypes.EDIT_CATEGORY:
      const { categoryId, updatedCategory } = action.payload;
      const updatedCategories = state.categories.map((category) =>
        category.id === categoryId ? { ...category, ...updatedCategory } : category
      );

      return {
        ...state,
        categories: updatedCategories,
      };
    default:
      return state;
  }
}

export const editCategory = (categoryId, updatedCategory) => ({
  type: ActionTypes.EDIT_CATEGORY,
  payload: { categoryId, updatedCategory },
});

export const addCategory = (category) => ({
  type: ActionTypes.ADD_CATEGORY,
  payload: category,
});

export const removeCategory = (categoryId) => ({
  type: ActionTypes.REMOVE_CATEGORY,
  payload: categoryId,
});

export default CategoryReducer;

