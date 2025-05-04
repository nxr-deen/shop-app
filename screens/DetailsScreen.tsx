import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native"

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image.replace("100", "300") }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.detailsText}>
          This is a detailed view of the selected item. In a real app, you would display comprehensive information about
          this item here. You could include specifications, user reviews, related items, and more.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  detailsText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#f4511e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})
