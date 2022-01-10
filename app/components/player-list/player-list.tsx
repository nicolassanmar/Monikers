import * as React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { Button, PlayerItem } from "../../components"
import { useStores } from "../../models"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flexDirection: "column",
  width: "60%",
  marginLeft: "auto",
  marginRight: "auto",
  height: "100%",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 20,
  color: color.primary,
}

const BUTTON: TextStyle = {
  padding: 10,
  margin: 10,
}

const InputForm: TextStyle = {
  margin: "auto",
  flexDirection: "row",
  justifyContent: "center",
  width: "30%",
}

const BUTTON_SIGUIENTE: TextStyle = {
  margin: "auto",
}

const PLAYERLIST: ViewStyle = { maxHeight: "60%", marginTop: "auto", marginBottom: "auto" }

export interface PlayerListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  navigation?: any
}

/**
 * Describe your component here
 */
export const PlayerList = observer(function PlayerList(props: PlayerListProps) {
  const { playerStore } = useStores()

  const { style } = props
  const styles = flatten([CONTAINER, style])

  const [newPlayerName, setNewPlayerName] = React.useState("")

  const erasePlayer = (indx) => {
    players.splice(indx, 1)
    setPlayers([...players])
  }

  const [players, setPlayers] = React.useState([])

  let textInput = undefined
  return (
    <View style={styles}>
      <ScrollView style={PLAYERLIST}>
        {players.map((playerName, indx) => {
          return (
            <PlayerItem playerName={playerName} indx={indx} erasePlayer={erasePlayer} key={indx} />
          )
        })}
      </ScrollView>
      <KeyboardAvoidingView
        style={InputForm}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={TEXT}
          onChangeText={(text) => setNewPlayerName(text)}
          placeholder="nombre del jugador"
          onSubmitEditing={() => {
            if (newPlayerName && !players.includes(newPlayerName)) {
              setPlayers([...players, newPlayerName])
              setNewPlayerName("")
              textInput.clear()
            }
          }}
          ref={(input) => {
            textInput = input
          }}
        />
        <Button
          style={BUTTON}
          onPress={() => {
            if (newPlayerName && !players.includes(newPlayerName)) {
              setPlayers([...players, newPlayerName])
              setNewPlayerName("")
              textInput.clear()
            }
          }}
        />
      </KeyboardAvoidingView>
      <Button
        style={BUTTON_SIGUIENTE}
        onPress={() => {
          playerStore.clearPlayers()
          players.forEach((player) => playerStore.addPlayer(player))
          props.navigation()
        }}
      />
    </View>
  )
})
