export const SET_BOARD = 'board/setBoard'
export const SET_CHANGE_BOARD = 'changeBoard/setChangeBoard'
export const SET_NEW_BOARD = 'newBoard/setNewBoard'
export const SET_GAME_STATUS = 'status/setGameStatus'
export const SET_IS_LOADING = 'isLoading/setIsLoading'

export function changeBoard(text, indexCol, indexRow, newBoard) {
  let result = []
  newBoard.forEach((el, i) => {
    let tmp = []
    el.forEach((val, j) => {
      if(i === indexRow && j === indexCol) {
        tmp.push(+text)
      } else {
        tmp.push(newBoard[i][j])
      }
    })
    result.push(tmp)
  })

  return { type: SET_CHANGE_BOARD, payload: result}
}

export function setNewBoard(payload) {
  return { type: SET_NEW_BOARD, payload}
}

export function setIsLoading(payload) {
  return { type: SET_IS_LOADING, payload}
}

export function setBoard(payload) {
  return { type: SET_BOARD, payload}
}

export function setGameStatus(payload) {
  return { type: SET_GAME_STATUS, payload}
}

export function fetchBoard(difficulty) {
  return function(dispatch) {
    dispatch(setIsLoading(true))
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
    .then(res => res.json())
    .then(data => {
      dispatch(setBoard(data.board))

      const result = []
      data.board.forEach(el => {
          result.push(el.slice())
      })

      dispatch(setNewBoard(result))
      dispatch(setIsLoading(false))
    })
  }
}

export function validateBoard(board) {
  return function(dispatch) {
    fetch('https://sugoku.herokuapp.com/validate', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "POST",
      body: encodeParams({ board })
    })
    .then(res => res.json())
    .then(result => {
      dispatch(setGameStatus(result.status))
    })
  }
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export function solvedBoard(board) {
  return function(dispatch) {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({ board }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setNewBoard(response.solution))
      })
      .catch(console.warn)
    
  }
}



