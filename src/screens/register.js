import React, { useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid } from 'react-native';
import { BaseManager } from '../database';
import { ShowMessage } from '../app'
import { TouchableOpacity } from 'react-native-gesture-handler';
const DB = new BaseManager();

const Register = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const insertData = () => {
        if (userName.replace(/\s/g, "") != "") {
            if (name.replace(/\s/g, "") != "") {
                if (password.replace(/\s/g, "") != "" && passwordRepeat.replace(/\s/g, "") != "") {
                    if (password == passwordRepeat) {
                        DB.checkUser(userName).then((res) => {
                            if (res.length > 0) {
                                ShowMessage("This user has already been created!");
                            } else {
                                DB.insertUser(userName, name, password).then((res) => {
                                    navigation.navigate("Login");
                                }).catch((err) => {
                                    ShowMessage("Database Error!");
                                });
                            }
                        }).catch((err) => {
                            ShowMessage("Database Error!");
                        });
                    } else {
                        ShowMessage("Passwords Do Not Match!");
                    }
                } else {
                    ShowMessage("Do not leave the password blank!");
                }
            } else {
                ShowMessage("Do Not Leave Your Name blank!");
            }

        } else {
            ShowMessage("Do not leave the Username blank!");
        }
    }
    return (
        <View style={{ padding: 20 }}>
            <TouchableOpacity onPress={() => { navigation.navigate("Login") }}><Text style={{ fontWeight: 'bold', fontSize: 20, color: '#7b4fff', textAlign: 'center' }}>{"<-GO BACK"}</Text></TouchableOpacity>
            <TextInput placeholderTextColor='#888' selectionColor='#7b4fff' value={userName} onChangeText={setUserName} placeholder="UserName" style={{color: '#222', borderColor: '#7b4fff', borderWidth: 1, borderRadius: 10, padding: 3, marginBottom: 20 }} />
            <TextInput placeholderTextColor='#888' selectionColor='#7b4fff' value={name} onChangeText={setName} placeholder="Your Name" style={{color: '#222', borderColor: '#7b4fff', borderWidth: 1, borderRadius: 10, padding: 3, marginBottom: 20 }} />
            <TextInput placeholderTextColor='#888' selectionColor='#7b4fff' value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} style={{color: '#222', borderColor: '#7b4fff', borderWidth: 1, borderRadius: 10, padding: 3, marginBottom: 20 }} />
            <TextInput placeholderTextColor='#888' selectionColor='#7b4fff' value={passwordRepeat} onChangeText={setPasswordRepeat} placeholder="Re-enter Password" secureTextEntry={true} style={{color: '#222', borderColor: '#7b4fff', borderWidth: 1, borderRadius: 10, padding: 3, marginBottom: 20 }} />
            <TouchableOpacity onPress={insertData} style={{ backgroundColor: '#7b4fff', padding: 10, borderRadius: 10 }}><Text style={{color: '#222', color: 'white', textAlign: 'center' }}>REGISTER</Text></TouchableOpacity>
        </View>
    )
}

export default Register;