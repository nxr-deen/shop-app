import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native"

const data = [
  { id: "1", title: "Item 1", description: "Description for item 1", image: "https://via.placeholder.com/100" },
  { id: "2", title: "Item 2", description: "Description for item 2", image: "https://via.placeholder.com/100" },
  { id: "3", title: "Item 3", description: "Description for item 3", image: "https://via.placeholder.com/100" },
  { id: "4", title: "Item 4", description: "Description for item 4", image: "https://via.placeholder.com/100" },
  { id: "5", title: "Item 5", description: "Description for item 5", image: "https://via.placeholder.com/100" },
]

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Details", { item })}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to My App</Text>
      <Text style={styles.subheader}>Tap an item to see details</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subheader: {
    fontSize: 16,
    marginBottom: 24,
    color: "#666",
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
})
