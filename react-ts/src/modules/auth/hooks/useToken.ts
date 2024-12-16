import { useRecoilValue } from 'recoil';
import { authTokenState } from '../state/authAtom';

export const useAuthToken = () => {
    return useRecoilValue(authTokenState);
};