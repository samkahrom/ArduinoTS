import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Switch,
} from "react-native";

import BluetoothSerial from "react-native-bluetooth-serial";

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
    };
  }
  componentWillMount() {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      (values) => {
        const [isEnabled, devices] = values;

        this.setState({ isEnabled, devices });
      }
    );

    BluetoothSerial.on("bluetoothEnabled", () => {
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        (values) => {
          const [isEnabled, devices] = values;
          this.setState({ devices });
        }
      );

      BluetoothSerial.on("bluetoothDisabled", () => {
        this.setState({ devices: [] });
      });
      BluetoothSerial.on("error", (err) =>
        console.log(`Error: ${err.message}`)
      );
    });
  }
  _renderItem(item) {
    return (
      <View style={styles.deviceNameWrap}>
        <Text style={styles.deviceName}>{item.item.name}</Text>
      </View>
    );
  }
  enable() {
    BluetoothSerial.enable()
      .then((res) => this.setState({ isEnabled: true }))
      .catch((err) => Toast.showShortBottom(err.message));
  }

  disable() {
    BluetoothSerial.disable()
      .then((res) => this.setState({ isEnabled: false }))
      .catch((err) => Toast.showShortBottom(err.message));
  }

  toggleBluetooth(value) {
    if (value === true) {
      this.enable();
    } else {
      this.disable();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>

          <View style={styles.toolbarButton}>
            <Switch
              value={this.state.isEnabled}
              onValueChange={(val) => this.toggleBluetooth(val)}
            />
          </View>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.devices}
          keyExtractor={(item) => item.id}
          renderItem={(item) => this._renderItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  toolbar: {
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: "row",
  },
  toolbarButton: {
    width: 50,
    marginTop: 8,
  },
  toolbarTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    marginTop: 6,
  },
  deviceName: {
    fontSize: 17,
    color: "black",
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth: 1,
  },
});
