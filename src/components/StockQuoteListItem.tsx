import { useState } from 'react'
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

type StockQuoteListItemProps = {
    stock: any,
    isInList: boolean,
    noBottomBorder: boolean
}

const StockQuoteListItem = ({ stock, isInList, noBottomBorder }: StockQuoteListItemProps) => {

    const [ isChecked, setIsChecked ] = useState(isInList)
    const [ changeType, setChangeType ] = useState(true)

    const addStock = () => {
        setIsChecked(c => true)
        fetch(`/api/stocks/add?stock=${stock?.symbol}`).then((res) => res.json()).then((data) => {
            toast.success(`Added ${stock?.symbol} to your following list`, {
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
        })
    }

    const removeStock = () => {
        setIsChecked(c => false)
        fetch(`/api/stocks/remove?stock=${stock?.symbol}`).then((res) => res.json()).then((data) => {
            toast.success(`Removed ${stock?.symbol} from your following list`, {
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
        })
    }

  return (
    <div className="stock-quote-list-item" style={{ borderBottom: noBottomBorder ? 'none' : '' }}>
        <div className='addRemoveBtn'>
            {
                !isChecked ?
                <div className='add-btn' onClick={addStock}><AiOutlinePlus /></div> :
                <div className='remove-btn' onClick={removeStock}><AiOutlineCheck /></div>
            }
           
        </div>
        <Link className='stock-quote-list-item-link' href={`/stocks/${stock?.symbol}`}>
            <div className='stock-quote-list-item-left'>
                <h1>{stock?.symbol}</h1>
                <p>{stock?.longName}</p>
            </div>
            <div className='stock-quote-list-item-right'>
                <div className='stock-quote-price'>
                    <h3 className='stock-quote-list-item-price'>{stock?.price.toFixed(2)}</h3>
                    <p className={stock?.change > 0 ? 'up' : 'down'} onClick={() => setChangeType(t => !t)}>{changeType ? stock?.change.toFixed(2) : stock?.changePercent.toFixed(2) + '%'}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default StockQuoteListItem