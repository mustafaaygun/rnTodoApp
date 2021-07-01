import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ShowMessage } from '../app';
import { BaseManager } from '../database'
import AsyncStorage from '@react-native-async-storage/async-storage';
const DB = new BaseManager();

const Login = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const loginClick = () => {
        if (userName.replace(/\s/g, "") != "") {
            if (password.replace(/\s/g, "") != "") {
                DB.getUser(userName, password).then((res) => {
                    if (res) {
                        const jsonValue = JSON.stringify(res);
                        AsyncStorage.setItem('user', jsonValue).then((resA) => {
                            ShowMessage("Loggin In");
                            navigation.replace("Pages");
                        });
                    } else {
                        ShowMessage("There is no such user!");
                    }
                }).catch((err) => {
                    ShowMessage("Hata!");
                });

            } else {
                ShowMessage("Do not leave the Password blank!");
            }
        } else {
            ShowMessage("Do not leave the Username blank!");
        }

    }

    return (
        <SafeAreaView style={{ flex: 0.4, padding: 20 }}>
            <View style={{ marginBottom: 20, flex: 0.4, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#7b4fff', textAlign: 'center' }}>Welcome ToDoList App</Text>
            </View>
            <View style={{ flex: 0.6 }}>
                <TextInput placeholderTextColor='#888' selectionColor='#7b4fff' value={userName} onChangeText={setUserName} placeholder="Username" style={{ color: '#222', borderColor: '#7b4fff', borderWidth: 1, borderRadius: 10, padding: 3, marginBottom: 20 }} />
                <TextInput placeholderTextColor='#888' selectionColor='#7b4fff' value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} style={{color: '#222', borderColor: '#7b4fff', borderWidth: 1, borderRadius: 10, padding: 3 }} />
                <TouchableOpacity onPress={() => navigation.navigate("Register")}><Text style={{ padding: 10, color: '#7b4fff' }}>Register</Text></TouchableOpacity>
                <TouchableOpacity onPress={loginClick} style={{ backgroundColor: '#7b4fff', padding: 10, borderRadius: 10 }}><Text style={{ color: 'white', textAlign: 'center' }}>LOGIN</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login;