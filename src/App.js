import React, {useState,useEffect, useRef} from 'react';
import {Route,Switch} from "react-router-dom";
import Entry from "./Components/Entries/index";
import "./App.css";
export const DataContext = React.createContext();

export default function App(){
  const [entries, setEntries] = useState([]);
  const [emo,setEmo]=useState([]);
  const [formData, setFormData] = useState({
    post:"",
    content:"",
    mood:"",
      day:"",
      month:"",
      year:"",
      characters:""
  });
  let isOpen=false;
  const getEnts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${window.localStorage.getItem(
          "username"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      const data = await response.json();
      console.log(data);
      setEntries([...data.entries]);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllEntries = async () =>{
    try{
      const result = await fetch("http://localhost:8080/entries");
      const data = await result.json();
      setEntries(data);
    } catch (err) {
      console.log(err);
    }
  };
const createEnt = async (e) =>{
  e.preventDefault();
  const body = {...formData};
  try{
    const response = await fetch("http://localhost:8080/entries", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(body)
    });
    const entry = await response.json();
    const addEntry = await fetch(
      "http://localhost:8080/users/addEntryToUser",
      {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          ...entry,
          token:window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username")
        })
      }
    );
    const data = await addEntry.json();
    setFormData({
      post:"",
      content:"",
      mood:"",
        day:"",
        month:"",
        year:"",
        characters:""
    });
    entry.character = await getEmo(entry.mood)
    console.log(data.entry.character)
  }catch(error){
    console.error(error);
  }finally{
    await getEnts();
  }
};

const deleteEntry = async (e,id)=>{
  try{
    const response = await fetch(`http://localhost:8080/entries/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data = await response.json();
  }catch(error){
    console.error(error);
  }finally{
    await getEnts();
  }
};

const updatedEnt = async(e,id)=>{
  try{
    const response = await fetch(`http://localhost:8080/entries/${id}`,{
      method: "PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify()
    });
    const data = await response.json();
  }catch(error){
    console.error(error);
  }finally{
    await getEnts();
  }
};
const onSubmit = (e) => {
  e.preventDefault();
  createEnt();
};



const getEmo = async (e) => {
  let data = null;
  let entry = getEnts;
  let hope = null;
  try{
    const response = await fetch(`https://emoji-api.com/emojis?access_key=da9690b4923ea4aa1ddb26f10ca0b6428db9c485`);

    data = await response.json();
        return response.character;
    
  }catch(error){
    console.error(error);
  }finally{
    await getEnts();
    console.log(hope);
    return hope.character;
  }
};



const checkbox = useRef(null);
  /* Authentication */
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...loginForm })
      });
      const data = await response.json();
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("username", data.username);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedIn(false);
  };
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getEnts();
    }
  }, [isLoggedIn]);

useEffect(()=>{
  getEmo();
},[]);



return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <h1>Hello. You're logged in</h1>
          <button onClick={handleLogout}>Log Out Here</button>
          <form
            onSubmit={createEnt}
            style={{
              border: "2px solid black",
              borderRadius: "25%",
              paddingBottom: "16px",
              boxShadow: "8px 8px 16px rgba(0,0,0, 0.3)"
            }}
          >
            <h3>Create Journal Entries Below</h3>
            <label>
              Post Title:{" "}
              <input
                type="text"
                id="post"
                value={formData.post}
                onChange={handleChange}
                placeholder={"enter title..."}
              ></input>{" "}
            </label>
            <br />
            <label>
            Body:{" "}
              <input
              style={{
                height: "500px",
                width:"500px",
                textAlign: "top",
                backgroundColor:"#0f1114",
                color:"white"
              }}
                type="text"
                id="content"
                value={formData.content}
                onChange={handleChange}
                placeholder={"enter body..."}
              ></input>{" "}
            </label>
            <br />

            <label>
            <input
              type="text"
              id="mood"
              value={formData.mood}
              onChange={handleChange}
              placeholder={"enter your mood"}
              ></input>{" "}
              </label>
            <br />
            <div className="setdate" style={{
              alignContent:"center"
            }}>
            <label>
              Date:{" "}
              <input
                type="text"
                id="day"
                value={formData.day}
                onChange={handleChange}
                placeholder={"DD"}
                style={{
                  width:"25px"
                }}
              ></input>{" "}
              <input                
                type="text"
                id="month"
                value={formData.month}
                onChange={handleChange}
                placeholder={"MM"}
                style={{
                  width:"25px"
                }}
              ></input>{" "}
              <input                
                type="text"
                id="year"
                value={formData.year}
                onChange={handleChange}
                placeholder={"YYYY"}
                style={{
                  width:"50px"
                }}
              ></input>{" "}
            </label>
            <input type="submit"></input>
            </div>
          </form>
          {/* <main>
          <Route 
        path="/url/:id"
        render={(routerProps)=>{
          const dod = [...entries].filter(
            (p)=> p.id === routerProps.match.params.id
          );
          return <Entry {...routerProps} entries={dod[0]}/>
        }}
        />
        </main> */}
          {entries.map((entry) => {
            return (
              <div style={{
                display:"flex",
                justifyContent:"flex-start"
                }} key={entry._id}>
                <h1 className="idk">{entry.post}</h1>
                <h3 className="idk" style={{
                  fontSize:"15px",
                  color:"gray"
                }}>{entry.day}/{entry.month}/{entry.year}</h3>
                <div className="buttoncontainer">
                  <button className="booton"
                  onClick={(e) => {
                   deleteEntry(e, entry._id);
                  }}
                  style={{
                    backgroundColor:"transparent",
                    border:"0px",
                    height:"20px"
                  }}
                  ><img src="https://i.imgur.com/Y9CatNz.png" style={{
                    height:"20px",
                    width:"20px"
                  }}></img></button>

                <button className="booton"
                style={{
                  height:"20px",
                  width:"75"
                }}
                onClick={async (e)=>{
                  if(isOpen===false){
                  let temp = document.querySelector(".changeit")
                  temp.innerText=entry.content;
                  const dod = [...emo].filter(
                    (p)=> p.id === emo.match.params.blockInner.arrElem.blockInner.unicodeName
                  );
                  let timtim = document.querySelector(".changethat")
                  timtim.innerText= await getEmo(entry.mood);
                  console.log( await getEmo(entry.character))
                  isOpen=true;
                  console.log(isOpen);
                  }
                  else{
                    let temp = document.querySelector(".changeit")
                    temp.innerText='';
                    let timtim = document.querySelector(".changethat")
                    timtim.innerText=" ";
                    isOpen=false;
                    console.log(isOpen);
                  }
                }}
                >Read Entry</button>
                </div>
                
                
              </div>
            );
          })}
        </>
      ) : (
        <>
          <center>
            <h1>Log In To Journals</h1>
        </center>
          <form onSubmit={handleLogin}>
            <label>
              {" "}
              Username:{" "}
              <input
                type="text"
                id="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                />
            </label>
            <br />
            <br />
            <label>
              {" "}
              Password:{" "}
              <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                />
            </label>
            <br />
            <input type="submit" />
          </form>
        </>
      )}
      <p className="changethat" style={{
        display:"flex",
        justifyContent:"flex-end",
        alignContent:"center",
        marginTop:"-100px",
        marginRight:"25%",
      }}>{""}</p>
      <h2 className="changeit" style={{
        display:"flex",
        flexWrap:"wrap",
        fontSize:"150%",
        justifyContent:"flex-end",
        marginBottom:"50px",
        paddingBottom:"50px",
        marginRight:"25px",
      }}>
        {""}
      </h2>
    </div>
  );
}
