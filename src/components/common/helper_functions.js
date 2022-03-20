const checkStringForLink = (str) => {
  let sr = str.includes("<a") && str.includes("</a>");
  if (sr) {
    let val = str;
    let start = val.indexOf("<a");
    let first = val.slice(0, start);
    return <>{first}...</>;
  } else {
    return str;
  }
};

export default checkStringForLink;
