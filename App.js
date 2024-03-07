import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';

const GuessingGame = () => {
  const [userNumber, setUserNumber] = useState('');
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState('');
  const [showGuessPage, setShowGuessPage] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const saveUserNumber = () => {
    const number = parseInt(userNumber);
    if (isNaN(number) || number < 1 || number > 100) {
      alert('Please enter a valid number between 1 and 100.');
      return;
    }
    setGuessNumber();
    setShowGuessPage(true);
  };

  const setGuessNumber = () => {
    const guessedNumber = Math.floor((minRange + maxRange) / 2);
    setGuess(guessedNumber);
  };

  const handleResponse = (response) => {
    setAttempts(attempts + 1);
    if (response === 'high') {
      setMaxRange(guess - 1);
    } else {
      setMinRange(guess + 1);
    }
    const updatedHistory = [...history, { attempt: attempts, guess: guess, response: response }];
    setHistory(updatedHistory);

    if (guess === parseInt(userNumber)) {
      setResult('Congratulations! The system guessed your number (${guess}) in ${attempts} attempts.');
      setShowGuessPage(false);
      setShowHistory(true);
    } else {
      setGuessNumber();
    }
  };

  const checkNumber = () => {
    if (guess === parseInt(userNumber)) {
      setResult('Congratulations! The system guessed your number (${guess}) in ${attempts} attempts.');
    } else {
      setResult('Game Over! The system guessed your number (${userNumber}) wrong  in ${attempts} attempts.');
    }
    setShowGuessPage(false);
    setShowHistory(true);
  };

  const restartGame = () => {
    setUserNumber('');
    setMinRange(1);
    setMaxRange(100)
    setGuess('');
    setAttempts(0);
    setHistory([]);
    setResult('');
    setShowGuessPage(false);
    setShowHistory(false);
  };

  return (
    <View>
      <Text style={styles.heading}>Guessing Game</Text>
      {!showGuessPage && !showHistory && (
        <View>
          <Text style={styles.subheading}>Welcome to the Guessing Game!</Text>
          <Text style={styles.text}>Please Enter your number (between 1 and 100)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setUserNumber(text)}
            value={userNumber}
          />
          <TouchableOpacity style={styles.button} onPress={saveUserNumber}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      {showGuessPage && (
        <View>
          <Text style={styles.subheading}>Is this your number?</Text>
          <Text style={styles.guess}>{guess}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.responseButton} onPress={() => handleResponse('low')}>
              <Text style={styles.buttonText}>Too Low</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.responseButton} onPress={checkNumber}>
              <Text style={styles.buttonText}>Bingo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.responseButton} onPress={() => handleResponse('high')}>
              <Text style={styles.buttonText}>Too High</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {result !== '' && (
        <Text style={[styles.result, { color: result.includes('Congratulations') ? 'green' : 'red' }]}>{result}</Text>
      )}
      {showHistory && (
        <View> 
          <TouchableOpacity style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <Text style={styles.subheading}>Playing History</Text>
          <ScrollView style={styles.historyContainer}>
            {history.map((item, index) => (
              <Text style={styles.historyItem} key={index}>Attempt {item.attempt}: {item.guess} ({item.response})</Text>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 45,
    fontWeight: 'bold',
    paddingTop: 125,
    paddingBottom: 75,
    color: 'darkgreen',
    textAlign: 'center'
  },
  subheading: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    color: 'darkgreen',
    textAlign: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkgreen',
    textAlign: 'center'
  },
  input: {
    padding: 10,
    margin: 40,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'tomato',
    borderRadius: 30,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  guess: {
    fontSize: 60,
    fontWeight: 'bold',
    padding: 20,
    color: 'darkgreen',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  responseButton: {
    backgroundColor: 'tomato',
    borderRadius: 30,
    paddingTop: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  result: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 35,
    marginRight: 35,
    marginLeft: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  historyContainer: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  historyItem: {
    width: 200,
    height: 15,
    margin: 5
  }
});

export default GuessingGame;