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
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app, dataBase } from "./src/firebaseConnection";
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

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onCreate() {
    setIsLoading(true);
    await createUserWithEmailAndPassword(getAuth(app), email, password)
      .then((response) => {
        alert("Usuario criado:  " + response.user.email);
      })
      .catch((error) => {
        console.log(error);

        if (error.code == "auth/weak-password") {
          alert("Sua senha deve ter pelomenos 6 caracteres");
        } else if (error.code == "auth/invalid-email") {
          alert("O email é inválido");
        } else if (error.code == "auth/network-request-failed") {
          alert("Falha de internet");
        } else {
          alert("Algo deu errado");
        }
      });

    setEmail("");
    setPassword("");
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>E-mail:</Text>
      <TextInput
        keyboardType="email-address"
        editable={!isLoading}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.text}>Senha:</Text>
      <TextInput
        secureTextEntry={true}
        editable={!isLoading}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button disabled={isLoading} title="Cadastrar" onPress={onCreate} />
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
