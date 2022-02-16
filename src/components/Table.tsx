import React from 'react';
import TableRow from './TableRow';
import {motion} from 'framer-motion'
import {appearVariant} from '../animations/variants'
import { RowInfo } from '../interfaces/interfaces';

interface Props {
    money: {
        _id: string,
        currency: string,
        unit: number,
        amount: number
    }[];
    setModalUpdateMoney: React.Dispatch<React.SetStateAction<boolean>>;
    setRowInformation: React.Dispatch<React.SetStateAction<RowInfo>>;
}

const Table: React.FC<Props> = ({money, setModalUpdateMoney, setRowInformation}) => {
    return (
        <div className='table_container'>
            <motion.table
                variants={appearVariant}
                initial='hide'
                animate='visible'
            >
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {money[0].unit === 0? null : money.map(money => 
                        <TableRow 
                            key={money['_id']} 
                            money={money} 
                            setModalUpdateMoney={setModalUpdateMoney}
                            setRowInformation={setRowInformation}
                        />
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td colSpan={2}>$ {money.reduce((acumulator, current) => Number((acumulator + current.amount).toFixed(2)), 0)}</td>
                    </tr>
                </tfoot>
            </motion.table>
        </div>
    );
};

export default Table;