import React, { useState } from 'react';
import { updateAmount } from '../utils/UpdateAmount';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import './ModalPlusMinus.css'
import {motion} from 'framer-motion'
import {modalBackgroundVariant, modalVariant} from '../animations/variants'
import {Money, RowInfo} from '../interfaces/interfaces'

interface Props {
    rowInformation: RowInfo;
    setModalUpdateMoney: React.Dispatch<React.SetStateAction<boolean>>;
    setMsg: React.Dispatch<React.SetStateAction<string>>;
    setModalMessage: React.Dispatch<React.SetStateAction<boolean>>;
    money: Money[];
    setForceRender: React.Dispatch<React.SetStateAction<number>>;
}

const ModalPlusMinus: React.FC<Props> = ({rowInformation, setModalUpdateMoney, setMsg, setModalMessage, money, setForceRender}) => {
    const [form, setForm] = useState({editAmount: 'Amount'});
    const {currency, amount, op} = rowInformation;

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {editAmount} = form,
            decimals = [...editAmount].slice([...editAmount].indexOf('.'));
            
        if(!Number(editAmount)){
            setMsg(`That's not money!`)
            setModalMessage(true)
            return setTimeout(() => setModalMessage(false), 3500)
        }
        if(decimals.length > 3){
            setMsg('Too much decimals!')
            setModalMessage(true)
            return setTimeout(() => setModalMessage(false), 3500)
        }
        if(op === 'Retire'){
            if(Number(editAmount) > amount){
                setMsg('Exceeds initial amount')
                setModalMessage(true)
                return setTimeout(() => setModalMessage(false), 3500)
            }

            //subtract
            const result = updateAmount(op, editAmount, currency, money),
                url = 'https://ChashRegister.joaquinsanchez9.repl.co/api/v1/transactions',
                options = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(result)
                }
            
            //update money in dataBase
            setModalUpdateMoney(false)
            await fetch(url, options)
                .catch(err => console.log(err))
            return setForceRender(prev => prev + 1)

        }

        //add
        const result = updateAmount(op, editAmount, currency, money),
            url = 'https://ChashRegister.joaquinsanchez9.repl.co/api/v1/transactions',
            options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(result)
            }

        //update money in dataBase
        setModalUpdateMoney(false)
        await fetch(url, options)
            .catch(err => console.log(err))
        return setForceRender(prev => prev + 1)
    }

    return (
        <motion.div 
            className='plus-minus_container'
            variants={modalBackgroundVariant}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <motion.div 
                className='plus-minus'
                variants={modalVariant}
            >
                <h4>{op} money!</h4>
                <form onSubmit={handleSubmit}>
                    <input
                        type='number'
                        name='editAmount'
                        step='.01'
                        min='0'
                        value={form.editAmount}
                        placeholder={currency}
                        onChange={handleForm}
                    />
                    <div>
                        <button 
                            type='button'
                            onClick={() => setModalUpdateMoney(prev => !prev)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <button type='submit'>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ModalPlusMinus;