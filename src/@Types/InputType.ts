import { KeyboardTypeOptions } from "react-native"

export type InputType = {
    type: KeyboardTypeOptions,
    style?: object,
    placeholder?: string,
    onChange: (e: any) => void,
    value?: any,
    /** Oculta o texto digitado (usado em campos de senha). */
    secureTextEntry?: boolean,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    autoCorrect?: boolean,
    editable?: boolean,
    maxLength?: number,
    onEndEditing?: () => void,
}