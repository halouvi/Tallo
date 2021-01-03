import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { getRate, getTradeVolume, getMarketPrice, } from '../../store/bitcoin/BitcoinActions'

export const Stats = () => {
  const { bitcoinRate, tradeVolume, marketPrice } = useSelector(state => state.bitcoin)
  const dispacth = useDispatch()
  useEffect(() => {
    dispacth(getRate())
    dispacth(getTradeVolume())
    dispacth(getMarketPrice())
  },[dispacth])
  return (
    <main className="main-grid">
      <div className="container grid-col-c flex col ac jc">
        <span>{bitcoinRate}</span>
        <div className="flex col acjb">
          <span>{tradeVolume.desc}</span>
          <Sparklines data={tradeVolume.data}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </div>
        <div className="flex col acjb">
          <span>{marketPrice.desc}</span>
          <Sparklines data={marketPrice.data}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </div>
      </div>
    </main>
  )
}
