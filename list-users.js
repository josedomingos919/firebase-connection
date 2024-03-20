import { useEffect, useState } from "react";
import {
  onValue,
  ref,
  child,
  get,
  set,
  remove,
  update,
  push,
  getDatabase,
} from "firebase/database";
import { dataBase } from "./src/firebaseConnection";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ListUser } from "./src/ListUser";

export default function App() {
  const [name, setName] = useState("");
  const [idade, setIdade] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onValue(ref(dataBase, "usuarios"), (snapshot) => {
      setUsuarios([]);

      snapshot.forEach((item) => {
        let data = {
          key: item.key,
          nome: item.val().nome,
          idade: item.val().idade,
        };

        setUsuarios((prevState) => [...prevState, data].reverse());
      });

      setLoading(false);
    });
  }, []);

  //insert
  useEffect(() => {
    // Criar um nó
    // set(ref(dataBase, "usuarios"), "Junior");
    //
    //
    // Remover um nó
    // remove(ref(dataBase, "usuarios"));
    //
    //
    // criar um registro dentro do no (onde 3 é o novo id)
    // set(ref(dataBase, "usuarios/3"), {
    //   idade: 23,
    //   nome: "Viuva",
    //   cargo: "Dev",
    // });
    //
    //
    // editando no
    // update(ref(dataBase, "usuarios/3"), {
    //   nome: "Helena",
    // });
  }, []);

  async function onCreate() {
    if (name && idade) {
      const key = push(ref(dataBase)).key;

      await set(ref(dataBase, `usuarios/${key}`), {
        nome: name,
        idade: idade,
      });

      setName("");
      setIdade("");
      alert("Cadastrado");
    } else {
      alert("Erro");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.text}>Idade:</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={idade}
        onChangeText={setIdade}
      />

      <Button title="Novo Usuario" onPress={onCreate} />

      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={usuarios}
          renderItem={({ item }) => <ListUser data={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 50,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
  },
  input: {
    borderColor: "#121212",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    height: 45,
    fontSize: 17,
  },
});
