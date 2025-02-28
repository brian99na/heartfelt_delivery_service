import { defaultUser } from '@/app/utils/constants';
import { User } from '@/app/utils/types';
import React from 'react'

interface WindowContextProps {
    user: User;
    allowAudio: boolean;
    setAllowAudio: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WindowContext = React.createContext<WindowContextProps>({
    user: defaultUser,
    allowAudio: false,
    setAllowAudio: () => null,
})