import { useEffect, useState } from "react";
import {
  onValue,
  ref,
  child,
  get,
  set,
  remove,
  update,
} from "firebase/database";
import { dataBase } from "./src/firebaseConnection";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [name, setName] = useState("Carregando...");
  const [idade, setIdade] = useState("Carregando...");

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

  return (
    <View style={styles.container}>
      <Text>Olá {name}!</Text>
      <Text>Idade {idade}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
