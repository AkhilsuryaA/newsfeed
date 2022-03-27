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

  return (
    <>
      <div className="grid-container">
        <div className="header">
          <h1>NEWS FEED</h1>
        </div>
        <div className="main">
          <div className="wrapper">
            {feedList.map((item, i) => (
              <div className="grid-item" key={item.publishedAt}>
                <ImageCard author={item.author} url={item.url} src={item.urlToImage} title={item.title} description={checkStringForLink(item.description)} />
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
            ))}
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
