import "./global.css";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");

  const handleNumber = (num) => {
    if (operator === "") {
      setFirstNumber((prev) => prev + num);
    } else {
      setSecondNumber((prev) => prev + num);
    }
  };

  const handleClear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperator("");
    setResult("");
  };

  const handleDelete = () => {
    if (operator === "") {
      setFirstNumber((prev) => prev.slice(0, -1));
    } else {
      setSecondNumber((prev) => prev.slice(0, -1));
    }
  };

  const handleOperator = (op) => {
    if (firstNumber && secondNumber) {
      calculateResult();
    }
    setOperator(op);
  };

  const calculateResult = () => {
    if (firstNumber && secondNumber) {
      const firstNum = parseFloat(firstNumber);
      const secondNum = parseFloat(secondNumber);
      let calcResult;

      switch (operator) {
        case "+":
          calcResult = firstNum + secondNum;
          break;
        case "-":
          calcResult = firstNum - secondNum;
          break;
        case "*":
          calcResult = firstNum * secondNum;
          break;
        case "/":
          calcResult = firstNum / secondNum;
          break;
        default:
          return;
      }

      if (calcResult !== undefined) {
        const resultStr = calcResult.toString();
        setResult(resultStr);
        setFirstNumber(resultStr);
        setSecondNumber("");
        setOperator("");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <View className="flex-1 justify-center items-center p-4">
        {/* Display */}
        <View className="w-full h-20 bg-amber-200 justify-center items-end p-2 rounded-md mb-2">
          <Text className="text-5xl text-black" numberOfLines={1} ellipsizeMode="clip">
            {secondNumber || firstNumber || result || "0"}
          </Text>
        </View>

        {/* Controls */}
        <View className="flex-row justify-between w-full my-2">
          <TouchableOpacity className="flex-1 bg-gray-500 justify-center items-center mx-1 py-5 rounded-md" onPress={handleClear}>
            <Text className="text-3xl text-white">CLEAR</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-gray-500 justify-center items-center mx-1 py-5 rounded-md" onPress={handleDelete}>
            <Text className="text-3xl text-white">DEL</Text>
          </TouchableOpacity>
        </View>

        {/* Number and Operator Buttons */}
        {[
          ["7", "8", "9", "/"],
          ["4", "5", "6", "*"],
          ["1", "2", "3", "-"],
        ].map((row, rowIndex) => (
          <View className="flex-row justify-between w-full my-2" key={`row-${rowIndex}`}>
            {row.map((item) => (
              <TouchableOpacity
                key={item}
                className={`flex-1 ${
                  item.match(/[0-9]/) ? "bg-gray-300" : "bg-gray-500"
                } justify-center items-center mx-1 py-5 rounded-md ${
                  item === "5" ? "bg-orange-400" : ""
                }`}
                onPress={() =>
                  item.match(/[0-9]/)
                    ? handleNumber(item)
                    : handleOperator(item)
                }
              >
                <Text
                  className={`text-3xl ${
                    item.match(/[0-9]/) ? "text-black" : "text-white"
                  } ${item === "5" ? "text-white" : ""}`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Zero, Equals, and Plus */}
        <View className="flex-row justify-between w-full my-2">
          <TouchableOpacity
            className="flex-[2.1] bg-gray-300 justify-center items-center mx-1 py-5 rounded-md"
            onPress={() => handleNumber("0")}
          >
            <Text className="text-3xl text-black">0</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-gray-500 justify-center items-center mx-1 py-5 rounded-md" onPress={calculateResult}>
            <Text className="text-3xl text-white">=</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-gray-500 justify-center items-center mx-1 py-5 rounded-md"
            onPress={() => handleOperator("+")}
          >
            <Text className="text-3xl text-white">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Calculator;

