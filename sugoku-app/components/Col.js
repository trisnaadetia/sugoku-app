import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { changeBoard } from '../store/action'

function Col({ row, indexRow, board }) {
  const dispatch = useDispatch()
  const newBoard = useSelector(state => state.newBoard)
  
  function handleChange(text, indexCol, indexRow) {
    if (/^\d+$/.test(text) || text === '') { 
      dispatch(changeBoard(text, indexCol, indexRow, newBoard)) 
    }
  }

  return (
    <>
      <View style={styles.board}>
        {
          row.map((col, indexCol) => {
            if(board[indexRow][indexCol]) {
              return (
                <Text key={indexCol} style={styles.borderText}>{JSON.stringify(col)}</Text>
              )
            } else {
              return (
                <TextInput style={styles.borderInput} key={indexCol}
                  onChangeText={text => handleChange(text, indexCol, indexRow)}
                  value={newBoard[indexRow][indexCol] === 0 ? '' : JSON.stringify(newBoard[indexRow][indexCol])}
                  maxLength={1}
                />
              )
            } 
          })
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
  },
  borderInput: {
    fontSize: 15,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 5,
    textAlign: 'center',
    width: 35,
    color: 'black',
    fontWeight: 'bold'
  },
  borderText: {
    fontSize: 15,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 8,
    textAlign: 'center',
    color: 'white',
    width: 35,
    backgroundColor: 'skyblue',
    fontWeight: 'bold'
  }
});


export default Col