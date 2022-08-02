import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Text, FAB } from "@rneui/themed";
import { atom, useAtom } from "jotai";
import React, { useCallback } from "react";

import {
  cragsModel,
  cragsTable,
  routesModel,
  routesTable,
  withId,
} from "../../db/models";
import { gradeMap, routeImageFallback } from "../../constants";
import { MainContainer, TextArea } from "../../components/globalStyles";
import { RootStackParamList } from "../../../App";
import * as S from "../../components/routes/styles";

const routeAtom = atom<withId<
  routesModel & { crag: withId<cragsModel> }
> | null>(null);

export const Route = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Route">>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [routeData, setRouteData] = useAtom(routeAtom);

  const getRoute = async () => {
    try {
      const res = await routesTable.find({ id });

      if (res.rows.length < 1) return alert("Route not found in the database");

      const data = res.rows._array[0];

      const cragRes = await cragsTable.find({ id: data.cragid });

      if (cragRes.rows.length < 1)
        return alert("Parent crags not found in the database");

      const crag = res.rows._array[0];

      setRouteData({ ...data, crag });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRoute();

      return () => {};
    }, [])
  );

  return (
    <>
      {routeData && (
        <>
          <S.HeaderBackground
            source={
              routeData?.thumbnail
                ? { uri: routeData.thumbnail }
                : routeImageFallback
            }
          >
            <Text h2>
              {routeData.name} - {gradeMap.french[routeData.grade]}
            </Text>
            <Text h4>{routeData.crag.name}</Text>
          </S.HeaderBackground>

          <S.HeaderDivider></S.HeaderDivider>
          <MainContainer>
            {/* <Text h4>Media</Text>
            <Text h4>Notes</Text>
            <TextArea
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              placeholder="Route notes"
            /> */}
          </MainContainer>

          <FAB
            size="large"
            placement="right"
            icon={{ name: "cog", color: "white", type: "entypo" }}
            onPress={() => {
              navigation.navigate("Edit Route", routeData);
            }}
          />
        </>
      )}
    </>
  );
};
