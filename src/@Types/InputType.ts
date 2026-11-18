import { KeyboardTypeOptions } from "react-native"

export type InputType = {
    type: KeyboardTypeOptions,
    style?: object,
    placeholder?: string,
    onChange: (e: any) => void,
    value?: any
}