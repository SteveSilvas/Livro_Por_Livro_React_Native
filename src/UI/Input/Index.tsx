import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { InputType } from '../../@Types/InputType';


export function Input(props: InputType) {
    return (
        <TextInput
            style={[styles.input, props.style]}
            onChangeText={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            keyboardType={props.type} />
    );
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#7C8891",
        width: "60%",
        borderRadius: 12,
    }
});