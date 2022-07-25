import React, { useState } from 'react';
import { VStack, Text } from 'native-base';
import { Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore"

import Header from '../components/Header';
import InputBase from '../components/InputBase';
import ButtonBase from '../components/Button';
import { useNavigation } from '@react-navigation/native';


const Register: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigation()

    function handleNewOrderRegister() {
        if (!patrimony || !description) {
            return Alert.alert("Registrar", "Preencha todos os campos")
        }

        setIsLoading(true);

        firestore()
            .collection('orders')
            .add({
                patrimony,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Solicitação", "Solocitação registrada com sucesso")
                navigate.goBack()
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                return Alert.alert("Solicitação", "Não foi possível registrar o pedido");
            })
    }

    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title="Nova solicitação" />
            <InputBase
                placeholder='Número do patrimônio'
                mt={4}
                onChangeText={setPatrimony}
            />
            <InputBase
                placeholder='Descrição do problema'
                mt={5}
                flex={1}
                multiline
                textAlignVertical='top'
                onChangeText={setDescription}
            />
            <ButtonBase
                title="Cadastrar"
                mt={5}
                isLoading={isLoading}
                onPress={handleNewOrderRegister}
            />
        </VStack>
    );
}

export default Register;
