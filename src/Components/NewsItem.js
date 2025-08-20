
import React from 'react';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source, mode } = props;

  const defaultImageUrl = "https://img.jagranjosh.com/images/2024/June/2462024/asteroid-strike-earth-in-14-years-nasa-discovery.jpg";
  const imgSrc = imageUrl ? imageUrl : defaultImageUrl;

  let myStyle = {
    color: mode === 'dark' ? 'white' : 'black',
    backgroundColor: mode === 'dark' ? 'rgb(57 61 68)' : 'white',
  };

  // function to trim description to specific word length
  const trimDescription = (text, wordLimit) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    return words.length > wordLimit 
      ? words.slice(0, wordLimit).join(" ") + "..." 
      : text;
  };

  return (
    <div className="my-3">
      <div className="card" style={myStyle}>
        <img src={imgSrc} className="card-img-top" alt="news" />
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: '0', right: '0' }}>
            <span className="badge rounded-pill bg-danger" style={{color: mode === 'dark' ? 'white' : 'black'}}>
              {source}
            </span>
          </div>

          <h5 className="card-title">{title ? title : "No title Available "}</h5>
          <p className="card-text">{trimDescription(description, 20)}</p> {/* limit to 20 words */}
          <p className="card-text">
            <small className="text-danger">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small>
          </p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className={`btn btn-sm ${mode === 'dark' ? 'btn-light' : 'btn-dark'}`}>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
