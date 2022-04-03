import React from "react";
import { NavLink } from "react-router-dom";

function ImageCard({ src, title, description, url, author, source }) {
  return (
    <>
      <div className="card">
        <div className="card__header">
          <img
            src={src}
            alt="card__image"
            className="card__image"
            width="600"
          />
        </div>
        <div className="card__body">
          <NavLink to={url} onClick={() => window.open(url, "_blank").focus()}>
            <h4>{title}</h4>
          </NavLink>
          {/* <p>{description}</p> */}
        </div>
                  <div className="card__footer">
            <div className="user">
              <div className="user__info ">
                <h5>{author ? `${author} : ` : ''}{source ? source : ''}</h5>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default ImageCard;
