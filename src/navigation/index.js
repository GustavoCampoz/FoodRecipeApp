import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login'; 
import Register from '../screens/Register';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import CreateHelperScreen from '../components/CreateHelperScreen';
import { db } from '../components/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import UserScreen from '../screens/UserScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
        const fetchedRecipes = [];
        querySnapshot.forEach((doc) => {
          fetchedRecipes.push({ ...doc.data(), id: doc.id });
        });
        setRecipes(fetchedRecipes);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchRecipes();
  }, []);

  const addRecipe = async (newRecipe) => {
    try {
      const docRef = await addDoc(collection(db, 'recipes'), newRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, { ...newRecipe, id: docRef.id }]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register', headerShown: true }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CreateRecipe">
          {props => <CreateRecipeScreen {...props} recipes={recipes} setRecipes={setRecipes} />}
        </Stack.Screen>
        <Stack.Screen name="Create Recipe Info">
          {props => <CreateHelperScreen {...props} onSubmit={addRecipe} />}
        </Stack.Screen>
        <Stack.Screen name="RecipeDetail" options={{ presentation: 'fullScreenModal' }} component={RecipeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
