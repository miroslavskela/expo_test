import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager'
export default function App() {
  useEffect(() => {
    const trackLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      Location.startLocationUpdatesAsync("TRACK_LOCATION", { accuracy: Location.Accuracy.High, distanceInterval: 2, timeInterval: 2000, showsBackgroundLocationIndicator: true })
      let hasStarted = await Location.hasStartedLocationUpdatesAsync("TRACK_LOCATION")
      console.log(hasStarted)
    };
    trackLocation();
    
  }, []);

  return (
    <View style={styles.container}>
      <Text>Your location</Text>
    </View>
  );
}

TaskManager.defineTask(
  "TRACK_LOCATION",
  async ({ data: { locations }, error }) => {
    if (error) {
      console.log(error);
      // check `error.message` for more details.
      return;
    }
    console.log("locations/////")
    console.log("*******")
    console.log(locations[0])
    
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
