import React, { useEffect, useState } from "react";
import checkStringForLink from "../common/helper_functions";
import {NavLink} from 'react-router-dom';

function View() {
  const [feedList, setFeedlist] = useState([]);
  useEffect(() => {
    //https://newsapi.org/v2/everything?q=bitcoin&apiKey=ee90db4b0ba640ffa80f0b69b60c48e3
    fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=ee90db4b0ba640ffa80f0b69b60c48e3"
    )
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        console.log(data);
        //let arr = JSON.parse(data.articles);
        let arr = data.articles && data.articles.slice(0, 50);
        setFeedlist(arr);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="grid-container">
        <div className="item1">
          <h1>NEWS FEED</h1>
        </div>
        <div className="item3">
          <div className="view">
            {feedList.map((item, i) => (
              <div className="grid-item" key={item.publishedAt}>
                
                <h4>
                  <strong>{item.title}</strong>
                </h4><NavLink to={item.url} onClick={()=>window.open(item.url, '_blank').focus()}>
                <img
                  src={item.urlToImage}
                  height={150}
                  width={150}
                  alt="Source"
                /></NavLink>
                <div className="container">
                  <p>{checkStringForLink(item.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="item5">
          <span>newsfeed</span>
        </div>
      </div>
    </>
  );
}

export default View;
