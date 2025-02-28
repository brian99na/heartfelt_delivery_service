import React from 'react'

interface usePageLeaveProps {
    isLeaving: boolean;
}

// Disables display after 1 second from recieving an updated boolean
export const usePageLeave = ({isLeaving}: usePageLeaveProps): boolean => {
    const [isExited, setIsExited] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isLeaving) {
            setTimeout(() => {
                setIsExited(true)
            }, 1000)
        }
    }, [isLeaving])

    return isExited
}