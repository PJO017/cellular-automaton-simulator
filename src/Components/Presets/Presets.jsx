import React from 'react'
import { Modal } from '../Modal/Modal'
import {presetsData } from './presets'
import './Presets.scss'


export const Presets = props => {
    const { isOpen, setIsOpen, loadConfig } = props
    return (
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}>
                    <h2 style={{ fontSize: 35}}>Presets</h2>
                    <div className='preset-list'>
                        {presetsData.map((preset) => (
                            <div key={preset.id} className="preset-container">
                                <span>{preset.name}</span>
                                <div className="img_container">
                                    <div className="img_border">
                                        <img 
                                            onClick={() => {
                                                loadConfig(preset.config)
                                                setIsOpen(false)
                                            }}
                                            src={`assets/snapshots/${preset.img}`} 
                                            alt='preset_img'/>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </Modal>

    )
}
