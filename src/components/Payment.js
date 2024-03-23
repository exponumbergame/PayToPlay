import { CardField, useStripe } from '@stripe/stripe-react-native';

export default function PaymentScreen() {
    const { confirmPayment } = useStripe();

    return (
        <>

        </>
    );
}