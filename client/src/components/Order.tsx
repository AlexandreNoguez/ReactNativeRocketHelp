import { HStack, Text, Box, useTheme, VStack, Circle, Pressable, IPressableProps } from "native-base";
import { ClockAfternoon, CircleWavyCheck, Hourglass } from "phosphor-react-native";

export type OrderProps = {
    id: string;
    patrimony: string;
    when: string;
    status: 'open' | 'closed';
}

type Props = IPressableProps & {
    data: OrderProps;
}

const Order = ({ data, ...rest }: Props) => {

    const { colors } = useTheme()
    const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300]
    return (
        <Pressable {...rest}>
            <HStack
                bg="gray.600"
                mb={4}
                alignItems="center"
                alignContent="space-between"
                rounded="sm"
                overflow="hidden"
            >
                <Box h="full" w={2} bg={statusColor} />
                <VStack flex={1} my={5} ml={5}>
                    <Text color="white" fontSize="md">
                        Patrimônio: {data.patrimony}
                    </Text>
                    <HStack>
                        <ClockAfternoon size={15} color="white" />
                        <Text color="gray.200" fontSize="xs" ml={1}>
                            {data.when}
                        </Text>
                    </HStack>
                </VStack>
                <Circle bg="gray.500" mr={5} h={12} w={12}>
                    {
                        data.status === 'closed'
                            ? <CircleWavyCheck size={24} color={statusColor} />
                            : <Hourglass size={24} color={statusColor} />
                    }
                </Circle>
            </HStack>
        </Pressable>
    );
}

export default Order;