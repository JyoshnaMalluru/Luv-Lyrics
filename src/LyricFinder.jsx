import React,{ useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './LyricFinder.css';

export default function LyricFinder(){

    const [artist,setArtist] = useState("");
    const [song,setSong] = useState("");
    const [lyrics,setLyrics] = useState("");
    const [error,setError] = useState("");
    const [err,setErr] = useState("");

    const buttonStyle ={
        backgroundColor : "#f5f5f5",
        color : "#424242",
        padding : "1rem 1.5rem 0.8rem 1.5rem"
    }

    const validSinger = () => {
        if (!artist) {
            setError('Singer Name cannot be empty');
            return false;
          }
          setError('');
          return true
    }

    const validSong = () => {
        if (!song) {
            setErr('Song Name cannot be empty');
            return false;
          }
          setErr('');
          return true
    }

    const searchLyrics = async() => {
        const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setLyrics(data.lyrics);
            } else{
                console.log("Lyrics not found");
                setLyrics(<h1>Lyrics not found</h1>);
            }
        }catch(error){
            console.error('Error fetching lyrics:', error);
            setLyrics(<h1>Lyrics not found</h1>);
        }
    }

    const handleSubmit = () => {
        const isValidSinger = validSinger();
        const isValidSong = validSong();
        if(isValidSinger && isValidSong){
            searchLyrics();
        }
    }
    return(
        <div className="background">
            <h1 style={{color: "aliceblue",fontSize:"5rem",opacity: "0.8"}}>Luv Lyrics</h1>
            <TextField 
                color="grey"
                className="input"
                id="outlined-basic" 
                label="Singer Name" 
                variant="outlined" 
                type="text"
                placeholder="Singer Name"
                value={artist}
                onChange={(e) => {setArtist(e.target.value)}}
                focused
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: '#f5f5f5',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#f5f5f5',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f5f5f5',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f5f5f5',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f5f5f5',
                    },
                }}
                error={!!error}
                helperText={error}
             />
             &nbsp;
            <TextField 
                color="grey"
                className="input"
                id="outlined-basic"
                label="Song Name" 
                variant="outlined" 
                type="text"
                placeholder="Song Name"
                value={song}
                onChange={(e) => {setSong(e.target.value)}}
                focused
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: '#f5f5f5',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#f5f5f5',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f5f5f5',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f5f5f5',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f5f5f5',
                    }
                }}
                error={!!err}
                helperText={err}
             />
              &nbsp;
            <Button onClick={handleSubmit} variant="contained" size="large" style={buttonStyle}>Search</Button>
            <div className="lyric">
            <pre><h1>Lyrics</h1>{lyrics}</pre>
            </div>
        </div>
    );
}