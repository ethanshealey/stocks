import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import convertLargeNumber from '@/helpers/convertLargeNumber'

type StockChartProps = {
    history: any,
    profile: any
}

const StockChart = ({ history, profile }: StockChartProps) => {

    const customTooltip = ({ active, payload, label }: any) => {
        if(active && payload && payload.length) {
            return (
                <div className='tooltip'>
                    <h3>${ payload[0].payload.close.toFixed(2) }</h3>
                    <p>{ payload[0].payload.fixed_date }</p>
                    <p>Volume: { convertLargeNumber(payload[0].payload.volume) }</p>
                </div>
            )
        }
            
    }

  return (
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={history}>
            <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ profile?.regularMarketChange >= 0 ? '#499642' : '#992e2e' } stopOpacity={0.8}/>
                <stop offset="95%" stopColor={ '#050505' } stopOpacity={0}/>
            </linearGradient>
            </defs>
            <XAxis dataKey="fixed_date" stroke="#def2de" />
            <YAxis dataKey="close" domain={[]} stroke="#def2de" />
            <Tooltip content={customTooltip} />
            <Area type="monotone" animationDuration={50} animationEasing='linear' dataKey="close" stroke={ profile?.regularMarketChange >= 0 ? '#499642' : '#992e2e' } fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default StockChart