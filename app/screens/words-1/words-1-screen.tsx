import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Header, Screen, Text, WordCreation, WordWriteBox } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { colors } from "react-native-elements"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const Words1Screen: FC<StackScreenProps<NavigatorParamList, "words1">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { playerStore } = useStores()

    const [currentPlayer, setCurrentPlayer] = useState(playerStore.team1[0])

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const playerList = [...playerStore.team1, ...playerStore.team2]
    const lastPlayer = playerList[playerList.length - 1]

    const goBack = () => navigation.goBack()
    return (
      <Screen style={ROOT} preset="scroll">
        <Header
          titleStyle={{ color: colors.black }}
          headerText={currentPlayer}
          leftIcon="back"
          onLeftPress={goBack}
        />

        <WordCreation
          currentPlayer={currentPlayer}
          onFinish={() => {
            if (playerList.indexOf(currentPlayer) === playerList.length - 1) {
              navigation.navigate("wordsSelect")
            } else {
              setCurrentPlayer(playerList[playerList.indexOf(currentPlayer) + 1])
            }
          }}
        />
      </Screen>
    )
  },
)
