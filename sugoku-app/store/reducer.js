import { 
  SET_BOARD, 
  SET_NEW_BOARD, 
  SET_CHANGE_BOARD, 
  SET_GAME_STATUS,
  SET_IS_LOADING
} from './action'

const initialState = {
  board: [],
  newBoard: [],
  gameStatus: '',
  isLoading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case SET_CHANGE_BOARD:
      return {...state, newBoard: payload }
    case SET_NEW_BOARD:
      return {...state, newBoard: payload }
    case SET_BOARD:
      return {...state, board: payload }
    case SET_GAME_STATUS:
      return {...state, gameStatus: payload }
    case SET_IS_LOADING:
      return {...state, isLoading: payload }
    default:
      return state
  }
}

export default reducer