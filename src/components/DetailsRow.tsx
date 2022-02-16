import React from 'react';

interface Props {
    data: {
        currency: string;
        amount: number;
        unit: number;
    }
}

const DetailsRow: React.FC<Props> = ({data}) => {
    const {currency, amount} = data;
    return (
        <>
            <tr>
                <td>{currency}</td>
                <td>$ {Number((amount).toFixed(2))}</td>
            </tr>
        </>
    );
};

export default DetailsRow;