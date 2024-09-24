import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

// Destructure props with default values directly in the function signature
const News = ({
  apiKey,
  setProgress,
  category = 'general',
  country = 'pk',
  max = 8,
  mode,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const capitalizeFLetter = (string) => {
    return string.replace(/^\w/, (c) => c.toUpperCase());
  };

  const updateNews = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=${max}&apikey=06220513dde50b713ae8c2e0e0ce15bb`;

    try {
      setProgress(10);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setProgress(30);

      setArticles(data.articles || []);
      setTotalArticles(data.totalArticles || 0);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFLetter(category)} - ZenithTimes`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]); // Dependency array includes category to re-fetch news when the category changes

  const fetchMoreData = async () => {
    const offset = page * max; // Calculating offset based on page and max number of articles
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&offset=${offset}&country=${country}&max=${max}&apikey=06220513dde50b713ae8c2e0e0ce15bb`;
    
    setPage(page + 1);
    setLoading(true);

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      // Filter out duplicate articles based on URL and title
      const newArticles = parsedData.articles.filter(
        (newArticle) =>
          !articles.some(
            (existingArticle) =>
              existingArticle.url === newArticle.url ||
              existingArticle.title === newArticle.title
          )
      );

      setArticles([...articles, ...newArticles]);
      setTotalArticles(parsedData.totalArticles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching more data:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0px', marginTop: '90px', color: mode === 'dark' ? 'white' : 'black' }}>
        ZenithTimes - Top {capitalizeFLetter(category)} Headlines
      </h1>
      {loading && <Spinner mode={mode} />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData} // Pass the function reference, not the result
        hasMore={articles.length !== totalArticles}
        loader={loading && <Spinner mode={mode} />}
      >
        <div className="container my-3">
          <div className="row">
            {articles &&
              articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.image}
                    newsUrl={element.url}
                    author={element.source.name}
                    date={element.publishedAt}
                    source={element.source.url}
                    mode={mode}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  max: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
  mode: PropTypes.string, // Added mode prop to propTypes
};

export default News;
