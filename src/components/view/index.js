import React, { useEffect, useState } from "react";
import checkStringForLink from "../common/helper_functions";
import { NavLink } from "react-router-dom";
import ImageCard from "../ImageCard";
import { API_KEY } from "../../config";

function View() {
  const [feedList, setFeedlist] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");

  const defaultApi = `https://newsapi.org/v2/everything?q=in&apiKey=${API_KEY}`;

  useEffect(() => {
    getNewsFeeds(SearchTerm);
  }, []);

  const getNewsFeeds = async (param) => {
    let api = '';
    if(param) {
      api = `https://newsapi.org/v2/everything?q=${param}&apiKey=${API_KEY}`;
    }
    else {
      api = defaultApi;
    }
    console.log(param,api);
    try {
      fetch(
        api
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let arr = data.articles && data.articles.slice(0, 50);
          setFeedlist(arr);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const submit = (params) => {
    params.preventDefault();
    getNewsFeeds(SearchTerm);
  }

  return (
    <>
      <div className="grid-container">
        <div className="header">
          <div>
            <h3>NEWS FEED</h3>
          </div>
          <div className="container_search">
            <form className="nosubmit" onSubmit={submit}>
              <input
                className="nosubmit"
                type="search"
                placeholder="Search..."
                onChange={(e)=>setSearchTerm(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="main">
          <div className="main_header">
            <h1>The news feed you deserve...</h1>
            <h2>Showing results for {SearchTerm? SearchTerm:
              'Top headlines India'}</h2>
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
