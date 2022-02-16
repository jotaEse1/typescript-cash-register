export interface Money {
  _id: string,
  currency: string,
  unit: number,
  amount: number
}

export interface Details {
    success: boolean;
    data?: {currency: string; amount: number; unit: number;}[];
    message?: string; 
    moneyCopy?: {
      _id: string,
      currency: string,
      unit: number,
      amount: number
    }[] | string;
}

export interface RowInfo {
    currency: string;
    amount: number;
    op: string;
}
