import { Input, InputProps, Text } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export const AutoComplete = ({
  words,
  value,
  setValue,
  inputProps = {},
}: {
  words: string[];
  value: string;
  setValue: (value: string) => void;
  inputProps?: InputProps;
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestedWords = words.filter((word) =>
    word.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <View style={{ position: "relative" }}>
      <Input
        onChangeText={setValue}
        value={value}
        {...inputProps}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />

      {showSuggestions && (
        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            padding: 8,
            top: 48,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          {suggestedWords.map((word) => (
            <TouchableOpacity
              key={word}
              onPress={() => {
                setValue(word);
              }}
            >
              <Text>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
