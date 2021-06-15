import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  StatusBar
} from 'react-native'
import { RadioButton } from 'react-native-paper'

function HomeScreen({ navigation }) {
  const [input, setInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [difficulty, setDifficulty] = useState('')

  return (
    <>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.title}>SUGOKU APP</Text>
        </View>
        <View style={{marginVertical: 35}}>
        <Image
            source={require('../../assets/sudoku.jpeg')}
            style={{ width: 250, height: 250 }}
          />
        </View>
        <View style={{alignItems: 'center', marginBottom: 5}}>
          <Text style={styles.inputTitle}>Input your name here:</Text>
          <TextInput style={styles.input}
            onChangeText={text => setInput(text)}
            value={input}
          />
        </View>
        <Text style={styles.inputTitle}>Select difficulty:</Text>
        <View style={styles.checkboxContainer}>
          <RadioButton
            value="easy"
            status={ difficulty.difficult === 'easy' ? 'checked' : 'unchecked' }
            onPress={() => setDifficulty({
              difficult: 'easy',
              time: 10
            })}
          />
          <Text style={styles.label}>Easy</Text>
          <RadioButton
            value="medium"
            status={ difficulty.difficult === 'medium' ? 'checked' : 'unchecked' }
            onPress={() => setDifficulty({
              difficult: 'medium',
              time: 15
            })}
          />
          <Text style={styles.label}>Medium</Text>
          <RadioButton
            value="hard"
            status={ difficulty.difficult === 'hard' ? 'checked' : 'unchecked' }
            onPress={() => setDifficulty({
              difficult: 'hard',
              time: 10
            })}
          />
          <Text style={styles.label}>Hard</Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if(input && difficulty) {
                navigation.replace('Game', {
                  name: input,
                  difficulty: difficulty
                })
              } else {
                setErrorMsg('Please check your input name or difficult')
              }
            }}
          >
            <Text style={styles.buttonText}>Play!</Text>
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
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  board: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    borderColor: 'black',
    borderWidth: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5
  }
  ,
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  containerButton: {
    marginTop: 20
  },
  inputTitle: {
    fontSize: 18,
    color: 'black'
  },
  input: {
    margin: 15,
    width: 200,
    height: 40,
    borderColor: 'skyblue',
    borderWidth: 1,
    padding: 10
  },
  checkboxContainer: {
    flexDirection: "row"
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  errorMsg: {
    backgroundColor: 'red',
    padding: 5,
    color: 'white',
    marginVertical: 20,
    borderRadius: 3
  }
});

export default HomeScreen