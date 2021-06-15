import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform
} from 'react-native'
import { useDispatch } from 'react-redux'
import { setGameStatus } from '../../store/action'

function FinishScreen({ route, navigation }) {
  const { name, timer } = route.params
  const dispatch = useDispatch()

  function convertTimer(timer) {
    let menit = Math.floor((timer/60))
    timer = timer%60

    if(timer < 10){
      return (menit + ':0' + timer)
    } else {
      return(menit + ':' + timer)
    } 
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{marginTop: '20%'}}>
          <Image
              source={require('../../assets/success.jpg')}
              style={{ width: 250, height: 250 }}
            />
        </View>
        <Text style={styles.congratulation}>Congratulations {name}</Text>
        <Text style={{fontSize: 17, marginVertical: 10}}>Your board has been solved!</Text>
        <Text style={{fontSize: 15, marginVertical: 5, color: 'blue', fontWeight: 'bold'}}>You are finish in {convertTimer(timer)}</Text>
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

export default FinishScreen