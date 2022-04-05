const initialState = {}

export const journal = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'GET_JOURNAL':
      return payload;

    default:
      return state
  }
};
