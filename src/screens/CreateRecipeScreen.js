import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { realtimeDb } from '../components/firebase';
import { ref, onValue, remove } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';

const CreateRecipeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecipes = () => {
      const recipesRef = ref(realtimeDb, 'recipes');
      onValue(recipesRef, (snapshot) => {
        const data = snapshot.val();
        const fetchedRecipes = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setRecipes(fetchedRecipes);
      });
    };

    fetchRecipes();
  }, []);

  const handleDeleteRecipe = async (id) => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const recipeRef = ref(realtimeDb, `recipes/${id}`);
              await remove(recipeRef);
              setRecipes(recipes.filter(recipe => recipe.id !== id));
            } catch (e) {
              console.error("Error deleting document: ", e);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Your <Text style={styles.amberText}>Recipes</Text>
        </Text>
      </View>

      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDeleteRecipe(item.id)}>
            <View style={styles.recipeItem}>
              {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />}
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeTitle}>{item.name}</Text>
                <View style={styles.recipeInfo}>
                  <Ionicons name="time-outline" size={16} color="#555" />
                  <Text style={styles.recipeInfoText}>Prep Time: {item.prepTime}</Text>
                </View>
                <View style={styles.recipeInfo}>
                  <Ionicons name="people-outline" size={16} color="#555" />
                  <Text style={styles.recipeInfoText}>Servings: {item.servings}</Text>
                </View>
                <View style={styles.recipeInfo}>
                  <Ionicons name="flame-outline" size={16} color="#555" />
                  <Text style={styles.recipeInfoText}>Calories: {item.calories}</Text>
                </View>
                <View style={styles.recipeInfo}>
                  <Ionicons name="barbell-outline" size={16} color="#555" />
                  <Text style={styles.recipeInfoText}>Difficulty: {item.difficulty}</Text>
                </View>
                <Text style={styles.recipeIngredients}>Ingredients: {item.ingredients}</Text>
                <Text style={styles.recipeInstructions}>Instructions: {item.instructions}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20, width: '100%' }}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Create Recipe Info')}>
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
  headerContainer: {
    marginBottom: 20,
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  amberText: {
    color: '#ffbf00',
  },
  recipeItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    alignItems: 'center',
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  recipeDetails: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  recipeInfoText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  recipeIngredients: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  recipeInstructions: {
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#ffbf00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
});

export default CreateRecipeScreen;
