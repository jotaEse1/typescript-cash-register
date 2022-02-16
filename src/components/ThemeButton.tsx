import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons'

interface Props {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeButton: React.FC<Props> = ({theme, setTheme}) => {
    return (
        <>
            <button
                className='change-theme'
                onClick={() => setTheme(prev => prev === 'ligth'? 'dark' : 'ligth')}
            >
                {theme === 'ligth'? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} /> }
            </button>
        </>
    );
};

export default ThemeButton;