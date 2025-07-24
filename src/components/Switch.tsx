import React, { FC, useState } from 'react';
import './styles/switch.css';

interface SwitchProps {
    onChange: (checked: boolean) => void;
    checked?: boolean;
}

const Switch: FC<SwitchProps> = ({ checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    return (
        <label className="switch">
            <input type="checkbox" onChange={e => {
                onChange(e.target.checked);
                setIsChecked(e.target.checked);
                }} checked={isChecked}/>
            <span className="slider round"></span>
        </label>
    )
}

export default Switch;