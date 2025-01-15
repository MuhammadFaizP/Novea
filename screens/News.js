import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Share } from 'react-native';
import { Text, Button, Title, Paragraph } from 'react-native-paper';

const News = ({ route }) => {
  const { title, description, image, url } = route.params;
  const [views, setViews] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const shareNews = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${url}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setViews(prev => prev + 1);
    const words = description.split(' ').length;
    setReadingTime(Math.ceil(words / 200)); // Asumsi 200 kata per menit
  }, [description]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.statistic}>
          Views: {views} | Estimated Reading Time: {readingTime} min
        </Paragraph>
        <Paragraph style={styles.description}>{description}</Paragraph>
        <Button mode="contained" onPress={shareNews} style={styles.shareButton}>
          Share
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statistic: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  shareButton: {
    marginTop: 16,
  },
});

export default News;