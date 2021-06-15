import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, validateBoard, solvedBoard, setGameStatus } from '../../store/action'
import CountDown from 'react-native-countdown-component';
import Col from '../../components/Col'

function GameScreen({ route, navigation }) {
  const { name, difficulty } = route.params
  const board = useSelector(state => state.board)
  const newBoard = useSelector(state => state.newBoard)
  const gameStatus = useSelector(state => state.gameStatus)
  const isLoading = useSelector(state => state.isLoading)
  const [errorMsg, setErrorMsg] = useState('')
  const [timer, setTimer] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBoard(difficulty.difficult))
  },[])

  useEffect(() => {
    if(gameStatus === 'solved') {
      navigation.replace('Finish',{
        name,
        timer
      })
    } else if (gameStatus !== '') {
      setErrorMsg('Your board unsolved!')
    }
  },[gameStatus])
  
  if(isLoading) {
    return (
      <View style={styles.loading}>
        <Image
            source={require('../../assets/loading.gif')}
            style={{ width: 100, height: 100 }}
          />
      </View>
    )
  }

  function submitBoard() {
    dispatch(validateBoard(newBoard))
  }

  function submitSolveBoard() {
    dispatch(solvedBoard(newBoard))
  }

  function countTimer() {
    setTimer(timer + 1)
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.title}>Hello {name}, enjoy the game!</Text>
        </View>
        <View>
          <CountDown
            until={60 * difficulty.time}
            size={15}
            onFinish={() => navigation.replace('GameOver')}
            onChange={countTimer}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: '#1CC625'}}
            timeToShow={['M', 'S']}
          />
        </View>
        <View style={styles.board}>{
            board.map((row, indexRow) => {
              return (
                <Col key={indexRow} row={row} 
                  indexRow={indexRow} board={board}
                />)
            })
          }
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => {
              dispatch(setGameStatus(''))
              navigation.replace('Home')
            }}
          >
            <Text style={styles.buttonText}>Give Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={submitBoard}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={submitSolveBoard}
          >
            <Text style={styles.buttonText}>Solve</Text>
          </TouchableOpacity>
        </View>
        {
          errorMsg !== '' && (
            <Text style={styles.errorMsg}>
              {errorMsg}
            </Text>
          )
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20
  },
  banner: {
    backgroundColor: 'skyblue',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  board: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    borderColor: 'black',
    borderWidth: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  button1: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10
  }
  ,
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  containerButton: {
    marginTop: 30,
    flexDirection: 'row'
  },
  button2: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5
  },
  button3: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5
  },
  errorMsg: {
    backgroundColor: 'red',
    padding: 5,
    color: 'white',
    marginVertical: 25,
    borderRadius: 3
  }
});


export default GameScreen