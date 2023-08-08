import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import Link from 'next/link'
import { BsChevronRight, BsArrowUp, BsArrowDown } from 'react-icons/bs'
import { ResponsiveContainer } from 'recharts'
import StockChart from '@/components/StockChart'
import sleep from '@/helpers/sleep'
import getLatestDate from '@/helpers/getLatestDate'
import PeriodSwitcher from '@/components/PeriodSwitcher'
import Header from '@/components/Header'

const StockDetails = () => {

    const router = useRouter()
    const { symbol } = router.query

    const [ isLoadingHistory, setIsLoadingHistory ] = useState(false)
    const [ isLoadingProfile, setIsLoadingProfile ] = useState(false)
    const [ history, setHistory ] = useState<any[]>([])
    const [ shortTermHistory, setShortTermHistory ] = useState<any[]>([])
    const [ longTermHistory, setLongTermHistory ] = useState<any[]>([])
    const [ profile, setProfile ] = useState<any>()

    const [ stockData, setStockData ] = useState<any[]>([])
    const [ period, setPeriod ] = useState<string>('1d')

    useEffect(() => {
        setIsLoadingHistory(true)
        setIsLoadingProfile(true)
        if(symbol) {
            fetch(`/api/stocks/history?symbol=${symbol}&interval=5m`).then((res) => res.json()).then((data) => {
                setShortTermHistory(data.history)
                setHistory(data.history)
                setIsLoadingHistory(false)
            })
            fetch(`/api/stocks/history?symbol=${symbol}&interval=1d`).then((res) => res.json()).then((data) => {
              setLongTermHistory(data.history)
              setIsLoadingHistory(false)
            })
            fetch(`/api/stocks/profile?symbol=${symbol}`).then((res) => res.json()).then((data) => {
                setProfile(data.profile)
                setIsLoadingProfile(false)
            })
        }
    }, [symbol, router.isReady])

    useEffect(() => {
        if(stockData) handleOneDay()
    }, [history])

    useEffect(() => {
      if(period === '1d') handleOneDay()
      else if(period === '5d') handleFiveDay()
      else if(period === '1m') handleOneMonth()
      else if(period === '6m') handleSixMonth()
      else if(period === 'ytd') handleYTD()
      else if(period === '1y') handleOneYear()
      else if(period === '5y') handleFiveYear()
      else if(period === 'max') handleMax()
    }, [period, history])

    const handlePeriodChange = (p: string) => {
      if(['1d', '5d', '1m'].includes(p) && ['6m', 'ytd', '1y', '5y', 'max'].includes(period)) {
        // load 5m data
        setHistory(shortTermHistory)
      }
      else if(['6m', 'ytd', '1y', '5y', 'max'].includes(p) && ['1d', '5d', '1m'].includes(period)) {
        // load 1d data
        setHistory(longTermHistory)
      }

      setPeriod(p)
    }

    const handleOneDay: any = async () => {
        const latestDate: Date = getLatestDate(history)
        const oneDayData = history.filter((h) => {
            const td = new Date(h.date_utc * 1000)
            return (latestDate.getDate() === td.getDate()) &&
                   (latestDate.getMonth() === td.getMonth()) &&
                   (latestDate.getFullYear() === td.getFullYear())
        })
        setStockData(oneDayData)
    }

    const handleFiveDay: any = async () => {
      const latestDate: Date = getLatestDate(history)
        const fiveDayData = history.filter((h) => {
            const td = new Date(h.date_utc * 1000)
            td.setDate(td.getDate() + 5)
            return td >= latestDate
        })
        setStockData(fiveDayData)
    }

    const handleOneMonth: any = async () => {
      const latestDate: Date = getLatestDate(history)
        const oneMonthData = history.filter((h) => {
            const td = new Date(h.date_utc * 1000)
            td.setMonth(td.getMonth() + 1)
            return td >= latestDate
        })
        setStockData(oneMonthData)
    }

    const handleSixMonth: any = async () => {
      const latestDate: Date = getLatestDate(history)
        const sixMonthData = history.filter((h) => {
            const td = new Date(h.date_utc * 1000)
            td.setMonth(td.getMonth() + 6)
            return td >= latestDate
        })
        setStockData(sixMonthData)
    }

    const handleYTD: any = async () => {
      const latestDate: Date = getLatestDate(history)
        const ytdData = history.filter((h) => {
            const td = new Date(h.date_utc * 1000)
            return td.getFullYear() === latestDate.getFullYear()
        })
        setStockData(ytdData)
    }

    const handleOneYear: any = async () => {
      const latestDate: Date = getLatestDate(history)
        const ytdData = history.filter((h) => {
            const td = new Date(h.date_utc * 1000)
            td.setFullYear(td.getFullYear() + 1)
            return td >= latestDate
        })
        setStockData(ytdData)
    }

    const handleFiveYear: any = async () => {
      const latestDate: Date = getLatestDate(history)
        const ytdData = history.filter((h) => {
            const td = new Date(h.date_utc * 1000)
            td.setFullYear(td.getFullYear() + 5)
            return td >= latestDate
        })
        setStockData(ytdData)
    }

    const handleMax: any = async () => {
      setStockData(history)
    }

    return (
        <div id="home-wrapper">
            <Header />
            {
                isLoadingHistory || isLoadingProfile ? (
                    <div id='stock-spinner'>
                        <Spinner />
                    </div>
                ) : (
                    <div className='stock-wrapper'>
                        <div className='stock-breadcrumb'>
                            <Link href={'/'}>HOME</Link> <span><BsChevronRight /></span> { ` ${profile?.symbol}` }
                        </div>
                        <h1 className='stock-name'>
                            { profile?.longName }
                        </h1>
                        <div className='stock-price'>
                            <h1 className='stock-price-current'>${ profile?.regularMarketPrice }</h1>
                            <div className={`stock-price-change-percent ${ profile?.regularMarketChangePercent.toFixed(2) >= 0 ? 'up-percent' : 'down-percent'}`}>{ profile?.regularMarketChangePercent.toFixed(2) >= 0 ? <BsArrowUp /> : <BsArrowDown /> }&nbsp;{ profile?.regularMarketChangePercent.toFixed(2) }%</div>
                            <div className={`stock-price-change-dollar ${ profile?.regularMarketChange.toFixed(2) >= 0 ? 'up-dollar' : 'down-dollar'}`}>{ profile?.regularMarketChange.toFixed(2) } Today</div>
                        </div>
                        <PeriodSwitcher onChange={(p: string) => handlePeriodChange(p)} />
                        <div className='stock-graph'>
                            <StockChart history={stockData} profile={profile} period={period} />
                        </div>
                        <div className='profile'>
                          <div className='about'>
                            <h1>About</h1>
                            <p>{ profile?.longBusinessSummary }</p>
                          </div>
                          <div className='news'>
                            <h1>News</h1>
                          </div>
                        </div>
                    </div>
                )
            }
            <footer id="home-footer">&copy; ethanshealey.com { new Date().getFullYear() }</footer>
        </div>
    )
}

export default StockDetails