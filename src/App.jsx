import React, { useState } from "react";
import axios from "axios";


function App() {
  const [inputValue, setInputValue] = useState("");
  const [artistResult, setartistResult] = useState("");
  const [albumCover, setalbumCover] = useState("");
  const [songResult, setsongResult] = useState("");
  const [songurl, setsongurl] = useState("");
  const [dataReceived, setDataReceived] = useState(false);
  const handleInputChange = (event) => {
  
    setInputValue(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/search",
      params: { term: inputValue, locale: "en-US", offset: "0", limit: "5" },
      headers: {
        "X-RapidAPI-Key": "fdcb6e0debmshdf5fa0d4d30cdfcp1bea84jsn7b85c735777d",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.artists.hits[0].artist.name);
        console.log(response.data.tracks.hits[0].track.images.coverart);
        setartistResult(response.data.artists.hits[0].artist.name);
        setalbumCover(response.data.tracks.hits[0].track.images.coverart);
        setsongResult(response.data.tracks.hits[0].track.title);
        setsongurl(response.data.tracks.hits[0].track.url)
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
     
        setDataReceived(true);
    }
  

  return (
    <>
      {" "}
      <div className="song">
       <center>
        
         <h1>
          <img What src="../public/walkman.png" height="50px" width="50px" />{" "}
          What's That Song?
        </h1>
        <center>
          {" "}
          <form onSubmit={handleSubmit}>
            <label>
              Enter lyrics or hum a melody:
              <br />
              <br />
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />

            <button type="submit">Search</button>
          </form>
         
          <div>
            
            <div>
      {dataReceived ? (
       <> <h2 className="title">Song Name : {songResult}</h2>
          <h2 className="artist">Artist Name : {artistResult}</h2>
        <h2>Album Cover</h2>
        <div className="spotify-card">    
          <img src={albumCover} alt="Enter song name to get Spotify album artwork" />
          <div className="details">
            <br></br>
            <a href={songurl} target="_blank" className="button">
              Get song details
            </a>
          </div>
        </div></>
      ) : (
        <p>Enter song name to get data.......</p>
      )}
    </div>
           
          </div>
        </center>


        </center>
      </div>

    </>
  );
}

export default App;
