import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { Button } from "../../components"
const CONTAINER: ViewStyle = {
  justifyContent: "flex-end",
  flexDirection: "row",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 20,
  color: color.primary,
  maxWidth: "80%",
  marginTop: "auto",
  marginBottom: "auto",
}

const BUTTON: TextStyle = {
  width: 20,
  height: 20,
  padding: 10,
  margin: 10,
  backgroundColor: "red",
}

export interface PlayerItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  playerName: string
  indx: number
  erasePlayer: (indx) => void
}

/**
 * Describe your component here
 */
export const PlayerItem = observer(function PlayerItem(props: PlayerItemProps) {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Text style={TEXT}>{props.playerName}</Text>
      <Button
        style={BUTTON}
        onPress={() => {
          props.erasePlayer(props.indx)
        }}
      />
    </View>
  )
})
