import React from 'react'
import StockQuoteListItem from './StockQuoteListItem'

type StockQuoteListProps = {
  stocks: any[],
  userStocks: string[]
}

const StockQuoteList = ({ stocks, userStocks }: StockQuoteListProps) => {
  return (
    <div className='stock-quote-list'>
      {
        stocks?.map((stock, i, row) => (
          <StockQuoteListItem key={stock.symbol} stock={stock} isInList={userStocks?.includes(stock.symbol)} noBottomBorder={i + 1 === row.length} />
        ))
      }
    </div>
  )
}

export default StockQuoteList