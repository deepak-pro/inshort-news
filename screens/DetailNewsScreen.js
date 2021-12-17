import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  Button,
  Alert,
} from "react-native";
import { useState } from "react/cjs/react.development";

export default function DetailNewsScreen({ route, navigation }) {
  const [newsData, setNewsData] = useState(route.params.data);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: newsData.imageUrl ?? "" }}
      />
      <Text style={styles.date}>
        {newsData.date ?? ""} - {newsData.time ?? ""}
      </Text>
      <Text style={styles.title}>{newsData.title ?? ""}</Text>
      <Text style={styles.content}>{newsData.content ?? ""}</Text>
      {newsData.readMoreUrl ? (
        <Button
          title="Read more"
          onPress={() => {
            Linking.openURL(newsData.readMoreUrl).catch((err) => {
              console.log(err);
            });
          }}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: "30%",
    width: Dimensions.get("window").width,
  },
  title: {
    fontSize: 22,
    marginHorizontal: 8,
  },
  date: {
    color: "#333333",
    padding: 10,
  },
  content: {
    padding: 10,
    fontSize: 15,
  },
});
