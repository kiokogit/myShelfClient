const initialState = {}

export const journal = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'GET_JOURNAL':
      return { ...state, ...payload };

  default:
    return state
  }
}
