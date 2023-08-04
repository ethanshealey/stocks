type PeriodSwitcherProps = {
    onChange: Function
}

const PeriodSwitcher = ({ onChange }: PeriodSwitcherProps) => {

    const handleClick = (id: string) => {
        reset()
        document.getElementById(id)?.classList.add('period-switcher-button-active')
        onChange(id)
    } 

    const reset = () => {
        ['1d', '5d', '1m', '6m', 'ytd', '1y', '5y', 'max'].forEach((id) => {
            document.getElementById(id)?.classList.remove('period-switcher-button-active')
        })
    }

  return (
    <div id="period-switcher">
        <button id='1d' onClick={() => handleClick('1d')} className='period-switcher-button-active'>1D</button>
        <button id='5d' onClick={() => handleClick('5d')}>5D</button>
        <button id='1m' onClick={() => handleClick('1m')}>1M</button>
        <button id='6m' onClick={() => handleClick('6m')}>6M</button>
        <button id='ytd' onClick={() => handleClick('ytd')}>YTD</button>
        <button id='1y' onClick={() => handleClick('1y')}>1Y</button>
        <button id='5y' onClick={() => handleClick('5y')}>5Y</button>
        <button id='max' onClick={() => handleClick('max')}>MAX</button>
    </div>
  )
}

export default PeriodSwitcher