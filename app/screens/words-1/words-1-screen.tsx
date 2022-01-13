import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Header, Screen, Text, WordCreation, WordWriteBox } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const Words1Screen: FC<StackScreenProps<NavigatorParamList, "words1">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { playerStore } = useStores()

    const [currentPlayer, setCurrentPlayer] = useState(playerStore.team1[0])

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const goBack = () => navigation.goBack()
    return (
      <Screen style={ROOT} preset="scroll">
        <Header headerTx="demoScreen.howTo" leftIcon="back" onLeftPress={goBack} />
        <WordCreation currentPlayer={currentPlayer} />
      </Screen>
    )
  },
)
