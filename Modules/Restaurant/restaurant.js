import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon_AntDesign from 'react-native-vector-icons/AntDesign'
import viewCheckList from '../../assets/images/viewCheckList.png'
import { Avatar } from "react-native-elements";
import axios from 'axios';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon_FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width: WIDTH } = Dimensions.get('window')
import CompleteFlatList from 'react-native-complete-flatlist';

export default class RestaurantScreenView extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "List",
        headerStyle: {
            backgroundColor: '#555CC4'
        },
        headerTintColor: '#fff',
        // headerBackground: '',
        headerTitleStyle: {
            fontSize: 20
        }
    })

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    constructor() {
        super();
        this.state = {
            myList: [],
            myImageList: [],
            filter: false,
        }
    }

    async componentDidMount() {
        await this.getImageData()
        await this.getData()

    }

    getData = async () => {

        // const AuthStr = 'Bearer '.concat(this.state.token);
        let url = `https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json`
        axios.get(url)
            .then(response => {

                if (response.status == 200) {
                    let tempData = []
                    response.data.forEach(element => {
                        let tempImage = this.state.myImageList[Math.floor(Math.random() * this.state.myImageList.length)];
                        element.image = tempImage.Image
                        tempData.push(element)
                    });
                    this.setState({
                        myList: tempData
                    })
                }


            })
            .catch(function (error) {
                alert(error)
            });
    }

    getImageData = async () => {
        let url = `https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json`
        axios.get(url)
            .then(response => {

                if (response.status == 200) {
                    this.setState({
                        myImageList: response.data
                    })

                }

            })
            .catch(function (error) {
                alert(error)
            });
    }

    updateFilter = (text) => {


    }

    renderMyList = (item, index) => {
        return (
            <View>
                <View style={{ backgroundColor: 'white', paddingLeft: '2.5%', paddingRight: '2.5%', paddingVertical: '1.5%' }}>
                    {/* <ScrollView style={{}} > */}

                    <View style={{}}>
                        {index == 0 &&
                            <View style={{ marginTop: 5 }} />
                        }

                        <View style={{ flexDirection: 'row', }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: '2%' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('restaurantDetailsScreen', { 'data': item })} >
                                    <Avatar
                                        rounded
                                        size={55}
                                        source={{ uri: (undefined != item.image && item.image != null) ? item.image : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '75%', justifyContent: 'center' }} >
                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View>
                                            <Text style={{ fontSize: 14 }}>
                                                {item.Brand}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                {/* <View>
                                    <Text style={{ fontSize: 14, fontFamily: 'Muli-Regular', fontWeight: 'bold' }}>
                                        {null != item.company && undefined != item.company.name ? item.company.name : ''}
                                    </Text>
                                </View> */}


                                <View>
                                    <View style={{ marginTop: 10 }} />
                                    <View
                                        style={{ width: '100%', borderBottomWidth: 0.5, }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }



    render() {
        return (
            <View style={styles.backgroundContainer}>

                <KeyboardAvoidingView>
                    <View style={{ flexDirection: 'row' }}>
                        <View >
                            {this.state.myList.length > 0 ?
                                <View style={{ height: '98%' }}>
                                    <CompleteFlatList
                                        searchKey={['Brand']}

                                        data={this.state.myList}
                                        renderItem={({ item, index }) => this.renderMyList(item, index)}
                                        // renderItem={this.renderMyUsers}
                                        ref={c => this.completeFlatList = c}
                                        placeholder={'search'}
                                        searchBarBackgroundStyles={{ backgroundColor: '#05559E' }}
                                        persistentScrollbar={true}
                                        onEndReachedThreshold={0.7}
                                    />
                                </View>
                                :
                                <View>
                                    <Text>Loading ...</Text>
                                </View>
                            }
                        </View>
                        <View>
                            {/* <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon_FontAwesome name={'filter'} size={16} color={'black'} />
                                </View>
                                {this.state.filter ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon_AntDesign name={'caretdown'} size={8} color={'black'} />
                                    </View>
                                    :
                                    <View>
                                    <Icon_AntDesign name={'caretup'} size={8} color={'black'} />
                                    </View>
                                }
                            </View> */}
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
        alignItems: 'center',
        // flex: 1,
    },
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    inputContainer: {
        marginTop: 6,
    },
    input: {
        width: WIDTH - 55,
        height: 42,
        paddingLeft: 30,
        borderBottomWidth: 0.5,
        fontSize: 15,
        color: 'black',
    },
    inputPassword: {
        width: WIDTH - 55,
        height: 42,
        paddingLeft: 30,
        paddingRight: 30,
        borderBottomWidth: 0.5,
        fontSize: 15,
        color: 'black',
    },
    inputIconEmail: {
        position: 'absolute',
        left: 0,
        top: 8
    },
    inputIconPassword: {
        position: 'absolute',
        left: 3,
        top: 6
    },
    text: {
        color: 'white',
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
    },
    btnLoginSubmit: {
        width: WIDTH - 55,
        fontSize: 14,
        //backgroundColor: '#8D8DAA',
        backgroundColor: '#334ED4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    deviceNotVerified: {
        width: WIDTH - 55,
        fontSize: 14,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    btnLoginDisable: {
        width: WIDTH - 55,
        fontSize: 14,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    btnEye: {
        position: 'absolute',
        right: 3,
        top: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});