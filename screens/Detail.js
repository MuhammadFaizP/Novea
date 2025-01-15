import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';

const Detail = ({ navigation }) => {
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
        <Button mode="contained" onPress={() => fetchNewsByCategory('technology')}>Technology</Button>
        <Button mode="contained" onPress={() => fetchNewsByCategory('sports')}>Sports</Button>
        <Button mode="contained" onPress={() => fetchNewsByCategory('health')}>Health</Button>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()} // Menggunakan indeks sebagai kunci
          renderItem={({ item }) => (
            <Card style={styles.articleContainer}>
              {item.urlToImage && (
                <Card.Cover source={{ uri: item.urlToImage }} />
              )}
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Text style={styles.source}>Source: {item.source.name}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => navigation.navigate('News', { article: item })}>
                  Go to Detail
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  articleContainer: { marginBottom: 10 },
  source: { fontStyle: 'italic', color: 'gray' },
});

export default Detail;
