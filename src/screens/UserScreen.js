import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.loginBackground}>
      <View style={styles.avatarContainer}>
        <UserIcon size={hp(20)} color="gray" />
        <Text style={styles.imageText}>Gustavo</Text>
      </View>
      <View style={styles.loginInfos}>
        <Text style={styles.label}>Email: gustavocampos@gmail.com</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
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

export default UserScreen;
