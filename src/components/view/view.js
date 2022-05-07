import React, { useEffect, useState } from "react";
import { API_KEY } from "../../config";
import checkStringForLink from "../common/helper_functions";
import ImageCard from "../ImageCard";
import "./styles.scss";

const Footer = () => {
  return (
    <footer>
      <div className="bottom-container">
        <p className="copyright">© 2022 Akhil Surya A.</p>
      </div>
    </footer>
  );
};

export default function App() {
  const [feedList, setFeedlist] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const defaultApi = `https://newsapi.org/v2/everything?q=in&apiKey=${API_KEY}`;

  useEffect(() => {
    setFeedlist([]);
    getNewsFeeds(SearchTerm);
  }, []);

  const getNewsFeeds = async (param) => {
    let api = "";
    setLoading(true);
    if (param) {
      api = `https://newsapi.org/v2/everything?q=${param}&apiKey=${API_KEY}`;
    } else {
      api = defaultApi;
    }
    //console.log(param, api);
    try {
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          if (data && data.articles && data.articles.length > 0) {
            let arr = data.articles && data.articles.slice(0, 50);
            setFeedlist(arr);
            setLoading(false);
          } else {
            setFeedlist([]);
          }
        })
        .catch((err) => {
          setFeedlist([]);
          setLoading(false);
          console.log(err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const submit = (params) => {
    params.preventDefault();
    getNewsFeeds(SearchTerm);
  };

  return (
    <div id="app">
      <header>
        <div>
          <h1>NEWS FEED</h1>
        </div>
        <div className="container_search">
          <form className="nosubmit" onSubmit={submit}>
            <input
              className="nosubmit"
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </header>
      <main>
        <div>
          <>
            <div className="main_header">
              {/* <h2>The news feed you deserve...</h2> */}
              <h3>
                Showing results for{" "}
                <span className="main_header string">
                  {SearchTerm ? `"${SearchTerm}"` : `"Top headlines India"`}
                </span>
              </h3>
            </div>
          </>
          {loading ? (
            <div className="load_div">
              {" "}
              <div className="dot-elastic"></div>
            </div>
          ) : feedList.length > 0 ? (
            <div className="wrapper">
              {feedList.map((item, i) => (
                <div className="grid-item" key={item.publishedAt}>
                  <ImageCard
                    source={item.source && item.source.name}
                    author={item.author}
                    url={item.url}
                    src={item.urlToImage}
                    title={item.title}
                    description={checkStringForLink(item.description)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h1>No Data Found...</h1>
            </div>
          )}
        </div>
        <Footer />
      </main>{" "}
    </div>
  );
}
