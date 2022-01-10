import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, PlayerList, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const PlayersScreen: FC<StackScreenProps<NavigatorParamList, "players">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores

    // Pull in navigation via hook
    // const navigation = useNavigation()

    return (
      <Screen style={ROOT} preset="scroll">
        <PlayerList navigation={() => navigation.navigate("teamSelect")} />
      </Screen>
    )
  },
)
