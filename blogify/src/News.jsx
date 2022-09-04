import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


{/* <CircularProgress color="inherit" /> */}
// 6ad3f8cc7c23455299d777fc507a1e37
const News = () => {
    const [data, setData]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // https://newsapi.org/v2/top-headlines?country=in&apiKey=6ad3f8cc7c23455299d777fc507a1e37
    
    useEffect(()=>{
      const getNews = () => {
        axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=6ad3f8cc7c23455299d777fc507a1e37")
        .then((resp)=>{
            setData(resp.data.articles);
            setLoading(false);
        })
        .catch(()=>{
          setError(true);
          setLoading(false);
        })
    }
        getNews();
    })
    if (loading === true){
        return (
            <>
                <CircularProgress color="inherit" />
            </>
        );
    }
    if (error){
      return (
        <>
          <div className="news-title">Not able to fetch data from News API</div>
        </>
      );
    }
    return (
        <>
        
          <div className="news">
            {data.map((e)=>{
                return (
                    <>
                    <a href={e.url}>
                      <div className="news-title" key={e.title}>{e.title}</div>
                      <div className="news-image" key={e.title}>
                        <img src={e.urlToImage} alt={e.urlToImage} />
                      </div>
                      </a>
                    </>
                );
            })}
            </div>
            
        </>
    );
}

export default News;