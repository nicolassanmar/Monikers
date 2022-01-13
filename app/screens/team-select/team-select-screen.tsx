import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text, Header, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const TeamSelectScreen: FC<StackScreenProps<NavigatorParamList, "teamSelect">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    const { playerStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const players = [...playerStore.players]

    const [equipo1, setEquipo1] = React.useState<string[]>(players.map((player) => player.name))
    const [equipo2, setEquipo2] = React.useState<string[]>([])

    return (
      <Screen style={ROOT} preset="scroll">
        <Header leftIcon="back" onLeftPress={() => navigation.goBack()} />
        <View>
          {equipo1.map((playerName, indx) => {
            return (
              <View key={playerName}>
                <Text key={playerName}> {playerName} </Text>
                <Button
                  onPress={() => {
                    equipo1.splice(indx, 1)
                    equipo2.push(playerName)
                    setEquipo1([...equipo1])
                    setEquipo2([...equipo2])
                  }}
                />
              </View>
            )
          })}
        </View>

        <Text> ------------------------- </Text>

        <View>
          {equipo2.map((playerName, indx) => {
            return (
              <View key={playerName}>
                <Text key={playerName}> {playerName} </Text>
                <Button
                  onPress={() => {
                    equipo2.splice(indx, 1)
                    equipo1.push(playerName)
                    setEquipo1([...equipo1])
                    setEquipo2([...equipo2])
                  }}
                />
              </View>
            )
          })}
        </View>

        <Button
          onPress={() => {
            playerStore.setTeams(equipo1, equipo2)
            navigation.navigate("config")
          }}
        />
      </Screen>
    )
  },
)
