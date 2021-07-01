import React from 'react';
import {ToastAndroid} from 'react-native'
const ShowMessage = (err) => {
    ToastAndroid.show(err,ToastAndroid.SHORT);
}
export  {ShowMessage}