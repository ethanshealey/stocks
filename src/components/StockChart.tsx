import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import convertLargeNumber from '@/helpers/convertLargeNumber'

type StockChartProps = {
    history: any,
    profile: any,
    period: string
}

const StockChart = ({ history, profile, period }: StockChartProps) => {

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

    const isDown = () => history[0]?.close > history?.slice(-1)[0]?.close
    
    const formatXAxisDate = (value: any, index: any): string => {

        let tick = '';

        if(period === '1d')
            tick = value.split(' ')[3]
        else if(period === '5d')
            tick = new Date(value).toString().split(' ')[0]
        else if(period === '1m')
            tick = value.split(' ')[0] + ' ' + value.split(' ')[1]
        else
            tick = value.split(' ')[3]

        return tick
    }

    const formatMinThickGap = () => {
        if(period === '1d') return 50
        else if(period === '5d') return 220
        else if(period === '1m') return 35
        return 50
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
                <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ isDown() ? '#992e2e' : '#499642' } stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={ '#050505' } stopOpacity={0}/>
                </linearGradient>
                </defs>
                <XAxis dataKey="fixed_date" stroke="#def2de" tickFormatter={formatXAxisDate} interval={"preserveStart"} minTickGap={formatMinThickGap()} />
                <YAxis dataKey="close" domain={['dataMin', 'dataMax']} stroke="#def2de" type='number' interval={0} tickCount={5} />
                <Tooltip content={customTooltip} />
                <Area type="monotone" animationDuration={50} animationEasing='linear' dataKey="close" stroke={ isDown() ? '#992e2e' : '#499642' } fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default StockChart