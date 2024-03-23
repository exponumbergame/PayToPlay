import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import Payment from '../components/Payment';
import BottomModal from '../components/Modal';
import PaymentScreen from '../components/Payment';
import { useStripe } from '@stripe/stripe-react-native';
// import { API_URL } from 'expo-dotenv';
import axios from 'axios';

const Play = () => {
    const [currentNumber, setCurrentNumber] = useState(1);
    const [credits, setCredits] = useState(1);
    const [points, setPoints] = useState(0);
    const [isRefilling, setIsRefilling] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const closeModal = () => {
        setModalVisible(false);
    }

    const handleTap = () => {
        if (credits === 0) {
            Alert.alert(
                "Out of Credits",
                "You have exhausted your credits. Refill to continue playing.",
                [
                    {
                        text: "Refill",
                        onPress: () => setIsRefilling(true),
                    },
                ]
            );
        } else {
            setCurrentNumber(prevNumber => {
                if (prevNumber === 10) {
                    setCredits(credits - 1);
                    setPoints(points + 1)
                    Alert.alert("You have won! Credits depleted.");
                    return 1; // Reset number to 1
                } else {
                    const randomValue = Math.random();
                    // if (randomValue < 0.5) {
                    //     return Math.min(prevNumber + 1, 10);
                    // } else {
                    //     return Math.max(prevNumber - 1, 1);
                    // }
                    return prevNumber + 1;
                }
            });
        }
    };


    const scheduleNotification = async () => {

    };

    const handlePayment = async () => {

        console.log("Scheduling notification");

        await axios.post("https://3b57-2400-adc5-116-4d00-f601-7eeb-d004-53ed.ngrok-free.app/api/payment", {
            amount: 1
        }).then(async res => {
            const { error: sheetError } = await initPaymentSheet({
                merchantDisplayName: 'Testing, Inc.',
                paymentIntentClientSecret: res.data.response.client_secret,
                defaultBillingDetails: {
                    name: 'Tester',
                },
            });

            if (sheetError) {
                Alert.alert("Error", "Something went wrong!")
                return;
            }

            await presentPaymentSheet().then(res => {
                if (res.error) {
                    Alert.alert("Payment Cancled", "You Payment Canceled")
                    return;
                } else {
                    setCredits(5);
                    setIsRefilling(false)
                }
            });

        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Number Game</Text>
            <TouchableOpacity onPress={handleTap} style={styles.numberContainer}>
                <Text style={styles.number}>{currentNumber}</Text>
            </TouchableOpacity>
            <Text style={styles.credits}>Points: {points}</Text>
            <Text style={styles.credits}>Credits: {credits}</Text>
            {isRefilling && (
                <View style={styles.refillContainer}>
                    <TouchableOpacity onPress={handlePayment} style={styles.refillButton}>
                        <Text style={styles.refillButtonText}>Refill Credits</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* <TouchableOpacity onPress={handlePayment} style={styles.refillButton}>
                <Text style={styles.refillButtonText}>Refill Credits</Text>
            </TouchableOpacity> */}

            {/* {
                modalVisible && <BottomModal visible={modalVisible} onClose={closeModal}>
                    <View>
                        <Text> hi there</Text>
                    </View>
                </BottomModal>
            } */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    numberContainer: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    number: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    credits: {
        marginTop: 20,
        fontSize: 18,
    },
    refillContainer: {
        marginTop: 20,
        width: '80%',
    },
    refillButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    refillButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});


export default Play
