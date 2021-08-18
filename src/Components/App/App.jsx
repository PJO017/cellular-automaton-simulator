import React, { useState, useEffect } from 'react'
import './App.scss';
import { Engine } from '../Engine/Engine'
import { Modal } from '../Modal/Modal'



export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true)
  }, [])

  return (
    <>
      <div className="App">
        <Engine/>
        <Modal
            width="40%"
            height="40%" 
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}>
              <section className="modal-content">
                <h1 className="title">Welcome To Cellular Automaton Simulator!</h1>
                <div className="instructions">
                  Choose a configuration from the presets list, randomize cells of
                    the grid or make your own custom pattern.
                  <p>Then choose from one of the seven rules and press start to begin simulating generations!</p>
                </div>
              </section>
        </Modal>
      </div>
    </>
  )
}
