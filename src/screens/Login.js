import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAvoidingView, View, Image, TouchableOpacity, Animated, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { auth } from '../components/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in successfully:', user);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error when logging in user:', error);
      Alert.alert('Error', 'Incorrect email or password.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.loginBackground}>
      <View style={styles.loginImageContainer}>
        <Image source={require('../../assets/images/welcome.png')} style={styles.loginImage} />
        <Text style={styles.imageText}>Recipe App</Text>
      </View>

      <Animated.View style={styles.loginInfos}>
        <TextInput
          style={styles.loginInput}
          placeholder='Email'
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.loginInput}
          placeholder='Senha'
          secureTextEntry
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Register')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loginImageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  loginImage: {
    width: hp(20),
    height: hp(20),
  },
  imageText: {
    fontSize: hp(7),
    fontWeight: 'bold',
    color: '#fbbf24',
    marginTop: 10,
  },
  loginInfos: {
    width: '80%',
    alignItems: 'center',
    marginTop: 150,
  },
  loginInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#fbbf24',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
