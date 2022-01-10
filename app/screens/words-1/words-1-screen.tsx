import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Header, Screen, Text, WordWriteBox } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const wordsAmount: number = 8

export const Words1Screen: FC<StackScreenProps<NavigatorParamList, "words1">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    var wordBoxes = []
    for (var i = 0; i < wordsAmount; i++) {
      wordBoxes.push(<WordWriteBox key={i} />)
    }
    const goBack = () => navigation.goBack()
    return (
      <Screen style={ROOT} preset="scroll">
        <Header headerTx="demoScreen.howTo" leftIcon="back" onLeftPress={goBack} />
        {wordBoxes}
      </Screen>
    )
  },
)
