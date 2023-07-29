import { useState, useEffect } from 'react';
import Image from 'next/image'
import { AiOutlineSearch } from 'react-icons/ai';
import StockQuoteList from '@/components/StockQuoteList';
import QuoteSearch from '@/components/QuoteSearch';
import Spinner from '@/components/Spinner';
import NewsList from '@/components/NewsList';

type HomeProps = {
  user: any
}

export default function Home({ user }: HomeProps) {

  const [ stocks, setStocks ] = useState([])
  const [ news, setNews ] = useState([])
  const [ isLoadingStocks, setIsLoadingStocks ] = useState(false)
  const [ isLoadingNews, setIsLoadingNews ] = useState(false)
  const [ isLoadingSearch, setIsLoadingSearch ] = useState(false)

  useEffect(() => {
    if(user) {
      loadStocks()
      loadNews()
    }
    else location.reload()
  }, [user])

  const loadStocks = () => {
    setIsLoadingStocks(true)
    let userStockList = []
    // Get updated list of user stocks
    fetch('/api/stocks/getStockList').then((res) => res.json()).then((data) => {
      if(data.stocks.length)
        userStockList = [ ...data.stocks ]
      else
        userStockList = ['SPY', 'AAPL', 'GOOG', 'RIVN', 'MSFT']
        fetch('/api/stocks/quotes?symbols=' + userStockList.join(',')).then((res) => res.json()).then((data) => {
          setStocks((_): any => data)
          setIsLoadingStocks(false)
        })
    })
  }

  const loadNews = () => {
    setIsLoadingNews(true)
    fetch('/api/stocks/news').then((res) => res.json()).then((data) => {
      setNews((_): any => [ ...data ])
      setIsLoadingNews(false)
    })
  }

  const search = (query: string) => {
    setIsLoadingSearch(true)
    fetch(`/api/stocks/search?query=${query}`).then((res) => res.json()).then((data) => {
      console.log(data.results)
      fetch(`/api/stocks/quotes?symbols=${data.results}`).then((res) => res.json()).then((r) => {
        setStocks((old): any => r)
        setIsLoadingSearch(false)
      })
    })
  } 

  return (
    <div id="home-wrapper">
      <header id="home-header">
        <div id="home-header-left">
          <Image src={'/logo1.png'} width='50' height='50' alt='logo' />&nbsp;<h1>STOCKS</h1>&nbsp; <span>ethanshealey.com</span>
        </div>
      </header>
      <div id="home-body">
        <div id="stock-list">
          <h1 className='symbol-header'>Symbols</h1>
          <QuoteSearch search={search} loadDefault={loadStocks} />
          {
            isLoadingStocks || isLoadingSearch ? <div id='home-spinner'><Spinner /></div> : <StockQuoteList stocks={stocks} userStocks={user?.stocks} />
          }
        </div>
        <div id="news">
          <h1 className='news-header'>
            News
          </h1>
          {
            isLoadingNews ?  <div id='news-spinner'><Spinner /></div> : <NewsList news={news} />
          }
        </div>
      </div>
      <footer id="home-footer">&copy; ethanshealey.com { new Date().getFullYear() }</footer>
    </div>
  )
}
