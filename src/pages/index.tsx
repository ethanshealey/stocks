import { useState, useEffect } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import StockQuoteList from '@/components/StockQuoteList';
import QuoteSearch from '@/components/QuoteSearch';
import Spinner from '@/components/Spinner';
import NewsList from '@/components/NewsList';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import { db, doc, getDocs, where, query, collection, deleteDoc, addDoc } from '@/firebase'

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
    if(user) {
        loadStocks()
        loadNews()
    }
  }, [user, router])

  const loadStocks = () => {
    setIsLoadingStocks(true)
    if(!user?.stocks?.length) {
      user.stocks = ['SPY', 'AAPL', 'GOOG', 'RIVN', 'MSFT']
    }
    fetch('/api/stocks/quotes?symbols=' + user?.stocks?.join(',')).then((res) => res.json()).then((data) => {
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
        return
      }
      else {
        setStocks((_: any) => data)
        setIsLoadingStocks(false)
      }

    })

  }

  const loadNews = () => {
    setIsLoadingNews(true)
    fetch('/api/stocks/news').then((res) => res.json()).then((data) => {
      setNews((_: any) => [ ...data ])
      setIsLoadingNews(false)
    })
  }

  const searchStocks = (symbols: string) => {
    fetch(`/api/stocks/quotes?symbols=${symbols}`).then((res) => res.json()).then((data) => {
      console.log(data)
      setIsLoadingStocks(false)
      setStocks((_: any) => [ ...data ])
    })
  }

  const search = async (q: string) => {
    /**
     * Step 1: Check if query exists in DB
     *    Step 1a: If it doesnt: Convert query to list of stocks
     *    Step 1b: If it does: Pull list of stocks from DB
     * Step 2: Use YahooFinance search
     * Step 3: Set search results
     */
    setIsLoadingSearch(true)
    const res: any = await getDocs(query(collection(db, 'Search'), where("query", "==", q.toLowerCase())))
    if(res.docs.length) {
      const addedDate = new Date(res.docs[0].data().date.toDate()).getTime()
      const currDate = new Date().getTime()

      const monthInMilliseconds = 2_629_746_000

      if(currDate - addedDate <= monthInMilliseconds) {
        // still valid
        searchStocks(res.docs[0].data().results)
      }
      else {
        // expired
        await deleteDoc(doc(db, "Search", res.docs[0].data().id))

        fetch(`/api/stocks/search-symbols?query=${q}`).then((res) => res.json()).then(async (syms) => {
          const cleanSymbolList = syms.filter((sym: any) => !sym.includes('.')).join(',')
          await addDoc(collection(db, "Search"), {
            date: new Date(),
            results: cleanSymbolList,
            query: q.toLowerCase()
          })
          searchStocks(cleanSymbolList)
        })
      }
    }
    else {
      fetch(`/api/stocks/search-symbols?query=${q}`).then((res) => res.json()).then(async (syms) => { 
        const cleanSymbolList = syms.results.split(',').filter((sym: any) => !sym.includes('.')).join(',')
        await addDoc(collection(db, "Search"), {
          date: new Date(),
          results: cleanSymbolList,
          query: q.toLowerCase()
        })
        searchStocks(cleanSymbolList)
      })
    }
  }

  return (
    <div id="home-wrapper">
      <Header />
      <div id="home-body">
        <div id="stock-list">
          <h1 className='symbol-header'>Symbols</h1>
          <QuoteSearch search={search} loadDefault={loadStocks} />
          {
            (isLoadingStocks || isLoadingSearch  ? 
              <div id='home-spinner'><Spinner /></div> : 
            (!MONTHLYQUOTAERROR ?
              <StockQuoteList stocks={stocks} userStocks={user?.stocks} /> :
              <div id="quote-limit-reached-wrapper">
                <div id='quote-limit-reached'><BiErrorCircle style={{ fontSize: '28px' }} /> Exceeded monthly quota</div>
              </div>
            ))
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
