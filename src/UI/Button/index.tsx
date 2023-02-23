import React from "react";
import { StyleSheet, Text } from "react-native";

const Button = (props: any) => {
    return (
        <Text 
        style={[style.button, props.style]}
        onPress={props.onClick}
        >{props.text}</Text>
    );
}

const style = StyleSheet.create({
    button: {
        backgroundColor: "#BC9BDE",
        color: "black",
        fontSize: 15,
        textAlign: "center",
        width: "60%",
        borderRadius: 12,
        padding:6
    }
})

export default Button;