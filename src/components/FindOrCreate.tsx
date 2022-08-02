import { Button, Icon, Input, InputProps, Text } from "@rneui/themed";
import React from "react";
import { ListRenderItem, TouchableOpacity, View, FlatList } from "react-native";
import styled from "styled-components/native";

type Props = {
  searchExtractor: (item: any) => string;
  value: string;
  onChange: (value: string) => void;
  data: any[];
  renderItem: ListRenderItem<any>;
  onPressAdd: () => void;
  inputProps?: InputProps;
};

export const FindOrCreate = ({
  searchExtractor,
  value,
  onChange,
  data,
  renderItem,
  onPressAdd,
  inputProps = {},
}: Props) => {
  const matchingData = data.filter((item) =>
    searchExtractor(item).startsWith(value)
  );

  return (
    <View style={{ width: "100%", paddingBottom: 32 }}>
      <Input onChangeText={onChange} value={value} {...inputProps} />

      <FlatList
        style={{ height: 100, paddingHorizontal: 16 }}
        data={matchingData}
        renderItem={(info) => (
          <TouchableOpacity
            onPress={() => {
              onChange(searchExtractor(info.item));
            }}
          >
            {renderItem(info)}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => searchExtractor(item)}
        ListFooterComponent={
          <>
            <Separator />
            <Button title="Create new" onPress={onPressAdd} />
          </>
        }
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const Separator = styled.View`
  height: 8px;
`;
