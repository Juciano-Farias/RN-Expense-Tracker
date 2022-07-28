import { View } from "react-native";
import Input from "./Input";

const ExpenseForm = () => {
  function amountChangedHandler() {}

  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangedHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYY-MM-DD",
          maxLneght: 10,
          onChangeText: () => {},
        }}
      />
      <Input label="Description" textInputConfig={{
        multiline: true,
      }} />
    </View>
  );
};

export default ExpenseForm;
