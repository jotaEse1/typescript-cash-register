import React, { useState } from 'react';
import {operation} from '../utils/Operation'
import {motion} from 'framer-motion'
import {appearVariant, buttonVariant} from '../animations/variants'
import { Details } from '../interfaces/interfaces';

interface Props {
    money: {
        _id: string,
        currency: string,
        unit: number,
        amount: number
    }[];
    setTransaction: React.Dispatch<React.SetStateAction<string | {price: string; paid: string;}>>;
    setChangeDetails: React.Dispatch<React.SetStateAction<Details>>;
    setModalMessage: React.Dispatch<React.SetStateAction<boolean>>;
    setMsg: React.Dispatch<React.SetStateAction<string>>;
    setModalChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
    price: '',
    paid: ''
}

const Transaction: React.FC<Props> = ({setTransaction, setChangeDetails, money, setModalMessage, setMsg, setModalChange}) => {
    const [form, setForm] = useState(initialState);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const {paid, price} = form,
            decimalsPaid = [...paid].slice([...paid].indexOf('.')),
            decimalsPrice = [...price].slice([...price].indexOf('.'));
                
        if(!Number(paid) || !Number(price)){
            setMsg(`That's not money!`)
            setModalMessage(true)
            return setTimeout(() => setModalMessage(false), 3500)
        }
        if(Number(paid) < Number(price)){
            setMsg(`No need for change!`)
            setModalMessage(true)
            return setTimeout(() => setModalMessage(false), 3500)
        }
        if(decimalsPaid.length > 3 || decimalsPrice.length > 3){
            setMsg(`Too much decimals!`)
            setModalMessage(true)
            return setTimeout(() => setModalMessage(false), 3500)
        } 

        const result = operation(form, money);
        setTransaction(form)

        if(!result){
            setMsg(`An error ocurred`)
            setModalMessage(true)
            return setTimeout(() => setModalMessage(false), 3500)
        }
        if(result.success){
            setModalChange(true)
            setChangeDetails({success: true, data: result.changeDetails, moneyCopy: result.moneyCopy})
        } 
        if(!result.success){
            setModalChange(true)
            setChangeDetails({success: false, message: result.msg})
        } 
        
        setForm(initialState)
    }

    return (
        <motion.div 
            className='transaction'
            variants={appearVariant}
            initial='hide'
            animate='visible'
        >
            <form onSubmit={handleSubmit}>
                <input
                    type='number'
                    name='price'
                    step='.01'
                    min='0'
                    value={form.price}
                    placeholder='Price'
                    onChange={handleForm}
                />
                <input
                    type='number' 
                    name='paid'
                    step='.01'
                    min='0'
                    value={form.paid}
                    placeholder='Amount paid'
                    onChange={handleForm}
                />
                <motion.button
                    type='submit'
                    variants={buttonVariant}
                    whileTap='click'
                    whileHover='hover'
                >Change!</motion.button>
            </form>
        </motion.div>
    );
};

export default Transaction;