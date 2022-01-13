import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import {
  ListItem,
  Avatar,
  Icon,
  Badge,
  ListItemProps,
  Button,
  Switch,
  colors,
} from "react-native-elements"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const list: ViewStyle = {
  marginTop: 20,
  borderTopWidth: 1,
  borderColor: colors.greyOutline,
}
export const ConfigScreen = observer(function ConfigScreen() {
  // Pull in one of our MST stores
  const { playerStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const [multi, setMulti] = useState(true)
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0)
  const [randomOrder, setRandomOrder] = useState(true)

  const [numeroPalabras, setNumeroPalabras] = useState("8")

  const checkNumeros = (text) => {
    if (/\s/.test(text) || /^\d+$/.test(text) || text == "") {
      return text
    }
    return numeroPalabras
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon="back" onLeftPress={goBack} />

      <View style={list}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Cantidad de palabras por jugador</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              style={{ maxWidth: 100, textAlign: "center" }}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(text) => setNumeroPalabras(checkNumeros(text))}
              value={numeroPalabras}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {multi ? "Jugar en un único dispositivo" : "Jugar en múltiples dispositivos"}
            </ListItem.Title>
          </ListItem.Content>
          <Switch value={multi} onValueChange={(value) => setMulti(value)} />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Orden de los jugadores al azar</ListItem.Title>
          </ListItem.Content>
          <ListItem.CheckBox
            right
            checked={randomOrder}
            onPress={() => setRandomOrder(!randomOrder)}
          />
        </ListItem>

        <ListItem bottomDivider>
          <Button
            style={{ margin: "auto", justifyContent: "center", textAlign: "center" }}
            title="Comenzar juego"
            onPress={() => {
              playerStore.createGame(parseInt(numeroPalabras), multi, randomOrder)
              navigation.navigate("words1")
            }}
          />
        </ListItem>
      </View>
    </Screen>
  )
})
