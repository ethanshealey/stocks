import React from 'react'

type NewsCardProps = {
    item: any,
    noTopPadding: boolean
}

const NewsCard = ({ item, noTopPadding }: NewsCardProps) => {

    const openLink = () => {
        window.open(item.link, '_blank')
    }

  return (
    <div className='news-card' style={{ marginTop: noTopPadding ? '-29.5px' : '' }}>
        <div className='news-header' onClick={openLink}>
            <h3 className='news-header-text'>{ item.source }</h3>
            <div className='news-header-border' />
        </div>
        <div className='news-body' onClick={openLink}>
            <p className='news-title'>{ item.title }</p>
            <img className='news-image' src={item.image} />
        </div>
        <div className='news-footer' onClick={openLink}>
            <p className='news-date'>{ new Date(item.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
        </div>
    </div>
  )
}

export default NewsCard