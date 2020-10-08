import axios from 'axios'
import { USER_SERVER, PRODUCT_SERVER } from '../hoc/Config.js'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_FROM_DETAIL,
    ADD_TO_CART_FROM_CART_PAGE,
    SUBTRACT_CART_ITEM_FROM_DETAIL,
    SUBTRACT_CART_ITEM_FROM_CART_PAGE,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_FROM_DETAIL,
    REMOVE_CART_ITEM_FROM_CART_PAGE,
    ADD_ENVIO,
    DARK_MODE
} from './types'

export const changeMode = (modo) => {
    const request = modo
    console.log("CAMBIANDO A", modo)
    return {
        type: DARK_MODE,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    console.log(dataToSubmit);
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(async (response) => {
            const token = await response.data.token
            document.cookie = `token = ${token}`
            return response.data
        })
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.post(`${USER_SERVER}/auth`, {token:document.cookie})
        .then(response => response.data)
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.post(`${USER_SERVER}/logout`, {token:document.cookie})
        .then(response => response.data)
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCartFromDetail(_id) {
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`, {token:document.cookie})
        .then(response => response.data)
    return {
        type: ADD_TO_CART_FROM_DETAIL,
        payload: request
    }
}

export function addToCartFromCartPage(_id) {
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`, {token:document.cookie})
        .then(response => response.data)
    return {
        type: ADD_TO_CART_FROM_CART_PAGE,
        payload: request
    }
}

export function addEnvio(money) {                         // mía
    const request = axios.post(`${USER_SERVER}/addEnvio?money=${money}`, {token:document.cookie})
        .then(response => response.data)
    return {
        type: ADD_ENVIO,
        payload: request
    }
}

export function subtractCartItemFromDetail(_id) {              // mía
    const request = axios.post(`${USER_SERVER}/subtractOneToCart?productId=${_id}`, {token:document.cookie})
        .then(response => response.data)
    return {
        type: SUBTRACT_CART_ITEM_FROM_DETAIL,
        payload: request
    }
}


export function subtractCartItemFromCartPage(id) {
    const request = axios.post(`${USER_SERVER}/subtractOneToCart?productId=${id}`, {token:document.cookie})
        .then(response => response.data)
    return {
        type: SUBTRACT_CART_ITEM_FROM_CART_PAGE,
        payload: request
    }
}


export function removeCartItemFromDetail(id) {
    const request = axios.post(`${USER_SERVER}/removeFromCart?_id=${id}`, {token:document.cookie})
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity
                    }
                })
            })
            return response.data;
        })
    return {
        type: REMOVE_CART_ITEM_FROM_DETAIL,
        payload: request
    }
}


export function removeCartItemFromCartPage(id) {
    const request = axios.post(`${USER_SERVER}/removeFromCart?_id=${id}`, {token:document.cookie})
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity
                    }
                })
            })
            return response.data
        })
    return {
        type: REMOVE_CART_ITEM_FROM_CART_PAGE,
        payload: request
    }
}


export function getCartItems(cartItems, userCart) {
    const request = axios.get(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity
                    }
                })
            })
            return response.data
        })
    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}
