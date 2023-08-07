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
    const [ profile, setProfile ] = useState<any>()

    const [ stockData, setStockData ] = useState<any[]>([])
    const [ period, setPeriod ] = useState<string>('')

    useEffect(() => {
        setIsLoadingHistory(true)
        setIsLoadingProfile(true)
        if(symbol) {
            // fetch(`/api/stocks/history?symbol=${symbol}&interval=5m`).then((res) => res.json()).then((data) => {
            //     console.log(data)
            //     setHistory(data.history)
            //     setIsLoadingHistory(false)
            // })
            // fetch(`/api/stocks/profile?symbol=${symbol}`).then((res) => res.json()).then((data) => {
            //     console.log(data)
            //     setProfile(data.profile)
            //     setIsLoadingProfile(false)
            // })
            
            const testObj = {
                "history": [
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688131800,
                    "open": 441.44,
                    "high": 442.4,
                    "low": 441.11,
                    "close": 442.26,
                    "volume": 7492123,
                    "fixed_date": "Jun 30 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688132700,
                    "open": 442.28,
                    "high": 442.67,
                    "low": 441.86,
                    "close": 442.32,
                    "volume": 3940630,
                    "fixed_date": "Jun 30 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688133600,
                    "open": 442.34,
                    "high": 443.01,
                    "low": 442.32,
                    "close": 442.87,
                    "volume": 4571321,
                    "fixed_date": "Jun 30 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688134500,
                    "open": 442.88,
                    "high": 443.32,
                    "low": 442.7,
                    "close": 443,
                    "volume": 3800593,
                    "fixed_date": "Jun 30 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688135400,
                    "open": 443,
                    "high": 443.36,
                    "low": 442.41,
                    "close": 442.55,
                    "volume": 4235010,
                    "fixed_date": "Jun 30 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688136300,
                    "open": 442.55,
                    "high": 442.86,
                    "low": 442.04,
                    "close": 442.66,
                    "volume": 3568335,
                    "fixed_date": "Jun 30 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688137200,
                    "open": 442.66,
                    "high": 443.12,
                    "low": 442.52,
                    "close": 442.95,
                    "volume": 2146650,
                    "fixed_date": "Jun 30 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688138100,
                    "open": 442.96,
                    "high": 443.08,
                    "low": 442.52,
                    "close": 442.69,
                    "volume": 1836840,
                    "fixed_date": "Jun 30 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688139000,
                    "open": 442.7,
                    "high": 442.7,
                    "low": 442.05,
                    "close": 442.07,
                    "volume": 1766270,
                    "fixed_date": "Jun 30 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688139900,
                    "open": 442.07,
                    "high": 442.46,
                    "low": 442.01,
                    "close": 442.46,
                    "volume": 2084996,
                    "fixed_date": "Jun 30 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688140800,
                    "open": 442.46,
                    "high": 442.64,
                    "low": 442.22,
                    "close": 442.51,
                    "volume": 2115567,
                    "fixed_date": "Jun 30 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688141700,
                    "open": 442.51,
                    "high": 443.06,
                    "low": 442.48,
                    "close": 443.05,
                    "volume": 2054076,
                    "fixed_date": "Jun 30 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688142600,
                    "open": 443.05,
                    "high": 443.19,
                    "low": 442.99,
                    "close": 443.08,
                    "volume": 2081696,
                    "fixed_date": "Jun 30 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688143500,
                    "open": 443.07,
                    "high": 443.61,
                    "low": 443.06,
                    "close": 443.49,
                    "volume": 2911698,
                    "fixed_date": "Jun 30 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688144400,
                    "open": 443.5,
                    "high": 443.6,
                    "low": 443.26,
                    "close": 443.42,
                    "volume": 2150580,
                    "fixed_date": "Jun 30 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688145300,
                    "open": 443.41,
                    "high": 443.56,
                    "low": 443.36,
                    "close": 443.52,
                    "volume": 1274472,
                    "fixed_date": "Jun 30 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688146200,
                    "open": 443.53,
                    "high": 443.95,
                    "low": 443.45,
                    "close": 443.55,
                    "volume": 2764318,
                    "fixed_date": "Jun 30 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688147100,
                    "open": 443.55,
                    "high": 443.83,
                    "low": 443.49,
                    "close": 443.8,
                    "volume": 1135298,
                    "fixed_date": "Jun 30 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688148000,
                    "open": 443.8,
                    "high": 443.95,
                    "low": 443.63,
                    "close": 443.74,
                    "volume": 1800882,
                    "fixed_date": "Jun 30 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688148900,
                    "open": 443.74,
                    "high": 444.13,
                    "low": 443.67,
                    "close": 444.06,
                    "volume": 2018941,
                    "fixed_date": "Jun 30 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688149800,
                    "open": 444.06,
                    "high": 444.1,
                    "low": 443.82,
                    "close": 444.03,
                    "volume": 1845080,
                    "fixed_date": "Jun 30 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688150700,
                    "open": 444.03,
                    "high": 444.06,
                    "low": 443.61,
                    "close": 443.88,
                    "volume": 2508949,
                    "fixed_date": "Jun 30 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688151600,
                    "open": 443.88,
                    "high": 444.02,
                    "low": 443.59,
                    "close": 444.02,
                    "volume": 2034277,
                    "fixed_date": "Jun 30 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688152500,
                    "open": 444.02,
                    "high": 444.14,
                    "low": 443.66,
                    "close": 444.02,
                    "volume": 2901666,
                    "fixed_date": "Jun 30 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688153400,
                    "open": 444.02,
                    "high": 444.21,
                    "low": 443.81,
                    "close": 443.89,
                    "volume": 4743268,
                    "fixed_date": "Jun 30 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "06-30-2023",
                    "date_utc": 1688154300,
                    "open": 443.88,
                    "high": 444.3,
                    "low": 443.18,
                    "close": 443.24,
                    "volume": 14390135,
                    "fixed_date": "Jun 30 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688391000,
                    "open": 442.92,
                    "high": 443.41,
                    "low": 442.63,
                    "close": 443.41,
                    "volume": 4239672,
                    "fixed_date": "Jul 03 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688391900,
                    "open": 443.41,
                    "high": 443.55,
                    "low": 443.11,
                    "close": 443.46,
                    "volume": 2874494,
                    "fixed_date": "Jul 03 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688392800,
                    "open": 443.5,
                    "high": 443.68,
                    "low": 443.29,
                    "close": 443.45,
                    "volume": 1765516,
                    "fixed_date": "Jul 03 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688393700,
                    "open": 443.44,
                    "high": 443.55,
                    "low": 443.09,
                    "close": 443.48,
                    "volume": 1851705,
                    "fixed_date": "Jul 03 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688394600,
                    "open": 443.49,
                    "high": 443.57,
                    "low": 443.02,
                    "close": 443.23,
                    "volume": 2793257,
                    "fixed_date": "Jul 03 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688395500,
                    "open": 443.22,
                    "high": 443.45,
                    "low": 443.06,
                    "close": 443.2,
                    "volume": 1271854,
                    "fixed_date": "Jul 03 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688396400,
                    "open": 443.21,
                    "high": 443.61,
                    "low": 443.16,
                    "close": 443.57,
                    "volume": 1727083,
                    "fixed_date": "Jul 03 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688397300,
                    "open": 443.57,
                    "high": 443.6,
                    "low": 443.36,
                    "close": 443.55,
                    "volume": 1032110,
                    "fixed_date": "Jul 03 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688398200,
                    "open": 443.55,
                    "high": 443.68,
                    "low": 443.44,
                    "close": 443.59,
                    "volume": 1365626,
                    "fixed_date": "Jul 03 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688399100,
                    "open": 443.62,
                    "high": 443.72,
                    "low": 443.51,
                    "close": 443.63,
                    "volume": 1921016,
                    "fixed_date": "Jul 03 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688400000,
                    "open": 443.62,
                    "high": 443.77,
                    "low": 443.55,
                    "close": 443.73,
                    "volume": 1357497,
                    "fixed_date": "Jul 03 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688400900,
                    "open": 443.73,
                    "high": 443.95,
                    "low": 443.6,
                    "close": 443.89,
                    "volume": 1861186,
                    "fixed_date": "Jul 03 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688401800,
                    "open": 443.89,
                    "high": 443.92,
                    "low": 443.75,
                    "close": 443.89,
                    "volume": 1739905,
                    "fixed_date": "Jul 03 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688402700,
                    "open": 443.89,
                    "high": 443.93,
                    "low": 443.88,
                    "close": 443.88,
                    "volume": 74858,
                    "fixed_date": "Jul 03 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-03-2023",
                    "date_utc": 1688403600,
                    "open": 443.79,
                    "high": 443.95,
                    "low": 443.59,
                    "close": 443.9,
                    "volume": 0,
                    "fixed_date": "Jul 03 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688563800,
                    "open": 441.91,
                    "high": 443.17,
                    "low": 441.9,
                    "close": 443.12,
                    "volume": 4189566,
                    "fixed_date": "Jul 05 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688564700,
                    "open": 443.13,
                    "high": 443.32,
                    "low": 442.81,
                    "close": 443.22,
                    "volume": 2073914,
                    "fixed_date": "Jul 05 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688565600,
                    "open": 443.23,
                    "high": 443.45,
                    "low": 442.93,
                    "close": 443.27,
                    "volume": 2044472,
                    "fixed_date": "Jul 05 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688566500,
                    "open": 443.27,
                    "high": 443.63,
                    "low": 443.26,
                    "close": 443.47,
                    "volume": 1700771,
                    "fixed_date": "Jul 05 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688567400,
                    "open": 443.48,
                    "high": 443.83,
                    "low": 443.47,
                    "close": 443.54,
                    "volume": 2553258,
                    "fixed_date": "Jul 05 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688568300,
                    "open": 443.55,
                    "high": 443.81,
                    "low": 443.14,
                    "close": 443.79,
                    "volume": 1532831,
                    "fixed_date": "Jul 05 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688569200,
                    "open": 443.8,
                    "high": 443.89,
                    "low": 443.58,
                    "close": 443.74,
                    "volume": 1908805,
                    "fixed_date": "Jul 05 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688570100,
                    "open": 443.74,
                    "high": 443.77,
                    "low": 443.37,
                    "close": 443.57,
                    "volume": 2047882,
                    "fixed_date": "Jul 05 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688571000,
                    "open": 443.57,
                    "high": 443.78,
                    "low": 443.5,
                    "close": 443.74,
                    "volume": 1416222,
                    "fixed_date": "Jul 05 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688571900,
                    "open": 443.74,
                    "high": 443.78,
                    "low": 443.16,
                    "close": 443.29,
                    "volume": 1296072,
                    "fixed_date": "Jul 05 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688572800,
                    "open": 443.3,
                    "high": 443.37,
                    "low": 443.07,
                    "close": 443.2,
                    "volume": 1945898,
                    "fixed_date": "Jul 05 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688573700,
                    "open": 443.27,
                    "high": 443.36,
                    "low": 443.02,
                    "close": 443.24,
                    "volume": 2404130,
                    "fixed_date": "Jul 05 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688574600,
                    "open": 443.25,
                    "high": 443.36,
                    "low": 442.73,
                    "close": 442.9,
                    "volume": 3401031,
                    "fixed_date": "Jul 05 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688575500,
                    "open": 442.91,
                    "high": 443.23,
                    "low": 442.8,
                    "close": 443.17,
                    "volume": 1753951,
                    "fixed_date": "Jul 05 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688576400,
                    "open": 443.16,
                    "high": 443.29,
                    "low": 443.01,
                    "close": 443.12,
                    "volume": 1137589,
                    "fixed_date": "Jul 05 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688577300,
                    "open": 443.14,
                    "high": 443.39,
                    "low": 443.05,
                    "close": 443.17,
                    "volume": 1420464,
                    "fixed_date": "Jul 05 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688578200,
                    "open": 443.17,
                    "high": 443.23,
                    "low": 442.99,
                    "close": 443.16,
                    "volume": 888939,
                    "fixed_date": "Jul 05 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688579100,
                    "open": 443.19,
                    "high": 443.36,
                    "low": 443.14,
                    "close": 443.28,
                    "volume": 906335,
                    "fixed_date": "Jul 05 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688580000,
                    "open": 443.3,
                    "high": 443.61,
                    "low": 443.08,
                    "close": 443.21,
                    "volume": 1614791,
                    "fixed_date": "Jul 05 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688580900,
                    "open": 443.21,
                    "high": 443.21,
                    "low": 442.31,
                    "close": 442.72,
                    "volume": 2321965,
                    "fixed_date": "Jul 05 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688581800,
                    "open": 442.72,
                    "high": 443.33,
                    "low": 442.71,
                    "close": 443.29,
                    "volume": 1286784,
                    "fixed_date": "Jul 05 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688582700,
                    "open": 443.27,
                    "high": 443.53,
                    "low": 443.24,
                    "close": 443.5,
                    "volume": 1497858,
                    "fixed_date": "Jul 05 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688583600,
                    "open": 443.5,
                    "high": 443.73,
                    "low": 443.44,
                    "close": 443.66,
                    "volume": 1253397,
                    "fixed_date": "Jul 05 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688584500,
                    "open": 443.67,
                    "high": 443.76,
                    "low": 443.52,
                    "close": 443.72,
                    "volume": 1700556,
                    "fixed_date": "Jul 05 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688585400,
                    "open": 443.71,
                    "high": 443.76,
                    "low": 443.42,
                    "close": 443.43,
                    "volume": 1973168,
                    "fixed_date": "Jul 05 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-05-2023",
                    "date_utc": 1688586300,
                    "open": 443.43,
                    "high": 443.61,
                    "low": 443.13,
                    "close": 443.13,
                    "volume": 4804953,
                    "fixed_date": "Jul 05 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688650200,
                    "open": 439.44,
                    "high": 439.54,
                    "low": 438.56,
                    "close": 438.63,
                    "volume": 8508047,
                    "fixed_date": "Jul 06 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688651100,
                    "open": 438.75,
                    "high": 439.07,
                    "low": 438.04,
                    "close": 438.49,
                    "volume": 3617959,
                    "fixed_date": "Jul 06 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688652000,
                    "open": 438.51,
                    "high": 438.53,
                    "low": 437.47,
                    "close": 438.04,
                    "volume": 5680923,
                    "fixed_date": "Jul 06 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688652900,
                    "open": 438.04,
                    "high": 438.16,
                    "low": 437.45,
                    "close": 437.72,
                    "volume": 3586612,
                    "fixed_date": "Jul 06 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688653800,
                    "open": 437.73,
                    "high": 437.85,
                    "low": 437.25,
                    "close": 437.6,
                    "volume": 3371919,
                    "fixed_date": "Jul 06 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688654700,
                    "open": 437.58,
                    "high": 437.7,
                    "low": 437.13,
                    "close": 437.2,
                    "volume": 1947542,
                    "fixed_date": "Jul 06 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688655600,
                    "open": 437.2,
                    "high": 437.65,
                    "low": 437.12,
                    "close": 437.15,
                    "volume": 2113131,
                    "fixed_date": "Jul 06 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688656500,
                    "open": 437.16,
                    "high": 437.49,
                    "low": 437.06,
                    "close": 437.35,
                    "volume": 2268933,
                    "fixed_date": "Jul 06 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688657400,
                    "open": 437.33,
                    "high": 437.91,
                    "low": 437.33,
                    "close": 437.82,
                    "volume": 2367125,
                    "fixed_date": "Jul 06 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688658300,
                    "open": 437.83,
                    "high": 438.22,
                    "low": 437.66,
                    "close": 438.1,
                    "volume": 2421629,
                    "fixed_date": "Jul 06 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688659200,
                    "open": 438.11,
                    "high": 438.65,
                    "low": 438.11,
                    "close": 438.32,
                    "volume": 2603643,
                    "fixed_date": "Jul 06 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688660100,
                    "open": 438.32,
                    "high": 438.83,
                    "low": 438.32,
                    "close": 438.81,
                    "volume": 1835573,
                    "fixed_date": "Jul 06 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688661000,
                    "open": 438.81,
                    "high": 439.03,
                    "low": 438.68,
                    "close": 438.83,
                    "volume": 2754915,
                    "fixed_date": "Jul 06 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688661900,
                    "open": 438.83,
                    "high": 439.24,
                    "low": 438.76,
                    "close": 439.19,
                    "volume": 1668020,
                    "fixed_date": "Jul 06 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688662800,
                    "open": 439.19,
                    "high": 439.49,
                    "low": 439.09,
                    "close": 439.38,
                    "volume": 1537562,
                    "fixed_date": "Jul 06 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688663700,
                    "open": 439.39,
                    "high": 439.55,
                    "low": 439.18,
                    "close": 439.28,
                    "volume": 2647251,
                    "fixed_date": "Jul 06 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688664600,
                    "open": 439.27,
                    "high": 439.63,
                    "low": 438.99,
                    "close": 439.56,
                    "volume": 1879511,
                    "fixed_date": "Jul 06 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688665500,
                    "open": 439.55,
                    "high": 439.76,
                    "low": 439.33,
                    "close": 439.72,
                    "volume": 1759985,
                    "fixed_date": "Jul 06 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688666400,
                    "open": 439.73,
                    "high": 439.76,
                    "low": 439.35,
                    "close": 439.35,
                    "volume": 1371960,
                    "fixed_date": "Jul 06 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688667300,
                    "open": 439.36,
                    "high": 439.54,
                    "low": 439.24,
                    "close": 439.3,
                    "volume": 974010,
                    "fixed_date": "Jul 06 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688668200,
                    "open": 439.29,
                    "high": 439.89,
                    "low": 439.27,
                    "close": 439.88,
                    "volume": 1242147,
                    "fixed_date": "Jul 06 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688669100,
                    "open": 439.89,
                    "high": 440.1,
                    "low": 439.77,
                    "close": 440.04,
                    "volume": 1674982,
                    "fixed_date": "Jul 06 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688670000,
                    "open": 440.04,
                    "high": 440.08,
                    "low": 439.64,
                    "close": 439.64,
                    "volume": 1610008,
                    "fixed_date": "Jul 06 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688670900,
                    "open": 439.64,
                    "high": 439.95,
                    "low": 439.58,
                    "close": 439.75,
                    "volume": 1485622,
                    "fixed_date": "Jul 06 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688671800,
                    "open": 439.75,
                    "high": 439.82,
                    "low": 439.49,
                    "close": 439.62,
                    "volume": 2420037,
                    "fixed_date": "Jul 06 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-06-2023",
                    "date_utc": 1688672700,
                    "open": 439.61,
                    "high": 439.99,
                    "low": 439.47,
                    "close": 439.67,
                    "volume": 7753124,
                    "fixed_date": "Jul 06 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688736600,
                    "open": 438.63,
                    "high": 439.69,
                    "low": 438.47,
                    "close": 439.17,
                    "volume": 5313819,
                    "fixed_date": "Jul 07 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688737500,
                    "open": 439.16,
                    "high": 440.18,
                    "low": 439.15,
                    "close": 440.16,
                    "volume": 2179901,
                    "fixed_date": "Jul 07 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688738400,
                    "open": 440.16,
                    "high": 440.25,
                    "low": 439.75,
                    "close": 440.04,
                    "volume": 1805957,
                    "fixed_date": "Jul 07 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688739300,
                    "open": 440.04,
                    "high": 440.08,
                    "low": 439.29,
                    "close": 439.47,
                    "volume": 1840194,
                    "fixed_date": "Jul 07 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688740200,
                    "open": 439.48,
                    "high": 439.69,
                    "low": 438.82,
                    "close": 439.47,
                    "volume": 1889655,
                    "fixed_date": "Jul 07 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688741100,
                    "open": 439.47,
                    "high": 439.94,
                    "low": 439.43,
                    "close": 439.87,
                    "volume": 1358377,
                    "fixed_date": "Jul 07 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688742000,
                    "open": 439.86,
                    "high": 440.14,
                    "low": 439.81,
                    "close": 439.84,
                    "volume": 1165081,
                    "fixed_date": "Jul 07 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688742900,
                    "open": 439.84,
                    "high": 440.05,
                    "low": 439.69,
                    "close": 439.93,
                    "volume": 975158,
                    "fixed_date": "Jul 07 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688743800,
                    "open": 440.06,
                    "high": 440.31,
                    "low": 439.96,
                    "close": 440.11,
                    "volume": 1445113,
                    "fixed_date": "Jul 07 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688744700,
                    "open": 440.12,
                    "high": 440.4,
                    "low": 439.89,
                    "close": 440.37,
                    "volume": 1247927,
                    "fixed_date": "Jul 07 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688745600,
                    "open": 440.38,
                    "high": 440.89,
                    "low": 440.36,
                    "close": 440.86,
                    "volume": 2157467,
                    "fixed_date": "Jul 07 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688746500,
                    "open": 440.87,
                    "high": 441.07,
                    "low": 440.78,
                    "close": 441.05,
                    "volume": 1821714,
                    "fixed_date": "Jul 07 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688747400,
                    "open": 441.06,
                    "high": 442.17,
                    "low": 441.06,
                    "close": 442.11,
                    "volume": 5116451,
                    "fixed_date": "Jul 07 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688748300,
                    "open": 442.1,
                    "high": 442.29,
                    "low": 441.79,
                    "close": 442.26,
                    "volume": 1619706,
                    "fixed_date": "Jul 07 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688749200,
                    "open": 442.26,
                    "high": 442.56,
                    "low": 442.23,
                    "close": 442.46,
                    "volume": 1856616,
                    "fixed_date": "Jul 07 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688750100,
                    "open": 442.46,
                    "high": 442.64,
                    "low": 442.41,
                    "close": 442.61,
                    "volume": 1951111,
                    "fixed_date": "Jul 07 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688751000,
                    "open": 442.61,
                    "high": 442.64,
                    "low": 441.96,
                    "close": 442.43,
                    "volume": 2151992,
                    "fixed_date": "Jul 07 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688751900,
                    "open": 442.43,
                    "high": 442.43,
                    "low": 441.5,
                    "close": 441.79,
                    "volume": 1744765,
                    "fixed_date": "Jul 07 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688752800,
                    "open": 441.8,
                    "high": 441.87,
                    "low": 441.6,
                    "close": 441.76,
                    "volume": 1288608,
                    "fixed_date": "Jul 07 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688753700,
                    "open": 441.77,
                    "high": 441.82,
                    "low": 441.54,
                    "close": 441.78,
                    "volume": 1139757,
                    "fixed_date": "Jul 07 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688754600,
                    "open": 441.78,
                    "high": 441.86,
                    "low": 441.16,
                    "close": 441.18,
                    "volume": 1446939,
                    "fixed_date": "Jul 07 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688755500,
                    "open": 441.18,
                    "high": 441.33,
                    "low": 441.07,
                    "close": 441.19,
                    "volume": 1374169,
                    "fixed_date": "Jul 07 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688756400,
                    "open": 441.2,
                    "high": 441.26,
                    "low": 440.92,
                    "close": 441.04,
                    "volume": 1660514,
                    "fixed_date": "Jul 07 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688757300,
                    "open": 441.04,
                    "high": 441.11,
                    "low": 440.21,
                    "close": 440.29,
                    "volume": 3562216,
                    "fixed_date": "Jul 07 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688758200,
                    "open": 440.28,
                    "high": 440.54,
                    "low": 439.49,
                    "close": 439.53,
                    "volume": 5356172,
                    "fixed_date": "Jul 07 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-07-2023",
                    "date_utc": 1688759100,
                    "open": 439.54,
                    "high": 439.7,
                    "low": 438.3,
                    "close": 438.55,
                    "volume": 15508270,
                    "fixed_date": "Jul 07 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1688995800,
                    "open": 438.18,
                    "high": 439.35,
                    "low": 438.05,
                    "close": 439.02,
                    "volume": 4698637,
                    "fixed_date": "Jul 10 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1688996700,
                    "open": 439.01,
                    "high": 439.31,
                    "low": 438.56,
                    "close": 439.1,
                    "volume": 2215648,
                    "fixed_date": "Jul 10 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1688997600,
                    "open": 439.08,
                    "high": 439.83,
                    "low": 439.03,
                    "close": 439.65,
                    "volume": 2446869,
                    "fixed_date": "Jul 10 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1688998500,
                    "open": 439.65,
                    "high": 439.84,
                    "low": 439.19,
                    "close": 439.27,
                    "volume": 1758867,
                    "fixed_date": "Jul 10 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1688999400,
                    "open": 439.27,
                    "high": 439.39,
                    "low": 438.37,
                    "close": 438.64,
                    "volume": 3500555,
                    "fixed_date": "Jul 10 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689000300,
                    "open": 438.64,
                    "high": 439.03,
                    "low": 438.47,
                    "close": 438.63,
                    "volume": 1266831,
                    "fixed_date": "Jul 10 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689001200,
                    "open": 438.62,
                    "high": 438.7,
                    "low": 438.01,
                    "close": 438.45,
                    "volume": 3398967,
                    "fixed_date": "Jul 10 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689002100,
                    "open": 438.46,
                    "high": 438.78,
                    "low": 438.12,
                    "close": 438.72,
                    "volume": 1393538,
                    "fixed_date": "Jul 10 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689003000,
                    "open": 438.71,
                    "high": 439.08,
                    "low": 438.43,
                    "close": 438.47,
                    "volume": 1323995,
                    "fixed_date": "Jul 10 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689003900,
                    "open": 438.45,
                    "high": 438.8,
                    "low": 438.1,
                    "close": 438.42,
                    "volume": 1489221,
                    "fixed_date": "Jul 10 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689004800,
                    "open": 438.42,
                    "high": 438.48,
                    "low": 437.58,
                    "close": 437.71,
                    "volume": 2226088,
                    "fixed_date": "Jul 10 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689005700,
                    "open": 437.7,
                    "high": 438.47,
                    "low": 437.61,
                    "close": 438.39,
                    "volume": 1415566,
                    "fixed_date": "Jul 10 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689006600,
                    "open": 438.39,
                    "high": 438.66,
                    "low": 438.27,
                    "close": 438.64,
                    "volume": 1244519,
                    "fixed_date": "Jul 10 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689007500,
                    "open": 438.63,
                    "high": 438.98,
                    "low": 438.59,
                    "close": 438.88,
                    "volume": 1006222,
                    "fixed_date": "Jul 10 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689008400,
                    "open": 438.88,
                    "high": 439.11,
                    "low": 438.82,
                    "close": 438.95,
                    "volume": 1697095,
                    "fixed_date": "Jul 10 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689009300,
                    "open": 438.96,
                    "high": 439.13,
                    "low": 438.77,
                    "close": 439.13,
                    "volume": 1036148,
                    "fixed_date": "Jul 10 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689010200,
                    "open": 439.14,
                    "high": 439.4,
                    "low": 438.81,
                    "close": 439.13,
                    "volume": 1193039,
                    "fixed_date": "Jul 10 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689011100,
                    "open": 439.13,
                    "high": 439.22,
                    "low": 438.83,
                    "close": 438.97,
                    "volume": 1070555,
                    "fixed_date": "Jul 10 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689012000,
                    "open": 438.97,
                    "high": 439.04,
                    "low": 438.53,
                    "close": 438.96,
                    "volume": 1363068,
                    "fixed_date": "Jul 10 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689012900,
                    "open": 438.95,
                    "high": 439.42,
                    "low": 438.94,
                    "close": 439.39,
                    "volume": 1501423,
                    "fixed_date": "Jul 10 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689013800,
                    "open": 439.39,
                    "high": 439.43,
                    "low": 438.89,
                    "close": 438.94,
                    "volume": 1184852,
                    "fixed_date": "Jul 10 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689014700,
                    "open": 438.93,
                    "high": 439.32,
                    "low": 438.76,
                    "close": 439.26,
                    "volume": 875484,
                    "fixed_date": "Jul 10 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689015600,
                    "open": 439.27,
                    "high": 439.32,
                    "low": 438.81,
                    "close": 438.98,
                    "volume": 1066066,
                    "fixed_date": "Jul 10 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689016500,
                    "open": 438.98,
                    "high": 439.12,
                    "low": 438.85,
                    "close": 439.02,
                    "volume": 920187,
                    "fixed_date": "Jul 10 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689017400,
                    "open": 439.01,
                    "high": 439.13,
                    "low": 438.78,
                    "close": 438.87,
                    "volume": 1558347,
                    "fixed_date": "Jul 10 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-10-2023",
                    "date_utc": 1689018300,
                    "open": 438.87,
                    "high": 439.67,
                    "low": 438.61,
                    "close": 439.66,
                    "volume": 10483162,
                    "fixed_date": "Jul 10 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689082200,
                    "open": 440.45,
                    "high": 441.05,
                    "low": 439.65,
                    "close": 439.99,
                    "volume": 4499245,
                    "fixed_date": "Jul 11 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689083100,
                    "open": 439.99,
                    "high": 440.4,
                    "low": 439.87,
                    "close": 440.39,
                    "volume": 1902193,
                    "fixed_date": "Jul 11 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689084000,
                    "open": 440.39,
                    "high": 440.4,
                    "low": 439.44,
                    "close": 439.54,
                    "volume": 2336017,
                    "fixed_date": "Jul 11 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689084900,
                    "open": 439.54,
                    "high": 440.4,
                    "low": 439.49,
                    "close": 440.27,
                    "volume": 1884373,
                    "fixed_date": "Jul 11 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689085800,
                    "open": 440.26,
                    "high": 440.67,
                    "low": 440.02,
                    "close": 440.66,
                    "volume": 2218409,
                    "fixed_date": "Jul 11 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689086700,
                    "open": 440.68,
                    "high": 440.78,
                    "low": 440.4,
                    "close": 440.61,
                    "volume": 1375908,
                    "fixed_date": "Jul 11 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689087600,
                    "open": 440.62,
                    "high": 440.93,
                    "low": 440.43,
                    "close": 440.9,
                    "volume": 1551457,
                    "fixed_date": "Jul 11 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689088500,
                    "open": 440.91,
                    "high": 440.97,
                    "low": 440.41,
                    "close": 440.57,
                    "volume": 1471314,
                    "fixed_date": "Jul 11 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689089400,
                    "open": 440.57,
                    "high": 440.76,
                    "low": 440.38,
                    "close": 440.63,
                    "volume": 1121019,
                    "fixed_date": "Jul 11 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689090300,
                    "open": 440.63,
                    "high": 441.48,
                    "low": 440.49,
                    "close": 441.46,
                    "volume": 2363127,
                    "fixed_date": "Jul 11 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689091200,
                    "open": 441.45,
                    "high": 441.7,
                    "low": 441.28,
                    "close": 441.47,
                    "volume": 2390138,
                    "fixed_date": "Jul 11 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689092100,
                    "open": 441.47,
                    "high": 441.58,
                    "low": 440.45,
                    "close": 440.85,
                    "volume": 1690013,
                    "fixed_date": "Jul 11 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689093000,
                    "open": 440.88,
                    "high": 440.99,
                    "low": 440.71,
                    "close": 440.89,
                    "volume": 1287139,
                    "fixed_date": "Jul 11 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689093900,
                    "open": 440.89,
                    "high": 441.3,
                    "low": 440.81,
                    "close": 441.14,
                    "volume": 912681,
                    "fixed_date": "Jul 11 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689094800,
                    "open": 441.14,
                    "high": 441.33,
                    "low": 440.71,
                    "close": 440.9,
                    "volume": 1470210,
                    "fixed_date": "Jul 11 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689095700,
                    "open": 440.89,
                    "high": 440.92,
                    "low": 440.6,
                    "close": 440.88,
                    "volume": 950671,
                    "fixed_date": "Jul 11 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689096600,
                    "open": 440.89,
                    "high": 440.96,
                    "low": 440.73,
                    "close": 440.86,
                    "volume": 784367,
                    "fixed_date": "Jul 11 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689097500,
                    "open": 440.85,
                    "high": 441.07,
                    "low": 440.52,
                    "close": 441.01,
                    "volume": 877364,
                    "fixed_date": "Jul 11 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689098400,
                    "open": 441,
                    "high": 441.14,
                    "low": 440.63,
                    "close": 440.77,
                    "volume": 1025209,
                    "fixed_date": "Jul 11 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689099300,
                    "open": 440.77,
                    "high": 440.77,
                    "low": 440.27,
                    "close": 440.71,
                    "volume": 1372144,
                    "fixed_date": "Jul 11 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689100200,
                    "open": 440.72,
                    "high": 440.92,
                    "low": 440.36,
                    "close": 440.91,
                    "volume": 1374024,
                    "fixed_date": "Jul 11 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689101100,
                    "open": 440.91,
                    "high": 441.44,
                    "low": 440.79,
                    "close": 441.38,
                    "volume": 2116998,
                    "fixed_date": "Jul 11 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689102000,
                    "open": 441.39,
                    "high": 441.45,
                    "low": 441.1,
                    "close": 441.16,
                    "volume": 1915891,
                    "fixed_date": "Jul 11 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689102900,
                    "open": 441.16,
                    "high": 441.61,
                    "low": 441.11,
                    "close": 441.54,
                    "volume": 1620178,
                    "fixed_date": "Jul 11 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689103800,
                    "open": 441.54,
                    "high": 441.98,
                    "low": 441.19,
                    "close": 441.94,
                    "volume": 3362478,
                    "fixed_date": "Jul 11 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-11-2023",
                    "date_utc": 1689104700,
                    "open": 441.95,
                    "high": 442.97,
                    "low": 441.95,
                    "close": 442.48,
                    "volume": 11770153,
                    "fixed_date": "Jul 11 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689168600,
                    "open": 446.29,
                    "high": 446.76,
                    "low": 445.83,
                    "close": 446.35,
                    "volume": 9217049,
                    "fixed_date": "Jul 12 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689169500,
                    "open": 446.33,
                    "high": 447.07,
                    "low": 446.21,
                    "close": 446.93,
                    "volume": 4693408,
                    "fixed_date": "Jul 12 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689170400,
                    "open": 446.94,
                    "high": 447.19,
                    "low": 446.52,
                    "close": 447.13,
                    "volume": 3138686,
                    "fixed_date": "Jul 12 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689171300,
                    "open": 447.27,
                    "high": 447.34,
                    "low": 446.85,
                    "close": 447.22,
                    "volume": 3305297,
                    "fixed_date": "Jul 12 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689172200,
                    "open": 447.22,
                    "high": 447.48,
                    "low": 446.98,
                    "close": 447.3,
                    "volume": 3336383,
                    "fixed_date": "Jul 12 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689173100,
                    "open": 447.31,
                    "high": 447.35,
                    "low": 446.77,
                    "close": 446.99,
                    "volume": 1485090,
                    "fixed_date": "Jul 12 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689174000,
                    "open": 446.98,
                    "high": 447.09,
                    "low": 446.59,
                    "close": 446.87,
                    "volume": 1730458,
                    "fixed_date": "Jul 12 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689174900,
                    "open": 446.88,
                    "high": 447.12,
                    "low": 446.55,
                    "close": 446.62,
                    "volume": 1329851,
                    "fixed_date": "Jul 12 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689175800,
                    "open": 446.62,
                    "high": 446.72,
                    "low": 445.02,
                    "close": 445.52,
                    "volume": 5094421,
                    "fixed_date": "Jul 12 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689176700,
                    "open": 445.51,
                    "high": 445.92,
                    "low": 444.98,
                    "close": 445.17,
                    "volume": 3265095,
                    "fixed_date": "Jul 12 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689177600,
                    "open": 445.17,
                    "high": 445.76,
                    "low": 444.91,
                    "close": 445.63,
                    "volume": 2951274,
                    "fixed_date": "Jul 12 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689178500,
                    "open": 445.64,
                    "high": 445.67,
                    "low": 445.11,
                    "close": 445.35,
                    "volume": 2291394,
                    "fixed_date": "Jul 12 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689179400,
                    "open": 445.35,
                    "high": 445.95,
                    "low": 445.25,
                    "close": 445.76,
                    "volume": 1967226,
                    "fixed_date": "Jul 12 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689180300,
                    "open": 445.76,
                    "high": 446.2,
                    "low": 445.63,
                    "close": 445.83,
                    "volume": 1725022,
                    "fixed_date": "Jul 12 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689181200,
                    "open": 445.92,
                    "high": 446.1,
                    "low": 445.65,
                    "close": 445.93,
                    "volume": 1197956,
                    "fixed_date": "Jul 12 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689182100,
                    "open": 445.93,
                    "high": 446.24,
                    "low": 445.93,
                    "close": 446.14,
                    "volume": 1088821,
                    "fixed_date": "Jul 12 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689183000,
                    "open": 446.16,
                    "high": 446.46,
                    "low": 446.08,
                    "close": 446.39,
                    "volume": 1321564,
                    "fixed_date": "Jul 12 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689183900,
                    "open": 446.39,
                    "high": 446.44,
                    "low": 446.14,
                    "close": 446.34,
                    "volume": 894558,
                    "fixed_date": "Jul 12 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689184800,
                    "open": 446.34,
                    "high": 446.72,
                    "low": 446,
                    "close": 446.68,
                    "volume": 1655950,
                    "fixed_date": "Jul 12 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689185700,
                    "open": 446.69,
                    "high": 446.74,
                    "low": 446.5,
                    "close": 446.68,
                    "volume": 1573136,
                    "fixed_date": "Jul 12 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689186600,
                    "open": 446.68,
                    "high": 446.75,
                    "low": 446.28,
                    "close": 446.52,
                    "volume": 1270293,
                    "fixed_date": "Jul 12 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689187500,
                    "open": 446.52,
                    "high": 446.52,
                    "low": 446.04,
                    "close": 446.27,
                    "volume": 1632806,
                    "fixed_date": "Jul 12 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689188400,
                    "open": 446.27,
                    "high": 446.36,
                    "low": 446.05,
                    "close": 446.3,
                    "volume": 1902038,
                    "fixed_date": "Jul 12 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689189300,
                    "open": 446.3,
                    "high": 446.39,
                    "low": 445.15,
                    "close": 445.64,
                    "volume": 2696333,
                    "fixed_date": "Jul 12 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689190200,
                    "open": 445.65,
                    "high": 446.2,
                    "low": 445.58,
                    "close": 446.15,
                    "volume": 3143911,
                    "fixed_date": "Jul 12 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-12-2023",
                    "date_utc": 1689191100,
                    "open": 446.15,
                    "high": 446.2,
                    "low": 445.57,
                    "close": 446.02,
                    "volume": 14878025,
                    "fixed_date": "Jul 12 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689255000,
                    "open": 447.9,
                    "high": 448.43,
                    "low": 447.45,
                    "close": 448.27,
                    "volume": 5811674,
                    "fixed_date": "Jul 13 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689255900,
                    "open": 448.26,
                    "high": 448.51,
                    "low": 448.06,
                    "close": 448.39,
                    "volume": 2399693,
                    "fixed_date": "Jul 13 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689256800,
                    "open": 448.39,
                    "high": 448.46,
                    "low": 448,
                    "close": 448.19,
                    "volume": 2448316,
                    "fixed_date": "Jul 13 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689257700,
                    "open": 448.2,
                    "high": 448.32,
                    "low": 447.82,
                    "close": 447.88,
                    "volume": 2041693,
                    "fixed_date": "Jul 13 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689258600,
                    "open": 447.88,
                    "high": 448.44,
                    "low": 447.86,
                    "close": 448.25,
                    "volume": 3140525,
                    "fixed_date": "Jul 13 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689259500,
                    "open": 448.25,
                    "high": 448.4,
                    "low": 448,
                    "close": 448.37,
                    "volume": 1809443,
                    "fixed_date": "Jul 13 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689260400,
                    "open": 448.38,
                    "high": 448.51,
                    "low": 447.95,
                    "close": 447.96,
                    "volume": 2581582,
                    "fixed_date": "Jul 13 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689261300,
                    "open": 447.96,
                    "high": 448.31,
                    "low": 447.94,
                    "close": 448.08,
                    "volume": 1696357,
                    "fixed_date": "Jul 13 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689262200,
                    "open": 448.09,
                    "high": 448.31,
                    "low": 447.88,
                    "close": 448.28,
                    "volume": 1105223,
                    "fixed_date": "Jul 13 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689263100,
                    "open": 448.28,
                    "high": 448.48,
                    "low": 448.2,
                    "close": 448.46,
                    "volume": 2439210,
                    "fixed_date": "Jul 13 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689264000,
                    "open": 448.46,
                    "high": 448.69,
                    "low": 448.37,
                    "close": 448.52,
                    "volume": 1775616,
                    "fixed_date": "Jul 13 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689264900,
                    "open": 448.52,
                    "high": 448.74,
                    "low": 448.38,
                    "close": 448.59,
                    "volume": 1468693,
                    "fixed_date": "Jul 13 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689265800,
                    "open": 448.58,
                    "high": 448.91,
                    "low": 448.52,
                    "close": 448.69,
                    "volume": 2028612,
                    "fixed_date": "Jul 13 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689266700,
                    "open": 448.69,
                    "high": 448.8,
                    "low": 448.4,
                    "close": 448.62,
                    "volume": 1047230,
                    "fixed_date": "Jul 13 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689267600,
                    "open": 448.63,
                    "high": 448.65,
                    "low": 448.16,
                    "close": 448.54,
                    "volume": 1501432,
                    "fixed_date": "Jul 13 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689268500,
                    "open": 448.54,
                    "high": 448.73,
                    "low": 448.49,
                    "close": 448.66,
                    "volume": 1902891,
                    "fixed_date": "Jul 13 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689269400,
                    "open": 448.67,
                    "high": 448.83,
                    "low": 448.67,
                    "close": 448.77,
                    "volume": 930945,
                    "fixed_date": "Jul 13 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689270300,
                    "open": 448.77,
                    "high": 448.85,
                    "low": 448.62,
                    "close": 448.69,
                    "volume": 1090524,
                    "fixed_date": "Jul 13 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689271200,
                    "open": 448.68,
                    "high": 449.15,
                    "low": 448.63,
                    "close": 449.11,
                    "volume": 1599330,
                    "fixed_date": "Jul 13 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689272100,
                    "open": 449.1,
                    "high": 449.27,
                    "low": 448.82,
                    "close": 448.89,
                    "volume": 1890593,
                    "fixed_date": "Jul 13 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689273000,
                    "open": 448.89,
                    "high": 449.11,
                    "low": 448.75,
                    "close": 449.01,
                    "volume": 1363588,
                    "fixed_date": "Jul 13 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689273900,
                    "open": 449.03,
                    "high": 449.28,
                    "low": 449.03,
                    "close": 449.28,
                    "volume": 1066370,
                    "fixed_date": "Jul 13 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689274800,
                    "open": 449.27,
                    "high": 449.9,
                    "low": 449.2,
                    "close": 449.72,
                    "volume": 3379518,
                    "fixed_date": "Jul 13 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689275700,
                    "open": 449.72,
                    "high": 449.85,
                    "low": 449.38,
                    "close": 449.8,
                    "volume": 2050632,
                    "fixed_date": "Jul 13 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689276600,
                    "open": 449.79,
                    "high": 450.38,
                    "low": 449.63,
                    "close": 450.36,
                    "volume": 3800004,
                    "fixed_date": "Jul 13 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-13-2023",
                    "date_utc": 1689277500,
                    "open": 450.36,
                    "high": 450.38,
                    "low": 449.53,
                    "close": 449.54,
                    "volume": 9899163,
                    "fixed_date": "Jul 13 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689341400,
                    "open": 450.39,
                    "high": 451.02,
                    "low": 450.38,
                    "close": 450.55,
                    "volume": 4560623,
                    "fixed_date": "Jul 14 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689342300,
                    "open": 450.55,
                    "high": 451.09,
                    "low": 450.42,
                    "close": 451.03,
                    "volume": 2943645,
                    "fixed_date": "Jul 14 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689343200,
                    "open": 451.03,
                    "high": 451.18,
                    "low": 450.18,
                    "close": 451.03,
                    "volume": 3608734,
                    "fixed_date": "Jul 14 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689344100,
                    "open": 451.04,
                    "high": 451.36,
                    "low": 450.43,
                    "close": 450.43,
                    "volume": 2610705,
                    "fixed_date": "Jul 14 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689345000,
                    "open": 450.43,
                    "high": 450.73,
                    "low": 449.87,
                    "close": 450,
                    "volume": 3219618,
                    "fixed_date": "Jul 14 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689345900,
                    "open": 450.02,
                    "high": 450.29,
                    "low": 449.52,
                    "close": 450.15,
                    "volume": 3105850,
                    "fixed_date": "Jul 14 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689346800,
                    "open": 450.15,
                    "high": 450.38,
                    "low": 450.05,
                    "close": 450.2,
                    "volume": 3125010,
                    "fixed_date": "Jul 14 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689347700,
                    "open": 450.2,
                    "high": 450.53,
                    "low": 450.09,
                    "close": 450.4,
                    "volume": 1538479,
                    "fixed_date": "Jul 14 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689348600,
                    "open": 450.4,
                    "high": 450.82,
                    "low": 450.27,
                    "close": 450.38,
                    "volume": 1942593,
                    "fixed_date": "Jul 14 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689349500,
                    "open": 450.39,
                    "high": 450.53,
                    "low": 450.08,
                    "close": 450.49,
                    "volume": 1615929,
                    "fixed_date": "Jul 14 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689350400,
                    "open": 450.5,
                    "high": 450.54,
                    "low": 449.92,
                    "close": 449.93,
                    "volume": 1766009,
                    "fixed_date": "Jul 14 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689351300,
                    "open": 449.93,
                    "high": 450.12,
                    "low": 449.71,
                    "close": 449.76,
                    "volume": 2354849,
                    "fixed_date": "Jul 14 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689352200,
                    "open": 449.76,
                    "high": 450.12,
                    "low": 449.61,
                    "close": 450.04,
                    "volume": 2343929,
                    "fixed_date": "Jul 14 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689353100,
                    "open": 450.05,
                    "high": 450.09,
                    "low": 449.56,
                    "close": 449.81,
                    "volume": 1140187,
                    "fixed_date": "Jul 14 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689354000,
                    "open": 449.81,
                    "high": 449.86,
                    "low": 449.19,
                    "close": 449.63,
                    "volume": 1547717,
                    "fixed_date": "Jul 14 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689354900,
                    "open": 449.62,
                    "high": 449.79,
                    "low": 449.43,
                    "close": 449.75,
                    "volume": 1125611,
                    "fixed_date": "Jul 14 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689355800,
                    "open": 449.75,
                    "high": 450.05,
                    "low": 449.67,
                    "close": 449.84,
                    "volume": 1260548,
                    "fixed_date": "Jul 14 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689356700,
                    "open": 449.83,
                    "high": 450.14,
                    "low": 449.77,
                    "close": 449.84,
                    "volume": 952714,
                    "fixed_date": "Jul 14 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689357600,
                    "open": 449.84,
                    "high": 450.23,
                    "low": 449.83,
                    "close": 450.2,
                    "volume": 1608947,
                    "fixed_date": "Jul 14 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689358500,
                    "open": 450.2,
                    "high": 450.26,
                    "low": 449.54,
                    "close": 449.59,
                    "volume": 1193430,
                    "fixed_date": "Jul 14 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689359400,
                    "open": 449.59,
                    "high": 449.75,
                    "low": 449.21,
                    "close": 449.39,
                    "volume": 1610969,
                    "fixed_date": "Jul 14 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689360300,
                    "open": 449.39,
                    "high": 449.81,
                    "low": 449.19,
                    "close": 449.27,
                    "volume": 1244459,
                    "fixed_date": "Jul 14 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689361200,
                    "open": 449.27,
                    "high": 449.28,
                    "low": 448.63,
                    "close": 449.27,
                    "volume": 3316544,
                    "fixed_date": "Jul 14 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689362100,
                    "open": 449.27,
                    "high": 449.55,
                    "low": 448.92,
                    "close": 449.12,
                    "volume": 1743442,
                    "fixed_date": "Jul 14 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689363000,
                    "open": 449.13,
                    "high": 449.21,
                    "low": 448.9,
                    "close": 448.92,
                    "volume": 1994814,
                    "fixed_date": "Jul 14 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-14-2023",
                    "date_utc": 1689363900,
                    "open": 448.92,
                    "high": 449.35,
                    "low": 448.49,
                    "close": 449.29,
                    "volume": 8411544,
                    "fixed_date": "Jul 14 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689600600,
                    "open": 449.13,
                    "high": 449.8,
                    "low": 449.08,
                    "close": 449.32,
                    "volume": 3610800,
                    "fixed_date": "Jul 17 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689601500,
                    "open": 449.33,
                    "high": 449.68,
                    "low": 449.13,
                    "close": 449.64,
                    "volume": 1658208,
                    "fixed_date": "Jul 17 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689602400,
                    "open": 449.64,
                    "high": 450.08,
                    "low": 449.6,
                    "close": 449.88,
                    "volume": 3729687,
                    "fixed_date": "Jul 17 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689603300,
                    "open": 449.93,
                    "high": 450.04,
                    "low": 449.73,
                    "close": 449.84,
                    "volume": 1311195,
                    "fixed_date": "Jul 17 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689604200,
                    "open": 449.85,
                    "high": 449.98,
                    "low": 449.66,
                    "close": 449.9,
                    "volume": 1320767,
                    "fixed_date": "Jul 17 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689605100,
                    "open": 449.9,
                    "high": 450.14,
                    "low": 449.73,
                    "close": 449.96,
                    "volume": 1287562,
                    "fixed_date": "Jul 17 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689606000,
                    "open": 449.97,
                    "high": 450.19,
                    "low": 449.77,
                    "close": 450.18,
                    "volume": 1088783,
                    "fixed_date": "Jul 17 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689606900,
                    "open": 450.18,
                    "high": 450.46,
                    "low": 450.01,
                    "close": 450.38,
                    "volume": 1451982,
                    "fixed_date": "Jul 17 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689607800,
                    "open": 450.38,
                    "high": 450.64,
                    "low": 450.28,
                    "close": 450.59,
                    "volume": 1717294,
                    "fixed_date": "Jul 17 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689608700,
                    "open": 450.6,
                    "high": 450.74,
                    "low": 450.39,
                    "close": 450.67,
                    "volume": 1519685,
                    "fixed_date": "Jul 17 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689609600,
                    "open": 450.69,
                    "high": 450.73,
                    "low": 450.46,
                    "close": 450.57,
                    "volume": 1009630,
                    "fixed_date": "Jul 17 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689610500,
                    "open": 450.49,
                    "high": 450.58,
                    "low": 450.2,
                    "close": 450.24,
                    "volume": 1022780,
                    "fixed_date": "Jul 17 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689611400,
                    "open": 450.24,
                    "high": 450.4,
                    "low": 450.04,
                    "close": 450.33,
                    "volume": 1354273,
                    "fixed_date": "Jul 17 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689612300,
                    "open": 450.33,
                    "high": 450.61,
                    "low": 450.29,
                    "close": 450.6,
                    "volume": 716272,
                    "fixed_date": "Jul 17 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689613200,
                    "open": 450.6,
                    "high": 450.69,
                    "low": 450.32,
                    "close": 450.53,
                    "volume": 906191,
                    "fixed_date": "Jul 17 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689614100,
                    "open": 450.54,
                    "high": 450.59,
                    "low": 450.29,
                    "close": 450.48,
                    "volume": 596980,
                    "fixed_date": "Jul 17 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689615000,
                    "open": 450.46,
                    "high": 450.67,
                    "low": 450.42,
                    "close": 450.64,
                    "volume": 857353,
                    "fixed_date": "Jul 17 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689615900,
                    "open": 450.64,
                    "high": 450.86,
                    "low": 450.61,
                    "close": 450.79,
                    "volume": 1345584,
                    "fixed_date": "Jul 17 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689616800,
                    "open": 450.8,
                    "high": 450.88,
                    "low": 450.64,
                    "close": 450.83,
                    "volume": 719454,
                    "fixed_date": "Jul 17 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689617700,
                    "open": 450.89,
                    "high": 451.13,
                    "low": 450.8,
                    "close": 451.01,
                    "volume": 1353019,
                    "fixed_date": "Jul 17 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689618600,
                    "open": 451.04,
                    "high": 451.1,
                    "low": 450.66,
                    "close": 450.83,
                    "volume": 1431772,
                    "fixed_date": "Jul 17 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689619500,
                    "open": 450.83,
                    "high": 451,
                    "low": 450.77,
                    "close": 450.89,
                    "volume": 815847,
                    "fixed_date": "Jul 17 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689620400,
                    "open": 450.92,
                    "high": 451.21,
                    "low": 450.89,
                    "close": 451.17,
                    "volume": 1251040,
                    "fixed_date": "Jul 17 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689621300,
                    "open": 451.16,
                    "high": 451.93,
                    "low": 451.11,
                    "close": 451.54,
                    "volume": 3029785,
                    "fixed_date": "Jul 17 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689622200,
                    "open": 451.53,
                    "high": 451.54,
                    "low": 451.21,
                    "close": 451.31,
                    "volume": 2488102,
                    "fixed_date": "Jul 17 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-17-2023",
                    "date_utc": 1689623100,
                    "open": 451.3,
                    "high": 451.52,
                    "low": 450.6,
                    "close": 450.86,
                    "volume": 7644027,
                    "fixed_date": "Jul 17 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689687000,
                    "open": 450.5,
                    "high": 451.2,
                    "low": 450.05,
                    "close": 451.06,
                    "volume": 4272893,
                    "fixed_date": "Jul 18 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689687900,
                    "open": 451.05,
                    "high": 451.63,
                    "low": 450.73,
                    "close": 451.52,
                    "volume": 2370099,
                    "fixed_date": "Jul 18 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689688800,
                    "open": 451.51,
                    "high": 451.83,
                    "low": 451.51,
                    "close": 451.69,
                    "volume": 2146781,
                    "fixed_date": "Jul 18 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689689700,
                    "open": 451.69,
                    "high": 451.8,
                    "low": 451.43,
                    "close": 451.64,
                    "volume": 1718644,
                    "fixed_date": "Jul 18 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689690600,
                    "open": 451.65,
                    "high": 451.95,
                    "low": 451.34,
                    "close": 451.92,
                    "volume": 1403499,
                    "fixed_date": "Jul 18 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689691500,
                    "open": 451.91,
                    "high": 452.31,
                    "low": 451.9,
                    "close": 452.26,
                    "volume": 1650780,
                    "fixed_date": "Jul 18 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689692400,
                    "open": 452.26,
                    "high": 452.69,
                    "low": 452.26,
                    "close": 452.47,
                    "volume": 1609418,
                    "fixed_date": "Jul 18 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689693300,
                    "open": 452.47,
                    "high": 452.57,
                    "low": 452.28,
                    "close": 452.32,
                    "volume": 1441065,
                    "fixed_date": "Jul 18 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689694200,
                    "open": 452.33,
                    "high": 452.72,
                    "low": 452.05,
                    "close": 452.56,
                    "volume": 2170536,
                    "fixed_date": "Jul 18 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689695100,
                    "open": 452.56,
                    "high": 453.38,
                    "low": 452.56,
                    "close": 453.2,
                    "volume": 3197280,
                    "fixed_date": "Jul 18 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689696000,
                    "open": 453.22,
                    "high": 453.28,
                    "low": 452.82,
                    "close": 452.89,
                    "volume": 1521187,
                    "fixed_date": "Jul 18 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689696900,
                    "open": 452.89,
                    "high": 453.05,
                    "low": 452.44,
                    "close": 452.99,
                    "volume": 1711972,
                    "fixed_date": "Jul 18 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689697800,
                    "open": 452.98,
                    "high": 453.14,
                    "low": 452.8,
                    "close": 453.03,
                    "volume": 1485252,
                    "fixed_date": "Jul 18 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689698700,
                    "open": 453.03,
                    "high": 453.06,
                    "low": 452.77,
                    "close": 452.85,
                    "volume": 1170463,
                    "fixed_date": "Jul 18 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689699600,
                    "open": 452.85,
                    "high": 453.31,
                    "low": 452.82,
                    "close": 453.29,
                    "volume": 1595953,
                    "fixed_date": "Jul 18 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689700500,
                    "open": 453.29,
                    "high": 453.4,
                    "low": 453,
                    "close": 453.18,
                    "volume": 1383935,
                    "fixed_date": "Jul 18 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689701400,
                    "open": 453.19,
                    "high": 453.45,
                    "low": 453.13,
                    "close": 453.28,
                    "volume": 1275830,
                    "fixed_date": "Jul 18 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689702300,
                    "open": 453.28,
                    "high": 453.52,
                    "low": 453.18,
                    "close": 453.49,
                    "volume": 1225965,
                    "fixed_date": "Jul 18 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689703200,
                    "open": 453.48,
                    "high": 453.92,
                    "low": 453.41,
                    "close": 453.92,
                    "volume": 2020198,
                    "fixed_date": "Jul 18 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689704100,
                    "open": 453.92,
                    "high": 454.32,
                    "low": 453.82,
                    "close": 454.31,
                    "volume": 2078338,
                    "fixed_date": "Jul 18 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689705000,
                    "open": 454.32,
                    "high": 454.43,
                    "low": 453.76,
                    "close": 454.07,
                    "volume": 2657124,
                    "fixed_date": "Jul 18 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689705900,
                    "open": 454.06,
                    "high": 454.36,
                    "low": 454.06,
                    "close": 454.15,
                    "volume": 1391037,
                    "fixed_date": "Jul 18 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689706800,
                    "open": 454.15,
                    "high": 454.65,
                    "low": 453.84,
                    "close": 454.59,
                    "volume": 2156265,
                    "fixed_date": "Jul 18 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689707700,
                    "open": 454.59,
                    "high": 454.85,
                    "low": 454.43,
                    "close": 454.48,
                    "volume": 2553027,
                    "fixed_date": "Jul 18 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689708600,
                    "open": 454.48,
                    "high": 454.58,
                    "low": 454.19,
                    "close": 454.46,
                    "volume": 2840397,
                    "fixed_date": "Jul 18 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-18-2023",
                    "date_utc": 1689709500,
                    "open": 454.46,
                    "high": 454.86,
                    "low": 454.09,
                    "close": 454.19,
                    "volume": 15445503,
                    "fixed_date": "Jul 18 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689773400,
                    "open": 455.01,
                    "high": 456.12,
                    "low": 455.01,
                    "close": 455.86,
                    "volume": 5774219,
                    "fixed_date": "Jul 19 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689774300,
                    "open": 455.85,
                    "high": 456.06,
                    "low": 455.62,
                    "close": 456.02,
                    "volume": 2459803,
                    "fixed_date": "Jul 19 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689775200,
                    "open": 456.01,
                    "high": 456.34,
                    "low": 455.83,
                    "close": 456.04,
                    "volume": 2450806,
                    "fixed_date": "Jul 19 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689776100,
                    "open": 456.04,
                    "high": 456.34,
                    "low": 455.78,
                    "close": 455.82,
                    "volume": 2797205,
                    "fixed_date": "Jul 19 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689777000,
                    "open": 455.8,
                    "high": 456.12,
                    "low": 455.55,
                    "close": 456.04,
                    "volume": 2837326,
                    "fixed_date": "Jul 19 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689777900,
                    "open": 456.04,
                    "high": 456.17,
                    "low": 454.6,
                    "close": 455.28,
                    "volume": 3372008,
                    "fixed_date": "Jul 19 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689778800,
                    "open": 455.29,
                    "high": 455.8,
                    "low": 455.09,
                    "close": 455.8,
                    "volume": 1616065,
                    "fixed_date": "Jul 19 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689779700,
                    "open": 455.79,
                    "high": 455.96,
                    "low": 455.32,
                    "close": 455.75,
                    "volume": 2245295,
                    "fixed_date": "Jul 19 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689780600,
                    "open": 455.76,
                    "high": 456.06,
                    "low": 455.73,
                    "close": 455.9,
                    "volume": 1366849,
                    "fixed_date": "Jul 19 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689781500,
                    "open": 455.9,
                    "high": 456.15,
                    "low": 455.79,
                    "close": 455.98,
                    "volume": 1090646,
                    "fixed_date": "Jul 19 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689782400,
                    "open": 455.98,
                    "high": 456.43,
                    "low": 455.91,
                    "close": 456.1,
                    "volume": 2664637,
                    "fixed_date": "Jul 19 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689783300,
                    "open": 456.09,
                    "high": 456.09,
                    "low": 455.09,
                    "close": 455.38,
                    "volume": 2768546,
                    "fixed_date": "Jul 19 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689784200,
                    "open": 455.36,
                    "high": 455.37,
                    "low": 454.76,
                    "close": 455.14,
                    "volume": 2287628,
                    "fixed_date": "Jul 19 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689785100,
                    "open": 455.13,
                    "high": 455.37,
                    "low": 454.95,
                    "close": 455.36,
                    "volume": 1176766,
                    "fixed_date": "Jul 19 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689786000,
                    "open": 455.37,
                    "high": 455.41,
                    "low": 454.65,
                    "close": 455.31,
                    "volume": 1569866,
                    "fixed_date": "Jul 19 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689786900,
                    "open": 455.31,
                    "high": 455.32,
                    "low": 454.95,
                    "close": 455.15,
                    "volume": 1024067,
                    "fixed_date": "Jul 19 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689787800,
                    "open": 455.14,
                    "high": 455.34,
                    "low": 454.78,
                    "close": 455.19,
                    "volume": 1049071,
                    "fixed_date": "Jul 19 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689788700,
                    "open": 455.19,
                    "high": 455.36,
                    "low": 454.93,
                    "close": 455.08,
                    "volume": 743607,
                    "fixed_date": "Jul 19 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689789600,
                    "open": 455.08,
                    "high": 455.2,
                    "low": 454.41,
                    "close": 454.58,
                    "volume": 2256765,
                    "fixed_date": "Jul 19 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689790500,
                    "open": 454.58,
                    "high": 454.79,
                    "low": 454.37,
                    "close": 454.7,
                    "volume": 1947904,
                    "fixed_date": "Jul 19 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689791400,
                    "open": 454.71,
                    "high": 455.47,
                    "low": 454.68,
                    "close": 455.32,
                    "volume": 1890417,
                    "fixed_date": "Jul 19 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689792300,
                    "open": 455.32,
                    "high": 455.43,
                    "low": 455.1,
                    "close": 455.38,
                    "volume": 1136380,
                    "fixed_date": "Jul 19 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689793200,
                    "open": 455.38,
                    "high": 455.79,
                    "low": 455.37,
                    "close": 455.73,
                    "volume": 1366438,
                    "fixed_date": "Jul 19 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689794100,
                    "open": 455.84,
                    "high": 456.07,
                    "low": 455.73,
                    "close": 455.81,
                    "volume": 1707799,
                    "fixed_date": "Jul 19 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689795000,
                    "open": 455.52,
                    "high": 455.82,
                    "low": 455.18,
                    "close": 455.5,
                    "volume": 2253462,
                    "fixed_date": "Jul 19 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-19-2023",
                    "date_utc": 1689795900,
                    "open": 455.5,
                    "high": 455.67,
                    "low": 455.03,
                    "close": 455.12,
                    "volume": 6546502,
                    "fixed_date": "Jul 19 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689859800,
                    "open": 454.17,
                    "high": 455.06,
                    "low": 454.1,
                    "close": 454.86,
                    "volume": 4454760,
                    "fixed_date": "Jul 20 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689860700,
                    "open": 454.87,
                    "high": 455.1,
                    "low": 454.73,
                    "close": 454.81,
                    "volume": 2365230,
                    "fixed_date": "Jul 20 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689861600,
                    "open": 454.82,
                    "high": 454.95,
                    "low": 453.92,
                    "close": 454.02,
                    "volume": 3072122,
                    "fixed_date": "Jul 20 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689862500,
                    "open": 454.04,
                    "high": 454.24,
                    "low": 453.23,
                    "close": 453.48,
                    "volume": 2881563,
                    "fixed_date": "Jul 20 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689863400,
                    "open": 453.49,
                    "high": 453.49,
                    "low": 452.81,
                    "close": 453.3,
                    "volume": 2977552,
                    "fixed_date": "Jul 20 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689864300,
                    "open": 453.29,
                    "high": 453.85,
                    "low": 453.23,
                    "close": 453.67,
                    "volume": 2451411,
                    "fixed_date": "Jul 20 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689865200,
                    "open": 453.67,
                    "high": 454.17,
                    "low": 453.61,
                    "close": 453.8,
                    "volume": 1924348,
                    "fixed_date": "Jul 20 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689866100,
                    "open": 453.8,
                    "high": 453.91,
                    "low": 453.44,
                    "close": 453.74,
                    "volume": 1619023,
                    "fixed_date": "Jul 20 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689867000,
                    "open": 453.74,
                    "high": 454.36,
                    "low": 453.71,
                    "close": 454.18,
                    "volume": 1590561,
                    "fixed_date": "Jul 20 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689867900,
                    "open": 454.18,
                    "high": 454.25,
                    "low": 453.84,
                    "close": 454.06,
                    "volume": 1820350,
                    "fixed_date": "Jul 20 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689868800,
                    "open": 454.06,
                    "high": 454.63,
                    "low": 454.03,
                    "close": 454.6,
                    "volume": 1284902,
                    "fixed_date": "Jul 20 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689869700,
                    "open": 454.59,
                    "high": 454.78,
                    "low": 453.87,
                    "close": 453.87,
                    "volume": 2466405,
                    "fixed_date": "Jul 20 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689870600,
                    "open": 453.88,
                    "high": 453.96,
                    "low": 453.33,
                    "close": 453.62,
                    "volume": 2358388,
                    "fixed_date": "Jul 20 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689871500,
                    "open": 453.62,
                    "high": 453.84,
                    "low": 453.42,
                    "close": 453.49,
                    "volume": 1392246,
                    "fixed_date": "Jul 20 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689872400,
                    "open": 453.49,
                    "high": 453.65,
                    "low": 453.33,
                    "close": 453.56,
                    "volume": 1366935,
                    "fixed_date": "Jul 20 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689873300,
                    "open": 453.57,
                    "high": 453.7,
                    "low": 453.19,
                    "close": 453.66,
                    "volume": 1114711,
                    "fixed_date": "Jul 20 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689874200,
                    "open": 453.66,
                    "high": 453.8,
                    "low": 453.26,
                    "close": 453.49,
                    "volume": 1107932,
                    "fixed_date": "Jul 20 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689875100,
                    "open": 453.5,
                    "high": 453.7,
                    "low": 453.35,
                    "close": 453.4,
                    "volume": 1193078,
                    "fixed_date": "Jul 20 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689876000,
                    "open": 453.39,
                    "high": 453.49,
                    "low": 453.07,
                    "close": 453.11,
                    "volume": 1401081,
                    "fixed_date": "Jul 20 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689876900,
                    "open": 453.1,
                    "high": 453.16,
                    "low": 452.09,
                    "close": 452.09,
                    "volume": 2749931,
                    "fixed_date": "Jul 20 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689877800,
                    "open": 452.11,
                    "high": 452.77,
                    "low": 452.08,
                    "close": 452.43,
                    "volume": 2901180,
                    "fixed_date": "Jul 20 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689878700,
                    "open": 452.43,
                    "high": 452.74,
                    "low": 452.4,
                    "close": 452.48,
                    "volume": 1596821,
                    "fixed_date": "Jul 20 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689879600,
                    "open": 452.49,
                    "high": 452.74,
                    "low": 452.17,
                    "close": 452.2,
                    "volume": 2127261,
                    "fixed_date": "Jul 20 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689880500,
                    "open": 452.2,
                    "high": 452.27,
                    "low": 451.44,
                    "close": 451.52,
                    "volume": 2885577,
                    "fixed_date": "Jul 20 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689881400,
                    "open": 451.52,
                    "high": 452.28,
                    "low": 451.52,
                    "close": 452.08,
                    "volume": 3566473,
                    "fixed_date": "Jul 20 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-20-2023",
                    "date_utc": 1689882300,
                    "open": 452.08,
                    "high": 452.41,
                    "low": 451.8,
                    "close": 452.18,
                    "volume": 7569777,
                    "fixed_date": "Jul 20 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689946200,
                    "open": 453.55,
                    "high": 454.07,
                    "low": 453.35,
                    "close": 453.44,
                    "volume": 4984343,
                    "fixed_date": "Jul 21 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689947100,
                    "open": 453.45,
                    "high": 453.6,
                    "low": 452.58,
                    "close": 452.84,
                    "volume": 3098462,
                    "fixed_date": "Jul 21 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689948000,
                    "open": 452.83,
                    "high": 453.33,
                    "low": 452.21,
                    "close": 453.27,
                    "volume": 2961714,
                    "fixed_date": "Jul 21 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689948900,
                    "open": 453.26,
                    "high": 453.57,
                    "low": 452.3,
                    "close": 452.31,
                    "volume": 2341573,
                    "fixed_date": "Jul 21 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689949800,
                    "open": 452.3,
                    "high": 453.16,
                    "low": 452.29,
                    "close": 452.95,
                    "volume": 1677371,
                    "fixed_date": "Jul 21 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689950700,
                    "open": 452.97,
                    "high": 453.46,
                    "low": 452.92,
                    "close": 453.09,
                    "volume": 1750678,
                    "fixed_date": "Jul 21 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689951600,
                    "open": 453.09,
                    "high": 453.88,
                    "low": 453.06,
                    "close": 453.58,
                    "volume": 1576067,
                    "fixed_date": "Jul 21 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689952500,
                    "open": 453.58,
                    "high": 453.85,
                    "low": 453.52,
                    "close": 453.85,
                    "volume": 1284982,
                    "fixed_date": "Jul 21 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689953400,
                    "open": 453.85,
                    "high": 454.04,
                    "low": 453.27,
                    "close": 453.27,
                    "volume": 3606706,
                    "fixed_date": "Jul 21 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689954300,
                    "open": 453.27,
                    "high": 453.89,
                    "low": 453.1,
                    "close": 453.69,
                    "volume": 1682877,
                    "fixed_date": "Jul 21 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689955200,
                    "open": 453.69,
                    "high": 453.7,
                    "low": 453.11,
                    "close": 453.21,
                    "volume": 1138735,
                    "fixed_date": "Jul 21 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689956100,
                    "open": 453.21,
                    "high": 453.61,
                    "low": 453.08,
                    "close": 453.11,
                    "volume": 908995,
                    "fixed_date": "Jul 21 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689957000,
                    "open": 453.11,
                    "high": 453.28,
                    "low": 452.74,
                    "close": 452.84,
                    "volume": 1636891,
                    "fixed_date": "Jul 21 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689957900,
                    "open": 452.83,
                    "high": 453.01,
                    "low": 452.61,
                    "close": 452.98,
                    "volume": 999032,
                    "fixed_date": "Jul 21 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689958800,
                    "open": 452.98,
                    "high": 453.66,
                    "low": 452.91,
                    "close": 453.54,
                    "volume": 1470952,
                    "fixed_date": "Jul 21 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689959700,
                    "open": 453.54,
                    "high": 453.79,
                    "low": 453.48,
                    "close": 453.77,
                    "volume": 1316231,
                    "fixed_date": "Jul 21 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689960600,
                    "open": 453.78,
                    "high": 454.17,
                    "low": 453.7,
                    "close": 453.85,
                    "volume": 1508193,
                    "fixed_date": "Jul 21 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689961500,
                    "open": 453.85,
                    "high": 454.15,
                    "low": 453.78,
                    "close": 454.05,
                    "volume": 1567906,
                    "fixed_date": "Jul 21 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689962400,
                    "open": 454.07,
                    "high": 454.13,
                    "low": 453.12,
                    "close": 453.18,
                    "volume": 1348266,
                    "fixed_date": "Jul 21 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689963300,
                    "open": 453.18,
                    "high": 453.49,
                    "low": 453.1,
                    "close": 453.33,
                    "volume": 2131895,
                    "fixed_date": "Jul 21 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689964200,
                    "open": 453.33,
                    "high": 453.69,
                    "low": 453.12,
                    "close": 453.61,
                    "volume": 1097234,
                    "fixed_date": "Jul 21 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689965100,
                    "open": 453.6,
                    "high": 453.8,
                    "low": 453.14,
                    "close": 453.2,
                    "volume": 1110371,
                    "fixed_date": "Jul 21 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689966000,
                    "open": 453.21,
                    "high": 453.24,
                    "low": 452.32,
                    "close": 452.46,
                    "volume": 2392234,
                    "fixed_date": "Jul 21 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689966900,
                    "open": 452.46,
                    "high": 452.93,
                    "low": 452.41,
                    "close": 452.67,
                    "volume": 2198353,
                    "fixed_date": "Jul 21 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689967800,
                    "open": 452.68,
                    "high": 452.71,
                    "low": 452.2,
                    "close": 452.36,
                    "volume": 3472800,
                    "fixed_date": "Jul 21 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-21-2023",
                    "date_utc": 1689968700,
                    "open": 452.37,
                    "high": 452.75,
                    "low": 452.17,
                    "close": 452.18,
                    "volume": 9745478,
                    "fixed_date": "Jul 21 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690205400,
                    "open": 453.37,
                    "high": 454.45,
                    "low": 453.35,
                    "close": 454.26,
                    "volume": 3410513,
                    "fixed_date": "Jul 24 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690206300,
                    "open": 454.24,
                    "high": 454.37,
                    "low": 452.75,
                    "close": 453.2,
                    "volume": 3383859,
                    "fixed_date": "Jul 24 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690207200,
                    "open": 453.2,
                    "high": 453.84,
                    "low": 452.91,
                    "close": 453.79,
                    "volume": 2303317,
                    "fixed_date": "Jul 24 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690208100,
                    "open": 453.79,
                    "high": 454.27,
                    "low": 453.71,
                    "close": 454.12,
                    "volume": 2529053,
                    "fixed_date": "Jul 24 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690209000,
                    "open": 454.13,
                    "high": 454.29,
                    "low": 453.74,
                    "close": 453.99,
                    "volume": 2006954,
                    "fixed_date": "Jul 24 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690209900,
                    "open": 453.99,
                    "high": 454.37,
                    "low": 453.78,
                    "close": 454.24,
                    "volume": 1152353,
                    "fixed_date": "Jul 24 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690210800,
                    "open": 454.25,
                    "high": 454.42,
                    "low": 453.76,
                    "close": 454.35,
                    "volume": 1266949,
                    "fixed_date": "Jul 24 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690211700,
                    "open": 454.36,
                    "high": 454.58,
                    "low": 454.27,
                    "close": 454.28,
                    "volume": 2298039,
                    "fixed_date": "Jul 24 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690212600,
                    "open": 454.28,
                    "high": 454.33,
                    "low": 453.75,
                    "close": 454.03,
                    "volume": 1155392,
                    "fixed_date": "Jul 24 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690213500,
                    "open": 454.05,
                    "high": 454.51,
                    "low": 454.01,
                    "close": 454.49,
                    "volume": 966851,
                    "fixed_date": "Jul 24 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690214400,
                    "open": 454.48,
                    "high": 454.65,
                    "low": 454.34,
                    "close": 454.55,
                    "volume": 1342965,
                    "fixed_date": "Jul 24 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690215300,
                    "open": 454.55,
                    "high": 454.7,
                    "low": 454.14,
                    "close": 454.5,
                    "volume": 1260029,
                    "fixed_date": "Jul 24 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690216200,
                    "open": 454.51,
                    "high": 454.64,
                    "low": 454.2,
                    "close": 454.35,
                    "volume": 750921,
                    "fixed_date": "Jul 24 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690217100,
                    "open": 454.35,
                    "high": 454.4,
                    "low": 453.99,
                    "close": 454.3,
                    "volume": 690245,
                    "fixed_date": "Jul 24 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690218000,
                    "open": 454.3,
                    "high": 454.43,
                    "low": 454.03,
                    "close": 454.31,
                    "volume": 734111,
                    "fixed_date": "Jul 24 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690218900,
                    "open": 454.31,
                    "high": 454.48,
                    "low": 454.15,
                    "close": 454.46,
                    "volume": 837084,
                    "fixed_date": "Jul 24 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690219800,
                    "open": 454.46,
                    "high": 454.66,
                    "low": 454.22,
                    "close": 454.49,
                    "volume": 1760384,
                    "fixed_date": "Jul 24 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690220700,
                    "open": 454.48,
                    "high": 454.82,
                    "low": 454.48,
                    "close": 454.77,
                    "volume": 1091292,
                    "fixed_date": "Jul 24 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690221600,
                    "open": 454.77,
                    "high": 455.04,
                    "low": 454.71,
                    "close": 454.76,
                    "volume": 2284870,
                    "fixed_date": "Jul 24 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690222500,
                    "open": 454.75,
                    "high": 454.82,
                    "low": 454.58,
                    "close": 454.6,
                    "volume": 1167001,
                    "fixed_date": "Jul 24 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690223400,
                    "open": 454.61,
                    "high": 454.61,
                    "low": 453.85,
                    "close": 453.98,
                    "volume": 1469507,
                    "fixed_date": "Jul 24 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690224300,
                    "open": 453.98,
                    "high": 454.33,
                    "low": 453.82,
                    "close": 454.29,
                    "volume": 1593155,
                    "fixed_date": "Jul 24 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690225200,
                    "open": 454.29,
                    "high": 454.44,
                    "low": 453.97,
                    "close": 454,
                    "volume": 1396567,
                    "fixed_date": "Jul 24 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690226100,
                    "open": 453.99,
                    "high": 454.21,
                    "low": 453.43,
                    "close": 453.49,
                    "volume": 1738485,
                    "fixed_date": "Jul 24 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690227000,
                    "open": 453.49,
                    "high": 454,
                    "low": 453.45,
                    "close": 453.98,
                    "volume": 3412182,
                    "fixed_date": "Jul 24 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-24-2023",
                    "date_utc": 1690227900,
                    "open": 453.98,
                    "high": 454.24,
                    "low": 453.73,
                    "close": 454.2,
                    "volume": 5966100,
                    "fixed_date": "Jul 24 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690291800,
                    "open": 453.92,
                    "high": 454.56,
                    "low": 453.87,
                    "close": 454.55,
                    "volume": 2807526,
                    "fixed_date": "Jul 25 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690292700,
                    "open": 454.55,
                    "high": 455.13,
                    "low": 454.43,
                    "close": 454.79,
                    "volume": 2304666,
                    "fixed_date": "Jul 25 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690293600,
                    "open": 454.82,
                    "high": 454.95,
                    "low": 454.45,
                    "close": 454.95,
                    "volume": 1493476,
                    "fixed_date": "Jul 25 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690294500,
                    "open": 454.93,
                    "high": 455.05,
                    "low": 454.65,
                    "close": 454.75,
                    "volume": 1642817,
                    "fixed_date": "Jul 25 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690295400,
                    "open": 454.74,
                    "high": 454.79,
                    "low": 454.41,
                    "close": 454.76,
                    "volume": 1486250,
                    "fixed_date": "Jul 25 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690296300,
                    "open": 454.76,
                    "high": 454.85,
                    "low": 454.48,
                    "close": 454.6,
                    "volume": 1045607,
                    "fixed_date": "Jul 25 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690297200,
                    "open": 454.61,
                    "high": 454.88,
                    "low": 454.52,
                    "close": 454.86,
                    "volume": 1362802,
                    "fixed_date": "Jul 25 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690298100,
                    "open": 454.85,
                    "high": 455.09,
                    "low": 454.64,
                    "close": 454.98,
                    "volume": 1672683,
                    "fixed_date": "Jul 25 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690299000,
                    "open": 455,
                    "high": 455.6,
                    "low": 454.96,
                    "close": 455.52,
                    "volume": 2877021,
                    "fixed_date": "Jul 25 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690299900,
                    "open": 455.52,
                    "high": 455.55,
                    "low": 455.29,
                    "close": 455.39,
                    "volume": 1342279,
                    "fixed_date": "Jul 25 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690300800,
                    "open": 455.39,
                    "high": 455.56,
                    "low": 455.21,
                    "close": 455.45,
                    "volume": 1460150,
                    "fixed_date": "Jul 25 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690301700,
                    "open": 455.45,
                    "high": 455.59,
                    "low": 455.25,
                    "close": 455.38,
                    "volume": 882092,
                    "fixed_date": "Jul 25 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690302600,
                    "open": 455.37,
                    "high": 455.55,
                    "low": 455.27,
                    "close": 455.45,
                    "volume": 697217,
                    "fixed_date": "Jul 25 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690303500,
                    "open": 455.47,
                    "high": 455.89,
                    "low": 455.41,
                    "close": 455.89,
                    "volume": 1106145,
                    "fixed_date": "Jul 25 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690304400,
                    "open": 455.89,
                    "high": 456.08,
                    "low": 455.53,
                    "close": 455.84,
                    "volume": 1769277,
                    "fixed_date": "Jul 25 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690305300,
                    "open": 455.84,
                    "high": 456.12,
                    "low": 455.81,
                    "close": 455.99,
                    "volume": 889269,
                    "fixed_date": "Jul 25 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690306200,
                    "open": 455.99,
                    "high": 456.13,
                    "low": 455.88,
                    "close": 456.08,
                    "volume": 1450025,
                    "fixed_date": "Jul 25 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690307100,
                    "open": 456.07,
                    "high": 456.08,
                    "low": 455.76,
                    "close": 455.82,
                    "volume": 1110848,
                    "fixed_date": "Jul 25 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690308000,
                    "open": 455.83,
                    "high": 456.09,
                    "low": 455.7,
                    "close": 456.09,
                    "volume": 1712815,
                    "fixed_date": "Jul 25 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690308900,
                    "open": 456.09,
                    "high": 456.46,
                    "low": 455.97,
                    "close": 456.38,
                    "volume": 1570086,
                    "fixed_date": "Jul 25 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690309800,
                    "open": 456.39,
                    "high": 456.73,
                    "low": 456.35,
                    "close": 456.63,
                    "volume": 1863784,
                    "fixed_date": "Jul 25 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690310700,
                    "open": 456.63,
                    "high": 456.67,
                    "low": 455.77,
                    "close": 455.83,
                    "volume": 2242241,
                    "fixed_date": "Jul 25 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690311600,
                    "open": 455.83,
                    "high": 456.23,
                    "low": 455.76,
                    "close": 456.2,
                    "volume": 1258158,
                    "fixed_date": "Jul 25 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690312500,
                    "open": 456.19,
                    "high": 456.27,
                    "low": 455.91,
                    "close": 455.98,
                    "volume": 1107918,
                    "fixed_date": "Jul 25 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690313400,
                    "open": 455.98,
                    "high": 456.11,
                    "low": 455.73,
                    "close": 455.83,
                    "volume": 3065742,
                    "fixed_date": "Jul 25 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-25-2023",
                    "date_utc": 1690314300,
                    "open": 455.83,
                    "high": 455.99,
                    "low": 455.32,
                    "close": 455.43,
                    "volume": 7455275,
                    "fixed_date": "Jul 25 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690378200,
                    "open": 454.47,
                    "high": 455.16,
                    "low": 454.42,
                    "close": 454.93,
                    "volume": 3497923,
                    "fixed_date": "Jul 26 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690379100,
                    "open": 454.92,
                    "high": 455,
                    "low": 454.62,
                    "close": 454.82,
                    "volume": 1245144,
                    "fixed_date": "Jul 26 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690380000,
                    "open": 454.82,
                    "high": 454.99,
                    "low": 454.55,
                    "close": 454.88,
                    "volume": 1151271,
                    "fixed_date": "Jul 26 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690380900,
                    "open": 454.88,
                    "high": 454.97,
                    "low": 454.46,
                    "close": 454.72,
                    "volume": 1302162,
                    "fixed_date": "Jul 26 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690381800,
                    "open": 454.72,
                    "high": 454.85,
                    "low": 454.3,
                    "close": 454.38,
                    "volume": 1249258,
                    "fixed_date": "Jul 26 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690382700,
                    "open": 454.39,
                    "high": 454.49,
                    "low": 454.05,
                    "close": 454.15,
                    "volume": 1694771,
                    "fixed_date": "Jul 26 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690383600,
                    "open": 454.15,
                    "high": 454.45,
                    "low": 453.99,
                    "close": 454.44,
                    "volume": 1663635,
                    "fixed_date": "Jul 26 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690384500,
                    "open": 454.43,
                    "high": 454.5,
                    "low": 454.14,
                    "close": 454.36,
                    "volume": 953490,
                    "fixed_date": "Jul 26 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690385400,
                    "open": 454.36,
                    "high": 454.73,
                    "low": 454.33,
                    "close": 454.68,
                    "volume": 835600,
                    "fixed_date": "Jul 26 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690386300,
                    "open": 454.67,
                    "high": 454.98,
                    "low": 454.61,
                    "close": 454.94,
                    "volume": 1188129,
                    "fixed_date": "Jul 26 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690387200,
                    "open": 454.93,
                    "high": 455.13,
                    "low": 454.83,
                    "close": 455.02,
                    "volume": 979772,
                    "fixed_date": "Jul 26 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690388100,
                    "open": 455.04,
                    "high": 455.07,
                    "low": 454.62,
                    "close": 454.64,
                    "volume": 1295160,
                    "fixed_date": "Jul 26 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690389000,
                    "open": 454.64,
                    "high": 454.7,
                    "low": 454.34,
                    "close": 454.4,
                    "volume": 905698,
                    "fixed_date": "Jul 26 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690389900,
                    "open": 454.39,
                    "high": 454.41,
                    "low": 454.02,
                    "close": 454.26,
                    "volume": 1119914,
                    "fixed_date": "Jul 26 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690390800,
                    "open": 454.25,
                    "high": 454.48,
                    "low": 454.19,
                    "close": 454.42,
                    "volume": 973064,
                    "fixed_date": "Jul 26 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690391700,
                    "open": 454.42,
                    "high": 454.45,
                    "low": 454.11,
                    "close": 454.29,
                    "volume": 946760,
                    "fixed_date": "Jul 26 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690392600,
                    "open": 454.29,
                    "high": 454.29,
                    "low": 454.07,
                    "close": 454.18,
                    "volume": 928037,
                    "fixed_date": "Jul 26 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690393500,
                    "open": 454.19,
                    "high": 454.38,
                    "low": 454.18,
                    "close": 454.24,
                    "volume": 1120415,
                    "fixed_date": "Jul 26 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690394400,
                    "open": 454.17,
                    "high": 455,
                    "low": 453.81,
                    "close": 454.64,
                    "volume": 3103355,
                    "fixed_date": "Jul 26 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690395300,
                    "open": 454.61,
                    "high": 454.82,
                    "low": 453.97,
                    "close": 454.34,
                    "volume": 1676405,
                    "fixed_date": "Jul 26 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690396200,
                    "open": 454.35,
                    "high": 456.99,
                    "low": 454.27,
                    "close": 456.62,
                    "volume": 6423087,
                    "fixed_date": "Jul 26 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690397100,
                    "open": 456.62,
                    "high": 456.8,
                    "low": 455.63,
                    "close": 456,
                    "volume": 3910768,
                    "fixed_date": "Jul 26 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690398000,
                    "open": 456.01,
                    "high": 456.21,
                    "low": 453.69,
                    "close": 454.18,
                    "volume": 5677331,
                    "fixed_date": "Jul 26 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690398900,
                    "open": 454.18,
                    "high": 454.69,
                    "low": 453.38,
                    "close": 454.51,
                    "volume": 3673831,
                    "fixed_date": "Jul 26 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690399800,
                    "open": 454.51,
                    "high": 455.37,
                    "low": 454.05,
                    "close": 455.31,
                    "volume": 3971241,
                    "fixed_date": "Jul 26 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-26-2023",
                    "date_utc": 1690400700,
                    "open": 455.32,
                    "high": 455.54,
                    "low": 454.45,
                    "close": 455.51,
                    "volume": 10976095,
                    "fixed_date": "Jul 26 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690464600,
                    "open": 459.02,
                    "high": 459.44,
                    "low": 458.66,
                    "close": 459.27,
                    "volume": 5598267,
                    "fixed_date": "Jul 27 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690465500,
                    "open": 459.28,
                    "high": 459.35,
                    "low": 458.69,
                    "close": 458.98,
                    "volume": 2557137,
                    "fixed_date": "Jul 27 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690466400,
                    "open": 458.97,
                    "high": 459.05,
                    "low": 458.15,
                    "close": 458.35,
                    "volume": 2817956,
                    "fixed_date": "Jul 27 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690467300,
                    "open": 458.35,
                    "high": 458.54,
                    "low": 457.61,
                    "close": 457.7,
                    "volume": 2826097,
                    "fixed_date": "Jul 27 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690468200,
                    "open": 457.7,
                    "high": 458.31,
                    "low": 457.62,
                    "close": 458.21,
                    "volume": 2378325,
                    "fixed_date": "Jul 27 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690469100,
                    "open": 458.2,
                    "high": 458.45,
                    "low": 457.27,
                    "close": 457.48,
                    "volume": 3346040,
                    "fixed_date": "Jul 27 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690470000,
                    "open": 457.48,
                    "high": 457.81,
                    "low": 457.07,
                    "close": 457.24,
                    "volume": 2169832,
                    "fixed_date": "Jul 27 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690470900,
                    "open": 457.25,
                    "high": 457.71,
                    "low": 457.11,
                    "close": 457.71,
                    "volume": 1699778,
                    "fixed_date": "Jul 27 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690471800,
                    "open": 457.7,
                    "high": 458.01,
                    "low": 457.52,
                    "close": 457.58,
                    "volume": 1514819,
                    "fixed_date": "Jul 27 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690472700,
                    "open": 457.59,
                    "high": 457.64,
                    "low": 457.21,
                    "close": 457.45,
                    "volume": 1216304,
                    "fixed_date": "Jul 27 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690473600,
                    "open": 457.45,
                    "high": 458.04,
                    "low": 457.39,
                    "close": 457.94,
                    "volume": 1504752,
                    "fixed_date": "Jul 27 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690474500,
                    "open": 457.94,
                    "high": 458.41,
                    "low": 457.8,
                    "close": 458.38,
                    "volume": 1627570,
                    "fixed_date": "Jul 27 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690475400,
                    "open": 458.39,
                    "high": 458.58,
                    "low": 458.35,
                    "close": 458.42,
                    "volume": 1616896,
                    "fixed_date": "Jul 27 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690476300,
                    "open": 458.42,
                    "high": 458.6,
                    "low": 458.15,
                    "close": 458.38,
                    "volume": 1336528,
                    "fixed_date": "Jul 27 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690477200,
                    "open": 458.39,
                    "high": 458.56,
                    "low": 457.19,
                    "close": 457.86,
                    "volume": 2392521,
                    "fixed_date": "Jul 27 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690478100,
                    "open": 457.84,
                    "high": 457.84,
                    "low": 456.26,
                    "close": 456.3,
                    "volume": 3521151,
                    "fixed_date": "Jul 27 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690479000,
                    "open": 456.31,
                    "high": 456.44,
                    "low": 455.81,
                    "close": 456.32,
                    "volume": 3245442,
                    "fixed_date": "Jul 27 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690479900,
                    "open": 456.31,
                    "high": 456.38,
                    "low": 455.7,
                    "close": 456.04,
                    "volume": 2066897,
                    "fixed_date": "Jul 27 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690480800,
                    "open": 456.04,
                    "high": 456.22,
                    "low": 454.36,
                    "close": 454.55,
                    "volume": 2745031,
                    "fixed_date": "Jul 27 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690481700,
                    "open": 454.54,
                    "high": 455.16,
                    "low": 453.83,
                    "close": 453.93,
                    "volume": 4666721,
                    "fixed_date": "Jul 27 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690482600,
                    "open": 453.93,
                    "high": 454.31,
                    "low": 452.88,
                    "close": 453.63,
                    "volume": 5582302,
                    "fixed_date": "Jul 27 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690483500,
                    "open": 453.64,
                    "high": 453.85,
                    "low": 452.73,
                    "close": 452.73,
                    "volume": 3332775,
                    "fixed_date": "Jul 27 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690484400,
                    "open": 452.73,
                    "high": 453.8,
                    "low": 452.41,
                    "close": 453.72,
                    "volume": 3611774,
                    "fixed_date": "Jul 27 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690485300,
                    "open": 453.69,
                    "high": 453.87,
                    "low": 452.64,
                    "close": 452.74,
                    "volume": 2927969,
                    "fixed_date": "Jul 27 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690486200,
                    "open": 452.74,
                    "high": 453.14,
                    "low": 452.03,
                    "close": 452.1,
                    "volume": 5053225,
                    "fixed_date": "Jul 27 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-27-2023",
                    "date_utc": 1690487100,
                    "open": 452.11,
                    "high": 452.83,
                    "low": 451.55,
                    "close": 452.46,
                    "volume": 10503663,
                    "fixed_date": "Jul 27 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690551000,
                    "open": 455.88,
                    "high": 456.27,
                    "low": 455.16,
                    "close": 455.77,
                    "volume": 6158929,
                    "fixed_date": "Jul 28 2023 09:30",
                    "fixed_date_MMHH": "09:30"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690551900,
                    "open": 455.77,
                    "high": 456.59,
                    "low": 455.77,
                    "close": 456.13,
                    "volume": 3672982,
                    "fixed_date": "Jul 28 2023 09:45",
                    "fixed_date_MMHH": "09:45"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690552800,
                    "open": 456.15,
                    "high": 456.78,
                    "low": 456.13,
                    "close": 456.56,
                    "volume": 3741640,
                    "fixed_date": "Jul 28 2023 10:00",
                    "fixed_date_MMHH": "10:00"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690553700,
                    "open": 456.54,
                    "high": 456.87,
                    "low": 456.03,
                    "close": 456.4,
                    "volume": 3247887,
                    "fixed_date": "Jul 28 2023 10:15",
                    "fixed_date_MMHH": "10:15"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690554600,
                    "open": 456.39,
                    "high": 456.83,
                    "low": 456.17,
                    "close": 456.21,
                    "volume": 2917097,
                    "fixed_date": "Jul 28 2023 10:30",
                    "fixed_date_MMHH": "10:30"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690555500,
                    "open": 456.22,
                    "high": 456.8,
                    "low": 455.94,
                    "close": 456.78,
                    "volume": 1998703,
                    "fixed_date": "Jul 28 2023 10:45",
                    "fixed_date_MMHH": "10:45"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690556400,
                    "open": 456.79,
                    "high": 456.99,
                    "low": 456.59,
                    "close": 456.9,
                    "volume": 1306217,
                    "fixed_date": "Jul 28 2023 11:00",
                    "fixed_date_MMHH": "11:00"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690557300,
                    "open": 456.9,
                    "high": 457.62,
                    "low": 456.85,
                    "close": 457.44,
                    "volume": 2517361,
                    "fixed_date": "Jul 28 2023 11:15",
                    "fixed_date_MMHH": "11:15"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690558200,
                    "open": 457.45,
                    "high": 457.78,
                    "low": 457.21,
                    "close": 457.75,
                    "volume": 1790737,
                    "fixed_date": "Jul 28 2023 11:30",
                    "fixed_date_MMHH": "11:30"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690559100,
                    "open": 457.75,
                    "high": 457.75,
                    "low": 457.37,
                    "close": 457.68,
                    "volume": 1768896,
                    "fixed_date": "Jul 28 2023 11:45",
                    "fixed_date_MMHH": "11:45"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690560000,
                    "open": 457.67,
                    "high": 457.68,
                    "low": 456.88,
                    "close": 457.31,
                    "volume": 2178327,
                    "fixed_date": "Jul 28 2023 12:00",
                    "fixed_date_MMHH": "12:00"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690560900,
                    "open": 457.31,
                    "high": 457.63,
                    "low": 457.16,
                    "close": 457.6,
                    "volume": 1171273,
                    "fixed_date": "Jul 28 2023 12:15",
                    "fixed_date_MMHH": "12:15"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690561800,
                    "open": 457.6,
                    "high": 457.62,
                    "low": 457.21,
                    "close": 457.31,
                    "volume": 1601435,
                    "fixed_date": "Jul 28 2023 12:30",
                    "fixed_date_MMHH": "12:30"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690562700,
                    "open": 457.3,
                    "high": 457.45,
                    "low": 456.93,
                    "close": 457.04,
                    "volume": 1244137,
                    "fixed_date": "Jul 28 2023 12:45",
                    "fixed_date_MMHH": "12:45"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690563600,
                    "open": 457.04,
                    "high": 457.05,
                    "low": 456.42,
                    "close": 456.83,
                    "volume": 1859406,
                    "fixed_date": "Jul 28 2023 13:00",
                    "fixed_date_MMHH": "13:00"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690564500,
                    "open": 456.82,
                    "high": 456.83,
                    "low": 456.15,
                    "close": 456.15,
                    "volume": 1630025,
                    "fixed_date": "Jul 28 2023 13:15",
                    "fixed_date_MMHH": "13:15"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690565400,
                    "open": 456.15,
                    "high": 456.45,
                    "low": 455.06,
                    "close": 455.44,
                    "volume": 2707402,
                    "fixed_date": "Jul 28 2023 13:30",
                    "fixed_date_MMHH": "13:30"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690566300,
                    "open": 455.43,
                    "high": 456.32,
                    "low": 455.11,
                    "close": 456.27,
                    "volume": 2411222,
                    "fixed_date": "Jul 28 2023 13:45",
                    "fixed_date_MMHH": "13:45"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690567200,
                    "open": 456.27,
                    "high": 456.75,
                    "low": 456.21,
                    "close": 456.42,
                    "volume": 2243170,
                    "fixed_date": "Jul 28 2023 14:00",
                    "fixed_date_MMHH": "14:00"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690568100,
                    "open": 456.48,
                    "high": 456.93,
                    "low": 456.32,
                    "close": 456.91,
                    "volume": 1331238,
                    "fixed_date": "Jul 28 2023 14:15",
                    "fixed_date_MMHH": "14:15"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690569000,
                    "open": 456.91,
                    "high": 456.92,
                    "low": 456.14,
                    "close": 456.8,
                    "volume": 3164607,
                    "fixed_date": "Jul 28 2023 14:30",
                    "fixed_date_MMHH": "14:30"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690569900,
                    "open": 456.8,
                    "high": 457.36,
                    "low": 456.73,
                    "close": 457.01,
                    "volume": 1537144,
                    "fixed_date": "Jul 28 2023 14:45",
                    "fixed_date_MMHH": "14:45"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690570800,
                    "open": 457.01,
                    "high": 457.3,
                    "low": 456.76,
                    "close": 457.13,
                    "volume": 1157164,
                    "fixed_date": "Jul 28 2023 15:00",
                    "fixed_date_MMHH": "15:00"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690571700,
                    "open": 457.14,
                    "high": 457.27,
                    "low": 456.64,
                    "close": 456.67,
                    "volume": 2349415,
                    "fixed_date": "Jul 28 2023 15:15",
                    "fixed_date_MMHH": "15:15"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690572600,
                    "open": 456.67,
                    "high": 457.06,
                    "low": 456.45,
                    "close": 456.59,
                    "volume": 4001432,
                    "fixed_date": "Jul 28 2023 15:30",
                    "fixed_date_MMHH": "15:30"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690573500,
                    "open": 456.58,
                    "high": 457.18,
                    "low": 456.33,
                    "close": 456.91,
                    "volume": 10885154,
                    "fixed_date": "Jul 28 2023 15:45",
                    "fixed_date_MMHH": "15:45"
                  },
                  {
                    "date": "07-28-2023",
                    "date_utc": 1690574400,
                    "open": 456.92,
                    "high": 456.92,
                    "low": 456.92,
                    "close": 454.92,
                    "volume": 0,
                    "fixed_date": "Jul 28 2023 16:00",
                    "fixed_date_MMHH": "16:00"
                  }
                ],
                "profile": {
                  "longBusinessSummary": "The Trust seeks to achieve its investment objective by holding a portfolio of the common stocks that are included in the index (the “Portfolio”), with the weight of each stock in the Portfolio substantially corresponding to the weight of such stock in the index.",
                  "companyOfficers": [],
                  "maxAge": 86400,
                  "ask": 457,
                  "askSize": 31,
                  "averageDailyVolume10Day": 69356460,
                  "averageDailyVolume3Month": 78112745,
                  "bid": 456.95,
                  "bidSize": 8,
                  "bookValue": 429.22,
                  "currency": "USD",
                  "dividendDate": null,
                  "earningsTimestamp": null,
                  "earningsTimestampStart": null,
                  "earningsTimestampEnd": null,
                  "epsForward": null,
                  "epsTrailingTwelveMonths": 19.851322,
                  "exchange": "PCX",
                  "exchangeDataDelayedBy": 0,
                  "exchangeTimezoneName": "America/New_York",
                  "exchangeTimezoneShortName": "EDT",
                  "fiftyDayAverage": 436.1678,
                  "fiftyDayAverageChange": 20.752228,
                  "fiftyDayAverageChangePercent": 0.047578543,
                  "fiftyTwoWeekHigh": 459.44,
                  "fiftyTwoWeekHighChange": -2.519989,
                  "fiftyTwoWeekHighChangePercent": -0.0054849144,
                  "fiftyTwoWeekLow": 348.11,
                  "fiftyTwoWeekLowChange": 108.81003,
                  "fiftyTwoWeekLowChangePercent": 0.3125737,
                  "financialCurrency": "USD",
                  "forwardPE": null,
                  "fullExchangeName": "NYSEArca",
                  "gmtOffSetMilliseconds": -14400000,
                  "language": "en-US",
                  "longName": "SPDR S&P 500 ETF Trust",
                  "market": "us_market",
                  "marketCap": 419352969216,
                  "marketState": "CLOSED",
                  "messageBoardId": "finmb_6160262",
                  "postMarketChange": 0.08999634,
                  "postMarketChangePercent": 0.0196963,
                  "postMarketPrice": 457.01,
                  "postMarketTime": {
                    "timestamp": 1690588799,
                    "date": "2023-07-28 23:59:59.000000",
                    "timezone_type": 1,
                    "timezone": "+00:00"
                  },
                  "priceHint": 2,
                  "priceToBook": 1.0645357,
                  "quoteSourceName": "Delayed Quote",
                  "quoteType": "ETF",
                  "regularMarketChange": 4.43002,
                  "regularMarketChangePercent": 0.979032,
                  "regularMarketDayHigh": 457.775,
                  "regularMarketDayLow": 452.4918,
                  "regularMarketOpen": 455.88,
                  "regularMarketPreviousClose": 452.49,
                  "regularMarketPrice": 456.92,
                  "regularMarketTime": {
                    "timestamp": 1690574400,
                    "date": "2023-07-28 20:00:00.000000",
                    "timezone_type": 1,
                    "timezone": "+00:00"
                  },
                  "regularMarketVolume": 79852608,
                  "sharesOutstanding": 917782016,
                  "shortName": "SPDR S&P 500",
                  "sourceInterval": 15,
                  "symbol": "SPY",
                  "tradeable": false,
                  "trailingAnnualDividendRate": 5.662,
                  "trailingAnnualDividendYield": 0.012512985,
                  "trailingPE": 23.017107,
                  "twoHundredDayAverage": 406.4241,
                  "twoHundredDayAverageChange": 50.49591,
                  "twoHundredDayAverageChangePercent": 0.12424438
                }
              }
            
            
            setHistory((h: any) => testObj.history)
            setProfile((p: any) => testObj.profile)
            setIsLoadingHistory(false)
            setIsLoadingProfile(false)
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
        fetch(`/api/stocks/history?symbol=${symbol}&interval=5m`).then((res) => res.json()).then((data) => {
          setHistory((_: any) => data.history)
        })
      }
      else if(['6m', 'ytd', '1y', '5y', 'max'].includes(p) && ['1d', '5d', '1m'].includes(period)) {
        // load 1d data
        fetch(`/api/stocks/history?symbol=${symbol}&interval=1d`).then((res) => res.json()).then((data) => {
          setHistory((_: any) => data.history)
        })
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

    const isDown = () => history[0]?.close > history?.slice(-1)[0]?.close

    return (
        <div id="home-wrapper">
            <Header />
            {
                isLoadingHistory || isLoadingProfile ? (
                    <div id='news-spinner'>
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
                            <div className={`stock-price-change-percent ${ isDown() ? 'up-percent' : 'down-percent'}`}>{ isDown() ? <BsArrowUp /> : <BsArrowDown /> }&nbsp;{ profile?.regularMarketChangePercent.toFixed(2) }%</div>
                            <div className={`stock-price-change-dollar ${ isDown() ? 'up-dollar' : 'down-dollar'}`}>{ isDown() ? '+' : '-' }{ profile?.regularMarketChange.toFixed(2) } Today</div>
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