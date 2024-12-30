import { atom } from 'recoil';
import { UserInterface } from '../../users/models';

export const userState = atom<UserInterface | null >({
  key: 'userState', 
  default: null,  
});