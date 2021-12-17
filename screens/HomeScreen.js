import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

const categories = [
  "all",
  "national",
  "business",
  "sports",
  "world",
  "politics",
  "technology",
  "startup",
  "entertainment",
  "miscellaneous",
  "hatke",
  "science",
  "automobile",
];

export default function App({ navigation }) {
  const [category, setCategory] = useState(categories[0]);
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    console.log("Categories changed");
    setNewsData({});
    fetch("https://inshortsapi.vercel.app/news?category=" + category)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          setNewsData(data.data);
        } else {
          Alert.alert("Error while fetching data");
        }
      });
  }, [category]);

  const News = ({ item }) => (
    <TouchableOpacity
      style={styles.News}
      onPress={() => {
        navigation.navigate("DetailNewsScreen", { data: item });
      }}
    >
      <Image style={styles.newsImage} source={{ uri: item.imageUrl }} />
      <Text style={styles.newsTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.upperView}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          horizontal={true}
        >
          {categories.map((item) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => {
                setCategory(item);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.lowerView}>
        <FlatList data={newsData} renderItem={News} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  upperView: {
    height: 60,
    width: Dimensions.get("window").width - 10,
    margin: 10,
  },
  lowerView: {
    flex: 1,
    width: Dimensions.get("window").width - 10,
  },
  categoryContainer: {
    margin: 5,
    alignItems: "center",
  },
  categoryItem: {
    marginHorizontal: 10,
    padding: 10,
    height: 40,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0.3,
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 6,
    // shadowOpacity: 0.26,
    // elevation: 8,
  },
  News: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  newsTitle: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 15,
  },
  newsImage: {
    flex: 1,
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
