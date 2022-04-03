import React, { useEffect, useState } from "react";
import checkStringForLink from "../common/helper_functions";
import { NavLink } from "react-router-dom";
import ImageCard from "../ImageCard";

function View() {
  const [feedList, setFeedlist] = useState([]);
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=ee90db4b0ba640ffa80f0b69b60c48e3"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let arr = data.articles && data.articles.slice(0, 50);
        setFeedlist(arr);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = async (param) => {
    console.log(param);
  };

  return (
    <>
      <div className="grid-container">
        <div className="header">
          <div>
            <h3>NEWS FEED</h3>
          </div>
          <div className="container_search">
            <form className="nosubmit">
              <input
                className="nosubmit"
                type="search"
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
        <div className="main">
          <div className="main_header">
            <h1>The news feed you deserve...</h1>
          </div>
          <div className="wrapper">
            {feedList.length > 0 ?
            feedList.map((item, i) => (
              <div className="grid-item" key={item.publishedAt}>
                <ImageCard
                  source={item.source && item.source.name}
                  author={item.author}
                  url={item.url}
                  src={item.urlToImage}
                  title={item.title}
                  description={checkStringForLink(item.description)}
                />
                {/* <h4>
                  <strong>{item.title}</strong>
                </h4>
                <NavLink
                  to={item.url}
                  onClick={() => window.open(item.url, "_blank").focus()}
                >
                  <img
                    src={item.urlToImage}
                    height={150}
                    width={150}
                    alt="Source"
                  />
                </NavLink>
                <div className="container">
                  <p>{checkStringForLink(item.description)}</p>
                </div> */}
              </div>
            ))
            : 
            <div>
              No Data
          </div>}
          </div>
        </div>

        <div className="footer">
          <span>newsfeed</span>
        </div>
      </div>
    </>
  );
}

export default View;
