import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = '46b109782549481697c78b3a047cebc4';

  const fetchNewsByCategory = async (category) => {
    const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data.articles) {
        setArticles(data.articles);
      } else {
        console.error("No articles found for this category.");
      }
    } catch (error) {
      console.error("Error fetching news by category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Technology" onPress={() => fetchNewsByCategory('technology')} />
        <Button title="Sports" onPress={() => fetchNewsByCategory('sports')} />
        <Button title="Health" onPress={() => fetchNewsByCategory('health')} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
            data={articles}
            keyExtractor={(item, index) => index.toString()} // Menggunakan indeks sebagai kunci
            renderItem={({ item }) => (
                <View style={styles.articleContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text style={styles.source}>Source: {item.source.name}</Text>
                <Button
                    title="Go to Detail"
                    onPress={() => navigation.navigate('Detail', { article: item })}
                />
                </View>
            )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  articleContainer: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontWeight: 'bold', fontSize: 16 },
  source: { fontStyle: 'italic', color: 'gray' },
});

export default HomeScreen;
