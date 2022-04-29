import React, { useEffect, useState } from 'react'
import { Modal } from 'rsuite'
import 'rsuite/Modal/styles/index.less';
import { getToken } from '../../utils/localstorage'
import CategoryItem from '../category-item'
import './../index.css'
import Infographics from '../infographics';
import { fakeCategories } from '../../utils/categories';
import { selectLanguage } from '../../utils';
import { useTranslation } from 'react-i18next';

const CategoriesSection = () => {
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState(fakeCategories)
    const [categoryIndex, setCategoryIndex] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [itemSelected, setItem] = useState(null);

    useEffect(() => {
        const lang = selectLanguage()
        lang === "en" && i18n.changeLanguage(lang)

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
                            {t(`category.${category.title}`)}
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
                        <Infographics items={itemSelected.items} setOpen={setOpen} />
                    </Modal.Body>
                }
            </Modal>
        </div>
    )
}

export default CategoriesSection