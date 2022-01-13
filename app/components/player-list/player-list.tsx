import * as React from "react"
import {
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  Button,
} from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { PlayerItem } from "../../components"
import { useStores } from "../../models"
import { Icon } from "react-native-elements"
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
  padding: 5,
  margin: 5,
}

const InputForm: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  width: 70,
  margin: "auto",
  marginBottom: 10,
}

const BUTTON_SIGUIENTE: ImageStyle = {
  margin: 10,
}

const PLAYERLIST: ViewStyle = { maxHeight: "60%", marginTop: "auto", marginBottom: "auto" }

const FinalizarView: ViewStyle = {
  margin: "auto",
  marginBottom: 10,
  maxWidth: 100,
  justifyContent: "center",
}

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
        <Icon
          name="check-circle"
          size={30}
          color={color.primary}
          style={BUTTON_SIGUIENTE}
          onPress={() => {
            if (newPlayerName && !players.includes(newPlayerName)) {
              setPlayers([...players, newPlayerName])
              setNewPlayerName("")
              textInput.clear()
            }
          }}
        />
      </KeyboardAvoidingView>
      <View style={FinalizarView}>
        <Button
          title="Finalizar"
          onPress={() => {
            playerStore.clearPlayers()
            players.forEach((player) => playerStore.addPlayer(player))
            props.navigation()
          }}
        />
      </View>
    </View>
  )
})
