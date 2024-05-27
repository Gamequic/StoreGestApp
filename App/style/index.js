import { StyleSheet } from "react-native";

const colors = {
  background: '#fffff0',

  red: "#CE430B",

  textInput: '#F9F3ED',

  desert1: '#e9ac6d',
  desert2: '#eec185',
  desert3: 'f4a854',
  desert4: '#f9eab6',
  desert5: '#ffffce',
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: "1rem",
      width: "80%",
      margin: 12,
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.textInput
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 18,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colors.red,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    title: {
      fontSize: 32
    }
  }
);

export default styles