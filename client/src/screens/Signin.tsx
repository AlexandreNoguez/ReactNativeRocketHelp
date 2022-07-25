import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import InputBase from '../components/InputBase';
import { Entypo, FontAwesome5 } from '@expo/vector-icons'

import Logo from '../assets/logo_primary.svg'
import ButtonBase from '../components/Button';

const Signin: React.FC = () => {
    const [istLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();

    const handleSignIn = () => {
        if (!email || !password) {
            return Alert.alert("Entrar", "E-mail ou senha inválidos");
        }

        setIsLoading(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false)

                if (error.code === 'auth/invalid-email') {
                    return Alert.alert("Entrar", "E-mail inválido.")
                }

                if (error.code === 'auth/user-not-found') {
                    return Alert.alert("Entrar", "E-mail ou senha inválido.")
                }

                if (error.code === 'auth/wrong-password') {
                    return Alert.alert("Entrar", "E-mail ou senha inválido.")
                }

                return Alert.alert("Entrar", "Não foi possível acessar.")

            })
        console.log(email, password)
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Heading color={colors.gray[100]} fontSize="xl" mt={20} mb={6}>
                Bem-vindo! Faça seu login
            </Heading>
            <InputBase
                mb={4}
                placeholder="Email"
                InputLeftElement={<Icon as={<Entypo name="mail" size={24} color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
            />
            <InputBase
                mb={8}
                placeholder="Senha"
                InputLeftElement={<Icon as={<FontAwesome5 name="key" size={24} color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                onChangeText={setPassword}
            />
            <ButtonBase
                title='Entrar'
                w="full"
                mt={2}
                onPress={handleSignIn}
                isLoading={istLoading}
            />

        </VStack>
    )
}

export default Signin;