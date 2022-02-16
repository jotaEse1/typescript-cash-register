import { Money } from "../interfaces/interfaces";
//inputs --> operation type, edit amount, currency, all money 

const updateAmount = (op: string, amount: string, currency: string, money: Money[]) => {
    const moneyCopy: {
        _id: string,
        currency: string,
        unit: number,
        amount: number
      }[] = JSON.parse(JSON.stringify(money)); // a copy without reference to money

    if(op === 'Retire'){
        moneyCopy.forEach(obj => {if(obj.currency === currency) obj.amount -= Number(amount)})
        return moneyCopy
    }
    if(op === 'Add'){
        moneyCopy.forEach(obj => {if(obj.currency === currency) obj.amount += Number(amount)})
        return moneyCopy
    }
}

export {updateAmount}