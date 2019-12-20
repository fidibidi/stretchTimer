//This is an example code to get TimePicker//
import React, { Component } from 'react';
//import react in our code.
import {StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput, Button } from 'react-native';
//import all the components we are going to use.
import TimePicker from './TimePicker';
import CountDown from './CountDown';
//import TimePicker from the package we installed

export default class App extends Component {
    state = {
        selectedHours: 0,
        //initial Hours
        selectedMinutes: 0,
        //initial Minutes
        selectedSeconds: 0,
    };


    clockDex = 1;
    constructor(props) {

        super(props);

        this.array = [],

        this.state = {

            arrayHolder: [],

            textInput_Holder: ''

        }

    }

    componentDidMount() {

        this.setState({ arrayHolder: [...this.array] })

    }

    createTimer() {

        this.clockDex += this.clockDex;

        let time = (this.state.selectedHours * 60 * 60) + (this.state.selectedMinutes * 60) + (this.state.selectedSeconds);
        console.log(time);

        let customClock = <CountDown
                                until={(this.state.selectedHours * 60 * 60) + (this.state.selectedMinutes * 60) + (this.state.selectedSeconds)}
                                onFinish={() => alert('I was made in clock')}
                                onPress={() => alert('hello')}
                                size={20}
                            />
        this.array.push({key: this.clockDex, seconds : time});
        this.setState({ arrayHolder: [...this.array] });
    };

    Separator = () => {
        return <View style={styles.separator} />;
    }

    joinData = () => {

        this.array.push({title : this.state.textInput_Holder});

        this.setState({ arrayHolder: [...this.array] });

    }

    GetItem(item) {

        Alert.alert(item);

    }


    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }

    removeFromFlatList(key) {
        let clockIndex = this.array.findIndex(clock => clock.key === key);
        console.log("Array: " + JSON.stringify(this.array));
        console.log("Index where key = " + key + "is searched for" + this.array.findIndex(clock => clock.key === key));
        this.array.splice(clockIndex, 1);
        this.setState({arrayHolder: [...this.array]});
    }

    render() {
        const { selectedHours, selectedMinutes, selectedSeconds } = this.state;
        return (
            <View style={styles.container}>
                <Text>
                    {selectedHours}hr:{selectedMinutes}min:{selectedSeconds}sec
                </Text>
                <FlatList

                    data={this.state.arrayHolder}

                    width='100%'

                    extraData={this.state.arrayHolder}

                    keyExtractor={(index) => index.toString()}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    renderItem={({ item }) => (
                        <>

                            <CountDown
                                until={item.seconds}
                                onFinish={() => alert('finished2')}
                                onPress={() => this.removeFromFlatList(item.key)}
                                size={20}
                            />
                            <Text> {item.key} </Text>
                            {/*{console.log(JSON.stringify(this.array))}*/}
                        </>
                    )}

                />


                <Button
                    title='Touch Me'
                    onPress={this.createTimer.bind(this)}
                />

                <TimePicker
                    selectedHours={selectedHours}
                    selectedMinutes={selectedMinutes}
                    selectedSeconds={selectedSeconds}
                    //initial Minutes value
                    onChange={(hours, minutes, seconds) =>
                        this.setState({ selectedHours: hours, selectedMinutes: minutes, selectedSeconds: seconds })
                    }
                />
                <CountDown
                    until={700}
                    onFinish={() => alert('finished')}
                    onPress={() => alert('hello')}
                    size={20}
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
