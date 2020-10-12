import React, { useEffect } from 'react'
import { auth } from '../_actions/user_actions'
import { useSelector, useDispatch } from "react-redux"


export default function (ComposedClass, reload, adminRoute = null, props2) {

    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user)
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth()).then(response => {
                if (!response.payload.isAuth) {
                    if (reload) props.history.push('/login')
                } else {
                    if (adminRoute && !response.payload.isAdmin) props.history.push('/')
                }
            })
        }, [dispatch, props.history])


        return (
            <ComposedClass
                {...props}
                user={user}
                ColorPrimary={props2.ColorPrimary}
                ColorSecundary={props2.ColorSecundary}
                ColorFont={props2.ColorFont}
                mobile={props2.mobile}
            />
        )
    }
    
    return AuthenticationCheck
}
