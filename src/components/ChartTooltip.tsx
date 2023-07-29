import { useEffect } from 'react'

type ChartTooltipProps = {
    active: boolean,
    payload: any,
    label: any
}

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {

    useEffect(() => {
        console.log(active, payload, label)
    }, [])

  return (
    <div>ChartTooltip</div>
  )
}

export default ChartTooltip