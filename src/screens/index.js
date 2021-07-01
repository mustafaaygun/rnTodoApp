import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ToastAndroid, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { BaseManager } from '../database';
import { ShowMessage } from '../app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const DB = new BaseManager();

const index = ({ navigation }) => {
    const [date, setDate] = useState(Moment());
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(0);
    const [toDO, setToDo] = useState([]);
    const [tbTodo, setTbTodo] = useState('');

    const [isPickerShow, setIsPickerShow] = useState(false);

    const [totalDone, setTotalDone] = useState(0);
    const [totalNotDone, setTotalNotDone] = useState(0);

    useEffect(() => {
        DB.selectTodo();
        AsyncStorage.getItem('user').then((res) => {
            const values = JSON.parse(res);
            setUserName(values.username);
            setUserId(values.id);
            DB.getTodo(values.id, date.format("DD/MM/YYYY")).then((resTodo) => {
                if (resTodo) {
                    setToDo(resTodo);
                    setTotalDone(resTodo.filter((val) => { return val.type == DB.returnTypeDone() }).length);
                    setTotalNotDone(resTodo.filter((val) => { return val.type == DB.returnTypeNotDone() }).length);
                }
            }).catch((err) => {
                ShowMessage("Database error!");
            });
        });
    }, []);

    const insertTodo = () => {
        if (userName.replace(/\s/g, "") != "" && userId > 0) {
            if (tbTodo.replace(/\s/g, "") != "") {
                DB.insertTodo(userId, tbTodo, DB.returnTypeNormal(), date.format("DD/MM/YYYY")).then((res) => {
                    const myArr = Array.from(toDO);
                    myArr.push({
                        id: res,
                        userid: userId,
                        title: tbTodo,
                        type: DB.returnTypeNormal(),
                        date: date.format("DD/MM/YYYY")
                    });
                    setToDo(myArr);
                    ShowMessage("Todo successfully added!");
                    setTbTodo('');
                }).catch((err) => {
                    ShowMessage("Database error!");
                });

            } else {
                ShowMessage("Do not leave the Todo blank!");
            }
        } else {
            ShowMessage("User not found!");
            navigation.replace("Auth");
        }
    }

    const Todos = ({ item }) => {
        return (
            <View style={{ padding: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#e9e9e9', marginBottom: 10, borderRadius: 3 }}>
                <Text style={{ flex: 0.7, alignSelf: 'center', color: '#3b3b3b' }}>{item.title}</Text>
                <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ padding: 5, borderWidth: 1, borderColor: '#7b4fff', borderRadius: 10, justifyContent: 'center' }}><Text style={{ color: '#7b4fff' }} onPress={() => deleteButton(item)}>Delete</Text></TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: '#7b4fff', borderRadius: 10, justifyContent: 'center' }} onPress={() => doneButton(item)}><Text style={{ fontWeight: 'bold', color: 'white' }}>Done</Text></TouchableOpacity>
                </View>
            </View>
        )
    };

    const doneButton = (item) => {
        DB.updateTodo(item.id, DB.returnTypeDone()).then((res) => {
            const myNewTodo = Array.from(toDO);
            const objIndex = myNewTodo.findIndex((obj => obj.id == item.id));
            myNewTodo[objIndex].type = DB.returnTypeDone();
            setToDo(myNewTodo);
            setTotalDone(myNewTodo.filter((val) => { return val.type == DB.returnTypeDone() }).length);
        }).catch((err) => {
            ShowMessage("Database error!");
        });
    }

    const deleteButton = (item) => {
        DB.updateTodo(item.id, DB.returnTypeNotDone()).then((res) => {
            const myNewTodo = Array.from(toDO);
            const objIndex = myNewTodo.findIndex((obj => obj.id == item.id));
            myNewTodo[objIndex].type = DB.returnTypeNotDone();
            setToDo(myNewTodo);
            setTotalNotDone(myNewTodo.filter((val) => { return val.type == DB.returnTypeNotDone() }).length);
        }).catch((err) => {
            ShowMessage("Database error!");
        });
    }

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (event, value) => {
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
        };
        setDate(Moment(value));
        DB.getTodo(userId, Moment(value).format("DD/MM/YYYY")).then((resTodo) => {

            if (resTodo) {
                setToDo(resTodo);
                setTotalDone(resTodo.filter((val) => { return val.type == DB.returnTypeDone() }).length);
                setTotalNotDone(resTodo.filter((val) => { return val.type == DB.returnTypeNotDone() }).length);
            } else {
                setTotalDone(0);
                setTotalNotDone(0);
                setToDo([]);
            }

        }).catch((err) => {
            setTotalDone(0);
            setTotalNotDone(0);
            setToDo([]);
            ShowMessage("Database error!");
        });

    };

    const LogOut = () => {
        AsyncStorage.removeItem('user').then((res) => {
            ShowMessage("Successfully log out!");
            navigation.replace("Auth");
        }).catch((err) => {
            ShowMessage("An error occurred while logging out");
        });
    };

    return (
        <View style={{ flex: 1 }}>
            {isPickerShow && (<DateTimePicker value={date.toDate()} mode='date' display='default' onChange={onChange} />)}
            <View style={{ backgroundColor: '#7b4fff', flex: 0.1, alignItems: 'center', position: 'relative' }}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <TouchableOpacity onPress={LogOut}><Text style={{ color: 'white' }}>{userName + " (LogOut)"}</Text></TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', bottom: 0 }}>
                    <TouchableOpacity onPress={showPicker}><Text style={{ textAlign: 'center', color: 'white' }}>{date.format("DD/MM/YYYY")}</Text></TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>To-do App</Text>
                </View>
            </View>
            <View style={{ flex: 0.8, paddingTop: 5, paddingHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                    <TextInput placeholderTextColor='#888' selectionColor='#7b4fff' style={{color: '#222', borderColor: '#7b4fff', borderWidth: 1, borderRadius: 10, padding: 3, flex: 0.8 }} placeholder="Add New Todo" value={tbTodo} onChangeText={setTbTodo} />
                    <TouchableOpacity style={{ flex: 0.3, alignContent: 'center', justifyContent: 'center', width: '100%' }} onPress={insertTodo}>
                        <Text style={{ textAlign: 'center', padding: 7, marginLeft: 5, borderColor: '#7b4fff', borderWidth: 1, borderRadius: 10, color: '#7b4fff' }}>ADD</Text>
                    </TouchableOpacity>
                </View>
                <FlatList data={toDO.filter((val) => { return val.type === 0 })} renderItem={Todos} keyExtractor={(item) => item.id} style={{}} extraData={"s"} />
            </View>
            <View style={{ backgroundColor: '#7b4fff', flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}><Text style={{ borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 8, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{totalDone.toString()}</Text><Text style={{ fontSize: 12, marginLeft: 10, color: 'white', textAlign: 'center', alignSelf: 'center' }}>Total Done</Text></View>
                <View style={{ borderWidth: 0.5, borderColor: 'white', height: '100%' }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}><Text style={{ fontSize: 12, marginRight: 10, color: 'white', textAlign: 'center', alignSelf: 'center' }}>Total Not Done</Text><Text style={{ borderRadius: 10, borderColor: 'white', borderWidth: 1, padding: 8, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{totalNotDone.toString()}</Text></View>
            </View>
        </View>
    )
}

export default index;