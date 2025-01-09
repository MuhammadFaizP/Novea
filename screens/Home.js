import React, { useState, useEffect, memo } from "react";
import { View, ScrollView, Dimensions, TextInput, ImageBackground, StyleSheet } from "react-native";
import { ActivityIndicator, Card, Text, Button, Title, Paragraph, Snackbar } from "react-native-paper";
import { useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import News from './News';


const { width } = Dimensions.get("window");
const Stack = createStackNavigator();

const MemberHome = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = "46b109782549481697c78b3a047cebc4";
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
      const data = await response.json();

      if (data.articles) {
        const formattedData = data.articles
          .filter(article => article.title && article.urlToImage)
          .map((article, index) => ({
            id: index.toString(),
            title: article.title,
            description: article.description || "No Description",
            image: article.urlToImage || "https://via.placeholder.com/150",
            url: article.url,
            author: article.author || "Unknown Author",
            publishedAt: article.publishedAt || "Unknown Date"
          }));

        setNewsData(formattedData);
      } else {
        setError("No articles found.");
      }
    } catch (err) {
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onDismissSnackbar = () => setSnackbarVisible(false);

  const filteredNews = newsData.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Section = memo(({ title, data }) => (
    <View style={styles.sectionContainer}>
      <Title style={styles.sectionTitle}>{title}</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(item => (
          <Card
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('News', {
              title: item.title,
              description: item.description,
              image: item.image,
              url: item.url
            })}
          >
            <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
            <Card.Content>
              <Title style={styles.cardTitle}>{item.title}</Title>
              <Paragraph style={styles.cardDescription}>
                {item.description.length > 50 ? item.description.substring(0, 50) + "..." : item.description}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => navigation.navigate('News', {
                  title: item.title,
                  description: item.description,
                  image: item.image,
                  url: item.url
                })}
                color={theme.colors.primary}
                mode="contained"
                style={styles.readMoreButton}
              >
                Read More
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  ));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={fetchNews} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: "https://as2.ftcdn.net/v2/jpg/10/58/61/91/500_F_1058619174_w7MHRCFSLWPrBGWc3h9De7odI6gUQrVt.jpg" }}
        style={styles.headerImage}
      >
      </ImageBackground>
      <View style={styles.content}>
  {/* Search Bar */}
  <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search news..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <View style={styles.searchIcon}>
        {/* Ikon Pencarian */}
        <Text style={{ fontSize: 16, color: "#888" }}>🔍</Text>
      </View>
    </View>

    {/* Highlight Section */}
    <Section title="🌟 Highlight" data={filteredNews.slice(0, 3)} />
    <View style={styles.divider} />

    {/* Latest Section */}
    <Section title="🆕 Latest" data={filteredNews.slice(3, 8)} />
    <View style={styles.divider} />

    {/* Recommended Section */}
    <Section title="✨ Recommended" data={filteredNews.slice(8, 15)} />
  </View>
      <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackbar} duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  headerImage: {
    height: 200,
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  card: {
    marginRight: 16,
    width: width * 0.8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  cardImage: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  readMoreButton: {
    marginTop: 7,
    marginRight: 8,
    borderRadius: 9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#e53935",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MemberHome} />
        <Stack.Screen name="News" component={News} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
