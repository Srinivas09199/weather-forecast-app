import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CitiesTable from './components/CitiesTable'
import WeatherPage from './components/WeatherPage'

function App() {


  return (
    <>
       <div>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<CitiesTable/>}/>
        <Route path='/weather/:cityName' element={<WeatherPage/>}/>
        </Routes>
        </BrowserRouter>
       </div>
    </>
  )
}

export default App
