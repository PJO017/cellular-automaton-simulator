import React, { useState, useEffect } from 'react'
import './App.scss';
import { Engine } from '../Engine/Engine'
import { Modal } from '../Modal/Modal'



export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // setIsModalOpen(true)
  }, [])

  return (
    <>
      <div className="App">
        <Engine/>
        <Modal 
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}>
              Welcome To Reactive Cellular Atomata!

        </Modal>
      </div>
    </>
  )
}
