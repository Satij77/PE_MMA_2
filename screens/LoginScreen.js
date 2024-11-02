// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text, Appbar, Snackbar } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('RoomList');
    } catch (error) {
      setErrorMessage(error.message);
      setVisible(true);
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/free-photo/aerial-view-mountain-city-nature_23-2150892975.jpg?t=st=1730475962~exp=1730479562~hmac=0ed22edcbe28e3b766f41a97c1fbe1dd1d7c18e1c1b9dbd821d703363ec37950&w=740' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Login" titleStyle={styles.title} />
        </Appbar.Header>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          outlineColor="#c9ae5f"
          Ba
          activeOutlineColor="#c9ae5f"
          theme={{ colors: { primary: '#c9ae5f', text: '#000' } }}
          left={<TextInput.Icon icon={() => <MaterialIcons name="email" size={20} color="#c9ae5f" />} />}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          outlineColor="#c9ae5f"
          activeOutlineColor="#c9ae5f"
          theme={{ colors: { primary: '#c9ae5f', text: '#000' } }}
          left={<TextInput.Icon icon={() => <MaterialIcons name="lock" size={20} color="#c9ae5f" />} />}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.loginButton} labelStyle={styles.buttonText}>
          Login
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('Register')}
          style={[styles.registerButton, { color: '#c9ae5f' }]}
          labelStyle={{ color: '#c9ae5f' }}
        >
          Don't have an account? Register
        </Button>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: onDismissSnackBar,
        }}
      >
        {errorMessage}
      </Snackbar>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(4,9,2, 0.7)',
    marginHorizontal: 16,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  loginButton: {
    marginTop: 16,
    borderRadius: 25,
    paddingVertical: 8,
    backgroundColor: '#c9ae5f',
  },
  registerButton: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;