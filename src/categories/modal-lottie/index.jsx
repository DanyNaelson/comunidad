import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie'

const ModalLottie = ({ item }) => {
    const [animationData, setAnimationData] = useState(null)

    useEffect(() => {
        fetch(item.lottie)
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.log('error', error.message))
    }, [])

    return (
        <>
            {animationData &&
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData,
                        rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice"
                        }
                    }}
                />
            }
        </>
    )
}

export default ModalLottie