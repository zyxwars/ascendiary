import { Icon, Input, InputProps, Text } from "@rneui/themed";
import React, { Children, useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export const AutoComplete = ({
  words,
  value,
  onChange,
  onBlur = () => {},
  inputProps = {},
  footerComponent,
}: {
  words: string[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  inputProps?: InputProps;
  footerComponent?: React.ReactNode;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const suggestedWords = words.filter((word) =>
    word.toLowerCase().includes(value.toLowerCase())
  );
  const showSuggestions =
    isFocused &&
    suggestedWords.length !== 0 &&
    !(suggestedWords.length === 1 && suggestedWords[0] === value);

  return (
    <View style={{ position: "relative", width: "100%" }}>
      <Input
        onChangeText={onChange}
        value={value}
        {...inputProps}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
      />

      {showSuggestions && (
        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            padding: 8,
            top: 48,
            left: 8,
            right: 8,
            zIndex: 1000,
          }}
        >
          {suggestedWords.map((word) => (
            <TouchableOpacity
              key={word}
              onPress={() => {
                onChange(word);
              }}
            >
              <Text style={{ fontSize: 20 }}>{word}</Text>
            </TouchableOpacity>
          ))}
          {footerComponent}
        </View>
      )}
    </View>
  );
};
