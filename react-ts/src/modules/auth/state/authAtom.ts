import {atom} from 'recoil'

export const authTokenState = atom<string | null | undefined>({
    key: 'authTokenState', // Un identificador único para este átomo
    default: null, // Valor inicial
  });