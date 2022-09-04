import React, { useContext, useEffect, useState } from "react";

const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [news, setNews] = useState([]);
    const [isError, setIsError] = useState({ show:"False", msg:"" });

    const getMovie = async (url) =>{
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.totalResults !== 0){
                setNews(data.articles);
                setIsError({
                    show: "False",
                    msg: "",
                });
            }else{
                setIsError({
                    show: "True",
                    msg: "API is unable to fetch data",
                });
            }
        }
        catch(error){}
    }

    useEffect(() => {
            getMovie(API_URL);
    });
    return (
        <AppContext.Provider value={ {news, isError} }>
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };