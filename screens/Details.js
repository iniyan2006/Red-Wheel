import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({ navigation, route }) => {
  const chapters = Array.from({ length: route.params.chapters }, (_, index) => index + 1);
  const [chapter, setChapter] = useState('1');

  useEffect(() => {
    const loadChapter = async () => {
      const neededChapter = await AsyncStorage.getItem(route.params.title);
      if (neededChapter !== null) {
        setChapter(neededChapter);
      }
    };
    loadChapter();
  }, [route.params.title]);
  const chapterSelection = async (ch) => {
    console.log(ch.toString())
    await AsyncStorage.setItem(route.params.title, ch.toString());
    navigation.navigate('Viewer', { url: route.params.url, ch:ch });
  };


  const renderCh = ({ item }) => (
    <TouchableOpacity onPress={() => chapterSelection(item)}>
      <View style={styles.chButton}>
        <Text style={{ fontSize: 20 }}>ch {item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>{route.params.title}</Text>
      <View style={styles.section}>
        <Image source={{ uri: route.params.poster }} style={styles.poster} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Viewer', { url: route.params.url, ch: chapter })}>
          <Text style={styles.buttonText}>{`continue (ch ${chapter})`}</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.desc}>{route.params.desc}</Text>
      <Text style={styles.sectionTitle}>Chapters</Text>
      <View style={styles.section}>
        <FlatList
          data={chapters}
          renderItem={renderCh}
          keyExtractor={(item) => item.toString()}
          numColumns={4}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15191a',
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },
  section: {
    marginBottom: 24,
    alignSelf: 'center',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 10,
    color: 'red',
  },
  poster: {
    width: 250,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
  },
  desc: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#1D2425',
    borderRadius: 10,
    marginHorizontal: 10,
    color: '#fff',
  },
  chButton: {
    width: 70,
    height: 60,
    marginBottom: 24,
    textAlign: 'center',
    backgroundColor: 'red',
    marginRight: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    margin:10,
    width:250,
    borderRadius:10,
    backgroundColor:'red',
    alignSelf:'center'
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    textAlign:'center'
  },
});

export default Details;
