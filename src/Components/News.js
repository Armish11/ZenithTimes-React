import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({
  apiKey,
  setProgress,
  category = 'general',
  mode,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const capitalizeFLetter = (string) => {
    return string.replace(/^\w/, (c) => c.toUpperCase());
  };

  const fetchNews = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const updateNews = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=8&apikey=${apiKey}`;

    setProgress(10);
    const data = await fetchNews(url);
    if (data) {
      setArticles(data.articles || []);
      setTotalArticles(data.totalArticles || 0);
    }
    setLoading(false);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&offset=${page * 8}&max=8&apikey=${apiKey}`;

    setPage((prevPage) => prevPage + 1);
    setLoading(true);

    const data = await fetchNews(url);
    if (data) {
      const newArticles = data.articles.filter(
        (newArticle) =>
          !articles.some(
            (existingArticle) =>
              existingArticle.url === newArticle.url ||
              existingArticle.title === newArticle.title
          )
      );

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setTotalArticles(data.totalArticles);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalizeFLetter(category)} - ZenithTimes`;
    updateNews();
  }, [category, apiKey]);

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0px', marginTop: '90px', color: mode === 'dark' ? 'white' : 'black' }}>
        ZenithTimes - Top {capitalizeFLetter(category)} Headlines
      </h1>
      {loading && <Spinner mode={mode} />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={loading && <Spinner mode={mode} />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem article={article} mode={mode} />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
  category: PropTypes.string,
  mode: PropTypes.string,
};

export default News;
