const initialState = {}

export const videos = (state = initialState, { type, payload }) => {
  switch (type) {

  case 'GET_VIDEOS':
    return { ...state, ...payload }

  default:
    return state
  }
}
