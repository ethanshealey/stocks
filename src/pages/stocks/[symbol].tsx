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
import mockShortTermData from '@/helpers/MockShortTermData.json'
import mockLongTermData from '@/helpers/MockLongTermData.json'
import mockProfile from "@/helpers/MockProfile.json"
import { AiOutlineUser } from 'react-icons/ai'
import { PiBrowser, PiUsersLight } from 'react-icons/pi'
import convertLargeNumber from '@/helpers/convertLargeNumber'

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
                console.log(data.history)
                setShortTermHistory(data.history)
                setHistory(data.history)
                setIsLoadingHistory(false)
            })
            fetch(`/api/stocks/history?symbol=${symbol}&interval=1d`).then((res) => res.json()).then((data) => {
              console.log(data.history)
              setLongTermHistory(data.history)
              setIsLoadingHistory(false)
            })
            fetch(`/api/stocks/profile?symbol=${symbol}`).then((res) => res.json()).then((data) => {
                console.log(data.profile)
                setProfile(data.profile)
                setIsLoadingProfile(false)
            })
            // setHistory(mockShortTermData)
            // setShortTermHistory((_: any) => mockShortTermData)
            // setLongTermHistory((_: any) => mockLongTermData)
            // setProfile((_: any) => mockProfile)
            // setIsLoadingHistory(false)
            // setIsLoadingProfile(false)
        }
    }, [symbol])

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
                            <hr />
                            <div className='about-detail'>
                              <p className='about-detail-left'><AiOutlineUser /> CEO</p>
                              <p className='about-detail-right'>{profile?.companyOfficers[0].name}</p>
                            </div>
                            <hr />
                            <div className='about-detail'>
                              <p className='about-detail-left'><PiBrowser /> Website</p>
                              <p className='about-detail-right'><a href={profile?.website} target="_blank">{profile?.website}</a></p>
                            </div>
                            <hr />
                            <div className='about-detail'>
                              <p className='about-detail-left'><PiUsersLight /> Employees</p>
                              <p className='about-detail-right'>{convertLargeNumber(profile?.fullTimeEmployees, 'short')}</p>
                            </div>
                          </div>
                          <div className='info'>
                            <br />
                            <div className='info-detail'>
                              <p className='info-detail-left'>Previous Close</p>
                              <p className='info-detail-right'>${profile?.regularMarketPreviousClose}</p>
                            </div>
                            <hr />
                            <div className='info-detail'>
                              <p className='info-detail-left'>Day Range</p>
                              <p className='info-detail-right'>${Number(profile?.regularMarketDayRange.split(' - ')[0]).toFixed(2)} &mdash; ${Number(profile?.regularMarketDayRange.split(' - ')[1]).toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className='info-detail'>
                              <p className='info-detail-left'>Year Range</p>
                              <p className='info-detail-right'>${Number(profile?.fiftyTwoWeekRange.split(' - ')[0]).toFixed(2)} &mdash; ${Number(profile?.fiftyTwoWeekRange.split(' - ')[1]).toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className='info-detail'>
                              <p className='info-detail-left'>Market Cap</p>
                              <p className='info-detail-right'>{convertLargeNumber(profile?.marketCap, 'short')}</p>
                            </div>
                            <hr />
                            <div className='info-detail'>
                              <p className='info-detail-left'>Primary Exchange</p>
                              <p className='info-detail-right'>{profile?.fullExchangeName}</p>
                            </div>                          </div>
                          
                        </div>
                    </div>
                )
            }
            <footer id="home-footer">&copy; ethanshealey.com { new Date().getFullYear() }</footer>
        </div>
    )
}

export default StockDetails