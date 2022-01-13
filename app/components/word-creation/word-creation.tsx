import * as React from "react"
import { Alert, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { useStores } from "../../models"
import { Button, colors, Input, ListItem, Tooltip } from "react-native-elements"
import { useRef } from "react"
import { useFonts } from "expo-font"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const list: ViewStyle = {
  borderTopWidth: 1,
  borderColor: colors.greyOutline,
  padding: 0,
}

export interface WordCreationProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  currentPlayer: string
  onFinish: () => void
}

/**
 * Describe your component here
 */
export const WordCreation = observer(function WordCreation(props: WordCreationProps) {
  const { style, currentPlayer, onFinish } = props
  const styles = flatten([CONTAINER, style])
  const { playerStore } = useStores()

  const words = []
  let refs = []
  for (let i = 0; i < playerStore.game.numberOfWords; i++) {
    words.push("")
    refs.push(null)
  }

  const validateWords = () => {
    if (words.filter((w) => w.length === 0).length > 0) {
      return false
    }
    return true
  }

  return (
    <View style={list}>
      {words.map((word, indx) => {
        return (
          <Input
            key={indx}
            ref={(input) => (refs[indx] = input)}
            style={{
              textAlign: "center",
              padding: 5,
              margin: 5,
              color: color.black,
              fontFamily: "Courgette",
              fontSize: 24,
            }}
            onChangeText={(text) => (words[indx] = text)}
          />
        )
      })}

      <Button
        title="Listo"
        onPress={() => {
          if (validateWords()) {
            playerStore.setWords(currentPlayer, words)
            onFinish()
            refs.forEach((ref) => ref.clear())
          }
        }}
      />
    </View>
  )
})
