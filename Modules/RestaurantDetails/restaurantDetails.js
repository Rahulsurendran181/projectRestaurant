import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import { Avatar } from "react-native-elements";
import Icon_Entypo from 'react-native-vector-icons/Entypo'
import { Rating, AirbnbRating } from 'react-native-ratings';
import LazyLoad from 'react-lazyload';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
const { width: WIDTH } = Dimensions.get('window')

console.disableYellowBox = true;

export default class RestaurantDetailsScreenView extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Restaurant Details",
        headerStyle: {
            backgroundColor: '#555CC4'
        },
        headerTintColor: '#fff',

        headerTitleStyle: {
            fontSize: 20
        }
    })

    constructor() {
        super();
        this.state = {
            value: {},
            userId: '',
        }
    }

    componentDidMount = async () => {


    }

    render() {

        const { navigation } = this.props;
        this.state.value = navigation.getParam('data', '');

        return (
            <View style={styles.backgroundContainer}>

                <KeyboardAvoidingView>
                    <View style={{ backgroundColor: 'white', paddingLeft: '2.5%', paddingRight: '2.5%', paddingVertical: '1.5%' }}>
                        {/* <ScrollView style={{}} > */}

                        <View style={{ justifyContent: 'center', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', width: '50%' }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: '2%' }}>
                                        <Avatar

                                            size={155}
                                            source={{ uri: (undefined != this.state.value.image && this.state.value.image != null) ? this.state.value.image : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
                                    </View>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                            {this.state.value.Brand}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', paddingTop: '2%', paddingBottom: '2%' }}>
                                        <Text style={{ fontSize: 14, }}>
                                            {this.state.value.Variety}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', paddingBottom: '2%' }}>
                                        <Text style={{ fontSize: 14, }}>
                                            {this.state.value.Style}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: '2%' }}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Icon_Entypo name={'location-pin'} size={25} style={{ color: 'black' }} />
                                        </View>
                                        <View style={{ paddingLeft: '2%' }}>
                                            <Text style={{ fontSize: 14, }}>
                                                {this.state.value.Country}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <AirbnbRating
                                            count={5}
                                            // reviews={["Terrible",  "OK", "Good", "Very Good", "Wow",]}
                                            defaultRating={this.state.value.Stars}
                                            size={20}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: 'white',
        // alignItems: 'center',
        flex: 1,
    },

});