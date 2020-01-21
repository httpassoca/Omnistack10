import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "react-native";

import Routes from "./src/routes";
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center"
  }
});
