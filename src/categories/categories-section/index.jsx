import React, { useEffect, useState } from 'react'
import { Carousel, Modal } from 'rsuite'
import 'rsuite/Modal/styles/index.less';
import 'rsuite/Carousel/styles/index.less';
import { getToken } from '../../utils/localstorage'
import CategoryItem from '../category-item'
import './../index.css'
import ModalLottie from '../modal-lottie';
import Infographics from '../infographics';
const lottie1 = 'https://jefa-community.s3.us-east-2.amazonaws.com/step1.json'
const lottie2 = 'https://jefa-community.s3.us-east-2.amazonaws.com/step2.json'
const lottie3 = 'https://jefa-community.s3.us-east-2.amazonaws.com/step3.json'
const lottie4 = 'https://jefa-community.s3.us-east-2.amazonaws.com/step4.json'
const lottie5 = 'https://jefa-community.s3.us-east-2.amazonaws.com/step5.json'
const lottie6 = 'https://jefa-community.s3.us-east-2.amazonaws.com/step6.json'

const fakeCategories = [
    {
        title: 'Entrepreneurship',
        items: [
            {
                lottiFile: 'https://jefa-community.s3.us-east-2.amazonaws.com/step1.json',
                text: '5 pasos para negociar el salario que te mereces',
                lottie: lottie1
            },
            {
                lottiFile: 'https://jefa-community.s3.us-east-2.amazonaws.com/step5.json',
                text: 'Como generar dinero desde casa',
                lottie: lottie2
            },
            {
                lottiFile: 'https://jefa-community.s3.us-east-2.amazonaws.com/step1.json',
                text: '5 pasos para negociar el salario que te mereces - 2',
                lottie: lottie3
            },
            {
                lottiFile: 'https://jefa-community.s3.us-east-2.amazonaws.com/step5.json',
                text: 'Como generar dinero desde casa - 2',
                lottie: lottie4
            }
        ]
    },
    {
        title: 'Emprendimiento',
        items: [
            {
                lottiFile: 'https://jefa-community.s3.us-east-2.amazonaws.com/step1.json',
                text: '5 pasos para negociar el salario que te mereces',
                lottie: lottie5
            },
            {
                lottiFile: 'https://jefa-community.s3.us-east-2.amazonaws.com/step5.json',
                text: 'Como generar dinero desde casa',
                lottie: lottie6
            }
        ]
    }
]

const CategoriesSection = () => {
    const [categories, setCategories] = useState(fakeCategories)
    const [categoryIndex, setCategoryIndex] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [itemSelected, setItem] = useState(null);

    useEffect(() => {
        const token = getToken()

        if (token) {
            // const headers = new Headers();
            // headers.append("Authorization", "Bearer" + token)
            // setLoading(true)

            // fetch(`${BASE_URL}/v1/api/statistics/polls?source=HUB&frequency=DAILY`, { headers, method: 'GET' })
            //     .then(response => response.text())
            //     .then(result => {
            //         console.log(result)
            //     })
            //     .catch(error => {
            //         console.log(error.message);
            //     })
            //     .finally(() => setLoading(false))
        }
    }, [])

    return (
        <div style={{ margin: '0px 30px' }}>
            <div id='categories-section'>
                {categories.map((category, indexMain) => (
                    <div className='category' key={indexMain}>
                        <p className='category-title'>
                            {category.title}
                        </p>
                        <div className='items-container'>
                            {category.items.map((item, index) => (
                                <CategoryItem key={index} index={indexMain} item={item} setCategoryIndex={setCategoryIndex} setItem={setItem} setOpen={setOpen} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                {itemSelected && 
                    <Modal.Body>
                        <Infographics items={fakeCategories[categoryIndex].items} setOpen={setOpen} />
                    </Modal.Body>
                }
            </Modal>
        </div>
    )
}

export default CategoriesSection