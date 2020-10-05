import * as types from '../_actions/types'


export default function (state = {}, action) {
    switch (action.type) {
        case types.REGISTER_USER:
            return { ...state, register: action.payload }
        case types.LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case types.AUTH_USER:
            return { ...state, userData: action.payload }
        case types.LOGOUT_USER:
            return { ...state }
        case types.ADD_TO_CART_FROM_DETAIL:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        case types.ADD_TO_CART_FROM_CART_PAGE:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        case types.ADD_ENVIO:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        case types.SUBTRACT_CART_ITEM_FROM_DETAIL:
            return {
                ...state, userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        case types.SUBTRACT_CART_ITEM_FROM_CART_PAGE:
            return {
                ...state,

                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        case types.GET_CART_ITEMS_USER:
            return {
                ...state, cartDetail: action.payload
            }
        case types.REMOVE_CART_ITEM_FROM_DETAIL:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case types.REMOVE_CART_ITEM_FROM_CART_PAGE:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case types.ON_SUCCESS_BUY_USER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                },
                cartDetail: action.payload.cartDetail
            }

        default:
            return state;
    }
}