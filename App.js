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
} from "firebase/database";
import { dataBase } from "./src/firebaseConnection";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [idade, setIdade] = useState("");

  useEffect(() => {
    const starCountRef = ref(dataBase, "usuarios/1");

    //Real time
    // onValue(starCountRef, (snapshot) => {
    //   setName(snapshot.val().Nome);
    //   setIdade(snapshot.val().Idade);
    // });

    // Usar se for pegar o dado uma só vez
    // get(child(ref(dataBase), "nome"))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       setName(snapshot.val());
    //     } else {
    //       console.log("Não encontrado!");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log({ error });
    //   });
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
