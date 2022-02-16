import { useEffect, useState } from 'react';
import Table from './components/Table';
import Chart from './components/Chart';
import Transaction from './components/Transaction';
import ModalChangeDetails from './components/ModalChangeDetails';
import ModalMessage from './components/ModalMessage';
import ModalPlusMinus from './components/ModalPlusMinus';
import ThemeButton from './components/ThemeButton';
import {AnimatePresence} from 'framer-motion'
import './App.css';
import { Money, Details, RowInfo } from './interfaces/interfaces';

const initialMoney = [
  {
    _id: '',
    currency: '',
    unit: 0,
    amount: 0
  }
]

const initialRowInfo = {
  currency: '',
  amount: 0,
  op: ''
}

function App() {
  const [, setTransaction] = useState<{price:string; paid: string} | string>('');
  const [money, setMoney] = useState<Money[]>(initialMoney);
  const [changeDetails, setChangeDetails] = useState<Details>({success: false});
  const [rowInformation, setRowInformation] = useState<RowInfo>(initialRowInfo);
  const [msg, setMsg] = useState('');
  const [forceRender, setForceRender] = useState(1);
  const [modalChange, setModalChange] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalUpdateMoney, setModalUpdateMoney] = useState(false);
  const [theme, setTheme] = useState('ligth');

  //fetch data to render the money list when the component did mount
  useEffect(() => {
    const url = 'https://ChashRegister.joaquinsanchez9.repl.co/api/v1/transactions'

    fetch(url)
      .then(res => res.json())
      .then(res => {
        const {success} = res;
        
        if(!success){
          setMsg('An error ocurred. Try again')
          setModalMessage(true)
          return setTimeout(() => {setModalMessage(false)}, 3500)
        }

        setMoney(res.data)
      })
      .catch(() => {
        setMsg('An error ocurred. Try again')
        setModalMessage(true)
        setTimeout(() => {setModalMessage(false)}, 3500)
      })
  }, [])

  //to update the chart and the table when add/subtract money or a transaction ocurred
  useEffect(() => {
    if(forceRender === 1) return;
    /*why 1? Becasuse forceRender starts at 1 and when any of the above actions take place, 
    forceRender it's set to prev + 1 to ensure that its value will change, and as the state changed, so the table
    and the chart */

    const url = 'https://ChashRegister.joaquinsanchez9.repl.co/api/v1/transactions'

    fetch(url)
      .then(res => res.json())
      .then(res => {
        const {success} = res;

        if(!success){
          setMsg('An error ocurred. Try again')
          setModalMessage(true)
          return setTimeout(() => {setModalMessage(false)}, 3500)
        }

        setMoney(res.data)
      })
      .catch(() => {
        setMsg('An error ocurred. Try again')
        setModalMessage(true)
        setTimeout(() => {setModalMessage(false)}, 3500)
      })

  },[forceRender])

  return (
    <div className='app' data-theme={theme}>
      <h1>Cash register App!</h1>
      <ThemeButton 
        theme={theme}
        setTheme={setTheme}
      />
      <div className='main_container'>
        <div className='main_left-side'>
          <Transaction 
            setTransaction={setTransaction}
            setChangeDetails={setChangeDetails}
            money={money}
            setModalMessage={setModalMessage}
            setMsg={setMsg}
            setModalChange={setModalChange}
          />
          <Chart 
            money={money}
          />
        </div>
        <Table 
          money={money}
          setModalUpdateMoney={setModalUpdateMoney}
          setRowInformation={setRowInformation}
        /> 
      </div>
      <AnimatePresence>
        {modalChange && 
          <ModalChangeDetails 
            changeDetails={changeDetails}
            setModalChange={setModalChange}
            setForceRender={setForceRender}
            setMsg={setMsg}
            setModalMessage={setModalMessage}
          />
        }
      </AnimatePresence>
      <AnimatePresence>
        {modalMessage && 
          <ModalMessage 
            msg={msg}
          />
        }
      </AnimatePresence>
      <AnimatePresence>
        {modalUpdateMoney && 
            <ModalPlusMinus 
              rowInformation={rowInformation}
              setModalUpdateMoney={setModalUpdateMoney}
              setMsg={setMsg}
              setModalMessage={setModalMessage}
              money={money}
              setForceRender={setForceRender}
            />
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
