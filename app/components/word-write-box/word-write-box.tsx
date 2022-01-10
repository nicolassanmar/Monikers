import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface WordWriteBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * A component to render a word write box. Used in the word select phase.
 */
export const WordWriteBox = observer(function WordWriteBox(props: WordWriteBoxProps) {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Text style={TEXT}>Hello</Text>
    </View>
  )
})
