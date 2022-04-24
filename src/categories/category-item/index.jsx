import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie';

const CategoryItem = ({ item, setItem, setOpen, index, setCategoryIndex }) => {
    const [animationData, setAnimationData] = useState(null)

    useEffect(() => {
        fetch(item.lottiFile)
            .then(response => response.json())
            .then(data => setAnimationData(data))
            .catch(error => console.log('error', error.message))
    }, [])

    const openModal = () => {
        setCategoryIndex(index)
        setItem(item)
        setOpen(true)
    }

    return (
        <div className='item-container' style={{ cursor: 'pointer' }} onClick={openModal}>
            <Lottie
                style={{ borderRadius: 10, pointerEvents: 'none' }}
                options={{
                    loop: false,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice"
                    }
                }}
                height={260}
                width={220}
            />
            <p className='item-text'>
                {item.text}
            </p>
        </div>
    )
}

export default CategoryItem