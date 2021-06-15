import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar
} from 'react-native'
import { useDispatch } from 'react-redux'
import { setGameStatus } from '../../store/action'

function GameOverScreen({ navigation }) {
  const dispatch = useDispatch()

  return (
    <>
      <View style={styles.container}>
        <View style={{marginTop: '20%'}}>
          <Image
              source={require('../../assets/game-over.jpeg')}
              style={{ width: 250, height: 250 }}
            />
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              dispatch(setGameStatus(''))
              navigation.replace('Home')
            }}
          >
            <Text style={styles.buttonText}>Play again!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%'
  },
  banner: {
    backgroundColor: 'skyblue',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  board: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
    borderColor: 'black',
    borderWidth: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  congratulation: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});

export default GameOverScreen