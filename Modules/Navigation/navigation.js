import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import initialScreenView from '../Restaurant/restaurant';
import restaurantDetailsScreenView from '../RestaurantDetails/restaurantDetails';


const NavigationApp = createStackNavigator({
    restaurantScreen: {
        screen: initialScreenView
    },
    restaurantDetailsScreen: {
        screen: restaurantDetailsScreenView
    }

},
    {
        // initialRouteName: 'loginInScreen'
    },
)

const AuthStack = createStackNavigator({
    restaurantScreen: {
        screen: initialScreenView
    }
})

const Navigation = createAppContainer(NavigationApp);

class NavigationView extends React.Component {
    constructor() {
        super();
        this._loadData();
    }

    _loadData = async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
        this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : "App")
    }

    render() {
        return (
            <View style={styles.backgroundContainer}>
                <ActivityIndicator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: '#F6F4EA',
        alignItems: 'center',
        flex: 1,
    }
});

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: NavigationView,
            App: Navigation,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);