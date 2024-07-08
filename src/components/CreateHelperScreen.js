import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { realtimeDb } from '../components/firebase';
import { ref, push } from "firebase/database";

const difficulties = [
  { id: '1', label: 'Easy' },
  { id: '2', label: 'Medium' },
  { id: '3', label: 'Hard' },
];

const CreateHelperScreen = ({ navigation }) => {
  const [recipeName, setRecipeName] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [calories, setCalories] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [expanded, setExpanded] = useState(false);

  const addRecipe = async () => {
    const newRecipe = {
      name: recipeName,
      prepTime,
      servings,
      calories,
      difficulty,
      ingredients,
      instructions,
    };
    
    try {
      const recipesRef = ref(realtimeDb, 'recipes');
      await push(recipesRef, newRecipe);
      setRecipeName('');
      setPrepTime('');
      setServings('');
      setCalories('');
      setDifficulty('');
      setIngredients('');
      setInstructions('');
      navigation.navigate('CreateRecipe');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const selectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    toggleExpand();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Create New <Text style={styles.amberText}>Recipe</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={setRecipeName}
      />
      <TextInput
        style={styles.input}
        placeholder="Preparation Time (minutes or hours)"
        value={prepTime}
        onChangeText={setPrepTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Servings"
        value={servings}
        onChangeText={text => setServings(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        value={calories}
        onChangeText={text => setCalories(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={toggleExpand}>
        <Text>{difficulty ? difficulty : 'Select Difficulty'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.difficultyContainer}>
          {difficulties.map((item) => (
            <TouchableOpacity key={item.id} style={styles.difficultyButton} onPress={() => selectDifficulty(item.label)}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={addRecipe}>
        <Text style={{ color: '#fff' }}>Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 16,
  },
  amberText: {
    color: '#ffbf00',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffbf00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  difficultyContainer: {
    width: '100%',
    alignItems: 'center',
    color:'#ffbf00'
  },
  difficultyButton: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    color:'#ffbf00'
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
});

export default CreateHelperScreen;
