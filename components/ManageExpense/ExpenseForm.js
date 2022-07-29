import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { getFormattedDate } from "../../util/date";

import Button from "../UI/Button";
import Input from "./Input";

const ExpenseForm = ({
  defaultValue,
  submitButtonLabel,
  onCancel,
  onSubmit,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description.toString() : "",
      isValid: true,
    },
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }, // The square bracktes allow us to dynamically set the amount, date or description
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, // the + converts a string into a number
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amoutIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0; // trim() ignores the excess spaces in the end and the begnning of the string

    if (!amoutIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amoutIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { 
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRows}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYY-MM-DD",
            maxLneght: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      { formIsInvalid && <Text>Invalid input values - please check your input data</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    marginVertical: 24,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
