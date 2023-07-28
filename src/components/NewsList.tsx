import React from 'react'
import NewsCard from './NewsCard'

type NewsListProps = {
    news: any[]
}

const NewsList = ({ news }: NewsListProps) => {
  return (
    <div id="news-list">
        {
            news.slice(0, 10).map((newsItem, i) => (
                <NewsCard key={newsItem.guid + `${i}`} item={newsItem} noTopPadding={i === 0} />
            ))
        }
    </div>
  )
}

export default NewsList