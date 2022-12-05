import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {  Alert } from '../slices/alertSlice'
import { removeAlert } from '../slices/alertSlice'
import styled from 'styled-components'

const AlertBox = styled.div`
    padding: 20px;
    background-color: #f44336; /* Red */
    color: white;
    margin-bottom: 15px;
`
const CloseButton = styled.span`
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        color: black;
    }
`

export default function Alerts() {

    const alerts = useSelector((state: RootState) => state.alertReducer)
    const dispatch = useDispatch()
    
    useEffect((): void => {
        alerts.map((alert: Alert) => {
            setTimeout(() => {
                dispatch(removeAlert(alert))
            }, 5000)
        })
    }, [alerts])


    return <div className="alerts">
        {
            alerts.map(
                (alert, idx) => <div key={idx}>
                    <AlertBox>
                        <CloseButton onClick={() => dispatch(removeAlert(alert))}>&times;</CloseButton>
                        {alert.message}
                    </AlertBox>
                </div>
            )
        }
    </div>
}