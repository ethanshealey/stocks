import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import StockQuoteList from '@/components/StockQuoteList';
import QuoteSearch from '@/components/QuoteSearch';
import Spinner from '@/components/Spinner';
import NewsList from '@/components/NewsList';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

type HomeProps = {
  user: any
}

export default function Home({ user }: HomeProps) {

  const router = useRouter()

  const [ MONTHLYQUOTAERROR, setMONTHLYQUOTAERROR ] = useState(false)
  const [ stocks, setStocks ] = useState<any[]>()
  const [ news, setNews ] = useState<any[]>([])
  const [ isLoadingStocks, setIsLoadingStocks ] = useState<boolean>(false)
  const [ isLoadingNews, setIsLoadingNews ] = useState<boolean>(false)
  const [ isLoadingSearch, setIsLoadingSearch ] = useState<boolean>(false)

  useEffect(() => {
    console.log(user)
    if(user) {
        loadStocks()
        loadNews()
    }
  }, [user, router])

  const loadStocks = () => {
    setIsLoadingStocks(true)
    let userStockList: any[] = []
    // Get updated list of user stocks
    fetch('/api/stocks/getStockList').then((res) => res.json()).then((data) => {
      if(data.stocks.length)
        userStockList = [ ...data.stocks ]
      else 
        userStockList = ['SPY', 'AAPL', 'GOOG', 'RIVN', 'MSFT']

      fetch('/api/stocks/quotes?symbols=' + userStockList.join(',')).then((res) => res.json()).then((data) => {
        if(data?.message === 'Exceeded monthly quota, please come back later :(') {
          setMONTHLYQUOTAERROR(true)
          setIsLoadingStocks(false)
          toast.error(data?.message, {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          })
        }
        else {
          setStocks((_: any) => data)
          setIsLoadingStocks(false)
        }
      })
    })
  }

  const loadNews = () => {
    setIsLoadingNews(true)
    fetch('/api/stocks/news').then((res) => res.json()).then((data) => {
      setNews((_: any) => [ ...data ])
      setIsLoadingNews(false)
    })
  }

  const search = (query: string) => {
    setIsLoadingSearch(true)
    fetch(`/api/stocks/search?query=${query}`).then((res) => res.json()).then((data) => {
      console.log(data.results)
      fetch(`/api/stocks/quotes?symbols=${data.results}`).then((res) => res.json()).then((r) => {
        setStocks((_: any) => r)
        setIsLoadingSearch(false)
      })
    })
  } 

  return (
    <div id="home-wrapper">
      <Header />
      <div id="home-body">
        <div id="stock-list">
          <h1 className='symbol-header'>Symbols</h1>
          <QuoteSearch search={search} loadDefault={loadStocks} />
          {
            isLoadingStocks || isLoadingSearch  ? MONTHLYQUOTAERROR ? <></> :
              <div id='home-spinner'><Spinner /></div> : <StockQuoteList stocks={stocks} userStocks={user?.stocks} />
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
