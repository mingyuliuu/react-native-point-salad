import React from 'react'
import { View } from 'react-native'
import FormButton from '../components/FormButton';

const GameScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
        <FormButton buttonTitle="Logout" onPress={() => {}} />
    </View>
  )
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30,
    },

    text: {
        fontSize: 20,
        color: '#333333'
    },
});