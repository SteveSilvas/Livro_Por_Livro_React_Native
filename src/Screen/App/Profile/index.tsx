import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../../Context/AuthContext';
import UserServices from '../../../services/UserServices';
import { UserRegisterType } from '../../../@Types/UserRegisterType';
import Converters from '../../../Util/Converters';

const ProfileScreen = ({ navigation }: any) => {
    const initialDate = new Date(1980, 1, 1);
    const auth = useContext(AuthContext);
    const [user, setUser] = useState<UserRegisterType>({
        Id: 0,
        Name: "",
        Birth: initialDate,
        Email: "",
        Pass: ""
    });

    useEffect(() => {
        console.log('auth:', auth.auth.Email)
        UserServices.GetUserByEmail(auth.auth.Email)
            .then((res: any) => {
                setUser({
                    Id: res.Id,
                    Name: res.Name,
                    Birth: res.Birth,
                    Email: res.Email,
                    Pass: res.Pass
                });
                console.log(user)
            })
            .catch((err: any) => console.log(err));

    }, [navigation]);

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView>
                <View style={styles.header}>
                    <Text>Imagem</Text>
                </View>
                <View>
                    <View>
                        <Text>Nome:</Text>
                        <Text>{user.Name}</Text>
                    </View>
                    <View>
                        <Text>Nascimento:</Text>
                        <Text>{user.Birth && Converters.GetDateString(user.Birth)}</Text>
                    </View>
                    <View>
                        <Text>Email:</Text>
                        <Text>{user.Email}</Text>
                    </View>
                </View>
                <Text>Perfil</Text>
                <Text>Perfil</Text>
            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "pink"
    },

    header: {
        backgroundColor: "red",
        height: "20%"
    }
})
export default ProfileScreen;