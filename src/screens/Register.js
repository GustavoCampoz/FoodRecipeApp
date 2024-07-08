import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { auth, db } from '../components/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const generos = [
  { id: '1', nome: 'Masculine' },
  { id: '2', nome: 'Feminine' },
  { id: '3', nome: 'Rather not answer' },
];

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        email,
        gender
      });

      console.log('User registered successfully:', user);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    toggleExpand();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/welcome.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={toggleExpand}>
        <Text>{gender ? gender : 'Select the genre'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.genderContainer}>
          {generos.map((item) => (
            <TouchableOpacity key={item.id} style={styles.genderButton} onPress={() => selectGender(item.nome)}>
              <Text>{item.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 180,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  genderContainer: {
    alignItems: 'center',
  },
  genderButton: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
