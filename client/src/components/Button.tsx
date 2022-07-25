import { Button, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
}

const ButtonBase = ({ title, ...rest }: Props) => {
    return (
        <Button
            bg="green.700"
            h={14}
            fontSize="sm"
            rounded="sm"
            _pressed={{ bg: "green.500" }}
            {...rest}
        >
            <Heading color="white" fontSize="sm">{title}</Heading>
        </Button>
    );
}

export default ButtonBase;