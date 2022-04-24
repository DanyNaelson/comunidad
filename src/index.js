import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CategoriesSection from './categories/categories-section'
import './index.css'
import './index.less'
import PollSection from './poll/poll-section'
import { BASE_URL, DEFAULT_HEADERS } from './utils/constants'
import { getToken, setToken } from './utils/localstorage'

class App extends Component {
    componentDidMount() {
        const token = getToken()

        if(!token){
            const headers = { ...DEFAULT_HEADERS }

            fetch(`${BASE_URL}/v1/login-anonymous`, { headers, method: 'POST' })
                .then(response => response.json())
                .then(result => {
                    const { data: { tokens: { accessToken } } } = result

                    accessToken && setToken(accessToken)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        return (
            <div id='community-container'>
                <div id='comunnity-sections'>
                    <PollSection />
                    <CategoriesSection />
                </div>
            </div>
        )
    }
}

ReactDOM.render(React.createElement(App, {}, null),
    document.getElementById('react-target')
);