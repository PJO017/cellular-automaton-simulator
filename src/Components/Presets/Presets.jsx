import React from 'react'
import { Modal } from '../Modal/Modal'
import { presetsData } from './presetsData'
import './Presets.scss'


export const Presets = props => {
    const { isOpen, setIsOpen, loadConfig } = props
    return (
            <Modal
                width="60%"
                height="90%"
                open={isOpen}
                onClose={() => setIsOpen(false)}>
                    <h2 style={{ fontSize: 35}}>Presets</h2>
                    <div className='preset-list'>
                        {presetsData.map((preset) => (
                            <div key={preset.id} className="preset-container">
                                <span className="title">{preset.name}</span>
                                <span className="desc">{preset.desc}</span>
                                <div onClick={() => {
                                                loadConfig(preset.config)
                                                setIsOpen(false)
                                            }} className="img_container">
                                    <div className="img_border">
                                        <img 
                                            
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
