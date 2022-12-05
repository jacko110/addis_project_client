import { useState } from 'react'
import './App.css'

import Table from './components/Table'
import Button from './components/Button'
import Form from './components/Form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { removeAlert } from './slices/alertSlice'
import Alerts from './components/Alerts'


function App() {
  return (
    <>
      <Alerts></Alerts>
      <div className="container">
          <Form></Form>
          <Table></Table>
      </div>

    </>
  )
}

export default App
