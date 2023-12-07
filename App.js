import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [liste, setListe] = useState([]);
  const [titre, setTitre] = useState('');

  const loadData = () => {
    axios
      .get(`http://api.themoviedb.org/3/search/movie?api_key=f33cd318f5135dba306176c13104506a&query=${titre}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        console.log('Les données sont servies...');
        console.log(response.data);
        setListe(response.data.results);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des données', error);
      });
  };

  useEffect(() => {
    console.log('Chargement du composant...');
    loadData();
  }, []);

  const handleChangeTitre = (text) => {
    setTitre(text);
  };

  const handleClick = () => {
    loadData();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={titre}
        onChangeText={handleChangeTitre}
        placeholder="Titre du film"
      />
      <Button title="Rechercher" onPress={handleClick} />
      <FlatList
        data={liste}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieContainer}>
            <Image style={styles.moviePoster} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  movieContainer: {
    marginBottom: 20,
  },
  moviePoster: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default App;
