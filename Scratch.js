import React, { Component } from 'react';
//import react in our code.
import {StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput, Button } from 'react-native';

import TimePicker from './TimePicker';
import CountDown from './CountDown';
import {forStatement} from '@babel/types';

let id = 0

styles = StyleSheet.create({
    simpleView : {
        flex: 1,
        width: 500,
        height: 500,
        paddingTop: 120
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: 50,
        marginRight: 50,
        paddingTop:150,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const Timer = props => (
    <View>
        <input type="checkbox" checked={props.timer.checked} onChange={props.onToggle} />
        <button onPress={props.onDelete}>delete</button>
        <span>{props.timer.text}</span>
    </View>
)

const CountDownTimer = props => (
    <View>
        <Text>{props.item.time}</Text>
    </View>
)

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timer: null,
            timers: [],
            timerArray:[],
            selectedHours: 0,
            selectedMinutes: 0,
            selectedSeconds: 0
        }
    }



    addTimer() {
        const text = "Hello"

        let time = (this.state.selectedHours * 60 * 60) + (this.state.selectedMinutes * 60) + (this.state.selectedSeconds);
        if (time != 0) {
            this.setState(
                { timerArray: [...this.state.timerArray, {id: id++, originalTime: time, currentTime: time, completed: false, title:""}]},
                console.log("Callback State: " + JSON.stringify(this.state))
            )
        } else {
            alert("Please input valide")
        }

    }

    tickTimer(id) {
        this.setState({
            timerArray: this.state.timerArray.map(timer => {
                if (timer.id == id) {
                    return {
                        id: timer.id,
                        text: timer.text,
                        currentTime: timer.time - 1,
                        completed: timer.completed
                    }
                }
            })
        })
    }

    masterTimer() {
        let timer = setInterval(() => {
            this.startTimers()
        }, 1000)

        this.setState({timer})
    }

    startTimers() {
        console.log("Starting Timer")
        //if timerArray length > 0
        let localTimerArray = this.state.timerArray
        //Find First Timer in timerArray
        let activeTimerIndex = localTimerArray.findIndex(timer => timer.completed == false)
        console.log("Found Timer Index: " + activeTimerIndex)
        if (activeTimerIndex != -1) {
            localTimerArray[activeTimerIndex].currentTime -= 1
            console.log("We have an active Timer with time: " + localTimerArray[activeTimerIndex].currentTime)
            //Subtract a second


            //if time != 0
            if (localTimerArray[activeTimerIndex].currentTime != 0) {
                console.log("Time left, do it again")

                this.setState(
                    { timerArray: localTimerArray}
                )
            } else {
                localTimerArray[activeTimerIndex].completed = true
                this.setState({ timerArray: localTimerArray})
            }

        } else {
            console.log("We are out of timers to iterate")
            //mark timer as compete timer
            clearInterval(this.state.timer)
            this.setState({timer: null})
            alert("Times UP!")
            //trigger alert
              //countdown of next timer
        }

        //else
            //The session is done
    }

    resetSession() {
        //reset status of countdowns.
        let localTimerArray = this.state.timerArray
        this.setState({
            timerArray: this.state.timerArray.map(timer => {
                if (timer.completed == true) {
                    return {
                        id: timer.id,
                        text: timer.text,
                        currentTime: timer.originalTime,
                        completed: !timer.completed
                    }
                }
            })
        })

    }

    removeTimer(id) {

        this.setState({
            timerArray: this.state.timerArray.filter(timer => timer.id !== id)
        })
    }

    toggleTimer(id) {
        this.setState({
            timers: this.state.timers.map(timer => {
                if (timer.id !== id) return timer
                return {
                    id: timer.id,
                    text: timer.text,
                    checked: !timer.checked,
                }
            })
        })
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

    render() {
        return (
            <View style={styles.container}>
                <Button title='ADD Timer' onPress={() => this.addTimer()}></Button>
                <Button title='Start Countdown' onPress={() => this.masterTimer()}></Button>
                <Button title='Reset Countdown' onPress={() => this.resetSession()}></Button>
                <View>
                    {this.state.timers.map(timer => (
                        <Timer
                            onToggle={() => this.toggleTimer(timer.id)}
                            onDelete={() => this.removeTimer(timer.id)}
                            timer={timer}
                        />
                    ))}
                </View>

                <TimePicker
                    selectedHours={this.state.selectedHours}
                    selectedMinutes={this.state.selectedMinutes}
                    selectedSeconds={this.state.selectedSeconds}
                    //initial Minutes value
                    onChange={(hours, minutes, seconds) =>
                        this.setState({ selectedHours: hours, selectedMinutes: minutes, selectedSeconds: seconds })
                    }
                />
                <FlatList

                    data={this.state.timerArray}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    // renderItem={({ item }) => <CountDown
                    //                                 until={item.time}
                    //                                 onFinish={() => alert('Finished')}
                    //                                 onPress={this.removeTimer(item.id)}
                    //                                 size={20}
                    //                             />
                    renderItem={({ item }) => <Text>{item.currentTime}</Text>}

                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}


