import { ChangeEventHandler, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { toast } from 'react-hot-toast';

type QuoteSearchProps = {
  search: Function,
  loadDefault: Function
}

const QuoteSearch = ({ search, loadDefault }: QuoteSearchProps) => {

  const [ query, setQuery ] = useState('')

  const handleSearch = (e: any) => {
    e?.preventDefault()
    if(query.length === 0) {
      // toast.error('Please enter a valid value before searching...', {
      //   style: {
      //     borderRadius: '10px',
      //     background: '#333',
      //     color: '#fff',
      //   },
      // })
      return loadDefault()
    }
    search(query)
  }

  const handleInput = (e: any) => {
    e.preventDefault()
    if(e.key === 'Enter') 
      handleSearch(undefined)
    else
      setQuery(e.target.value)
  }

  return (
    <form className="nosubmit" onSubmit={handleSearch}>
      <AiOutlineSearch onClick={handleSearch} style={{ cursor: 'pointer', position: 'relative' }} />
      <input className="nosubmit" value={query} onChange={handleInput} type="search" placeholder="Search..." />
    </form>
  )
}

export default QuoteSearch