import { StyleSheet, Text, View } from "react-native";

export function ListUser({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data?.nome}</Text>
      <Text style={styles.text}>{data?.idade}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#121212",
  },
  text: {
    color: "#fff",
    fontSize: 17,
  },
});
