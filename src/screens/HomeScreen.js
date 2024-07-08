import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PlusIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const searchRecipes = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const handleSearch = () => {
    searchRecipes();
    setSearchQuery('');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <TouchableOpacity onPress={() => navigation.navigate('User')}>
            <UserIcon size={hp(4)} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('CreateRecipe')}>
            <PlusIcon size={hp(4)} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello, Gustavo!</Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">A wonderful day for</Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
            a new <Text className="text-amber-400">recipe</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity className="bg-white rounded-full p-3" onPress={handleSearch}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}