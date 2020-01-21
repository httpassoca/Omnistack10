import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
// import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../services/api";

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState("");
  const [currentRegion, setCurrentRegion] = useState(null);
  async function loadInitialPosition() {
    const { granted } = await requestPermissionsAsync();
    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      const { latitude, longitude } = coords;
      // alert(latitude + "-" + longitude);
      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      });
    }
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    const res = await api.get("/search", {
      params: {
        lat: latitude,
        long: longitude,
        techs
      }
    });
    setDevs(res.data.devs);
    // console.log(res.data.devs);
  }

  function handleRegionChange(region) {
    setCurrentRegion(region);
    loadDevs();
  }

  useEffect(() => {
    loadInitialPosition();
  }, []);

  currentRegion ? "" : null;
  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChange}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0]
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: `${dev.avatar_url}`
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", {
                  github_username: dev.github_username
                });
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(", ")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#17bc0b"
  },
  callout: { width: 260 },
  devName: { fontWeight: "bold", fontSize: 16 },
  devBio: { color: "#666", marginTop: 5 },
  devTechs: { marginTop: 5 },
  searchForm: {
    position: "absolute",
    top: 20,
    // bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  searchInput: {
    height: 50,
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { widht: 4, height: 4 },
    elevation: 3 // SHADOW FOR ANDROID
  },
  loadButton: {
    height: 50,
    width: 50,
    backgroundColor: "#17bc0b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginLeft: 10
  }
});
export default Main;
