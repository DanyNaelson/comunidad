import { getToken } from "../utils/localstorage"

const baseURL = 'https://dev.jefa.tech/jefa-gateway'
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

const api = async ({ endpoint, method = 'GET', body, headers: {} }) => {
    const token = getToken()

    if (token !== '') {
        headers = {
            ...headers,
            token
        }
    }

    const options = {
        method,
        headers
    }

    if (body) {
        options.body = body
    }

    try {
        const response = await fetch(`${baseURL}${endpoint}`, options)
        const result = await response.json()

        if (!response.ok) {
            throw {
                statusCode: response.status,
                ...result,
                headers: response.headers
            }
        }

        return {
            statusCode: response.status,
            ...result,
            headers: response.headers
        }
    } catch {
        throw error
    }
}

const get = ({ endpoint, headers: {} }) => {
    return api({
        endpoint,
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'GET'
    })
}

const post = ({ endpoint, body, headers: {} }) => {
    return api({
        endpoint,
        body: body ? JSON.stringify(body) : {},
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'POST'
    })
}

const put = ({ endpoint, body, headers: {} }) => {
    return api({
        endpoint,
        body: JSON.stringify(body),
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'PUT'
    })
}

const patch = ({ endpoint, body, headers: {} }) => {
    return api({
        endpoint,
        body: JSON.stringify(body),
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'PATCH'
    })
}

const remove = ({ endpoint, body, headers: {} }) => {
    return api({
        endpoint,
        body: JSON.stringify(body),
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'DELETE'
    })
}

export { get, post, put, patch, remove }

export default api