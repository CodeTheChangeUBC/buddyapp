import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import MapView from "react-native-maps";

class GoogleMapsComponent extends Component {

    state = {
        mapRegion: null,
        lastLat: null,
        lastLong: null,
    };

    watchID = null;

    componentDidMount() {
        this.getCurrentPosition();
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    getCurrentPosition() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            };
            this.onRegionChange(region, region.latitude, region.longitude);
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView
                    style={StyleSheet.absoluteFill}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    followUserLocation={true}
                    onRegionChange={this.onRegionChange.bind(this)}>
                    <MapView.Marker
                        coordinate={{
                            latitude: (this.state.lastLat + 0.00050) || -36.82339,
                            longitude: (this.state.lastLong + 0.00050) || -73.03569,
                        }}>
                        <View>
                            <Text style={{color: "#2417ff"}}>
                                My name Jeff
                            </Text>
                        </View>
                    </MapView.Marker>
                </MapView>
            </View>
        );
    }
}

export default GoogleMapsComponent;
