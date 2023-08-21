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
    console.log('loading news')
    fetch('/api/stocks/news').then((res) => res.json()).then((data) => {
      console.log('news:', data)
      setNews((_: any) => [ ...data ])
      setIsLoadingNews(false)
    })
  }

  const search = () => {}

  // const search = (q: string) => {
  //   setIsLoadingSearch(true)

  //   const handleYahooSearch = (symbols: string) => {
  //     // fetch(`/api/stocks/quotes?symbols=${symbols}`).then((res) => res.json()).then((data) => {
  //     //   setStocks(data)
  //     //   setIsLoadingSearch(false)
  //     // })
  //     console.log('searching for ', symbols)
  //   }

  //   if(q === '') {
  //     return loadStocks()
  //   }

  //   // check to see if it exists in the DB
  //   getDocs(query(collection(db, "Search"), where("query", "==", q.toLowerCase()))).then((results) => {
  //     if(results.docs.length) {

  //       /** CHECK IF RESULT IS STILL VALID */
  //       const addedDate = new Date(results.docs[0].data().date).getTime()
  //       const currDate = new Date().getTime()
  //       const monthInMilliseconds = 2_629_746_000

  //       if(currDate - addedDate >= monthInMilliseconds) {
  //         // Query is expired...
  //         console.log('older then a month')
  //         // Delete from DB
  //         deleteDoc(doc(db, "Search", results.docs[0].id))
  //       }
  //       else {
  //         // Query is valid
  //         q = results.docs[0].data().results
  //       }
  //     }
  //     fetch(`/api/stocks/search-symbols?query=${q}`).then((res) => res.json()).then((data) => {

  //       /** ADD TO DB */
  //       addDoc(collection(db, "Search"), {
  //         date: new Date(),
  //         results: data.results,
  //         query: q.toLowerCase()
  //       })

  //       handleYahooSearch(data.results)
  //     })
  //   })
  // }

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
