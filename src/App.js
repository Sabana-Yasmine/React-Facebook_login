import React, {useState} from "react";
import FacebookLogin from "react-facebook-login";
import './App.css';

function App() {

  const [login, setlogin] = useState(false);
  const[data, setdata] = useState({});
  const [picture, setpicture] = useState("")

  const responseFacebook = (Response) => {
    if(Response.status == "unkonwn"){
      console.log(Response)
      setlogin(false)
      return false
    }
    setdata(Response)
    setpicture(Response.picture.data.url)
    if(Response.accessToken){
      setlogin(true)
    }else{
      setlogin(false)
    }
  }

  const logout = () => {
    setlogin(false)
    setdata({})
    setpicture("")
  }

  return (
    <div className="App">
     {!login && (
        <FacebookLogin
          appId="569720507786195"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}

      {login && (
        <div className="card">
          <div className="card-body">
            <img className="rounded" src={picture} alt="Profile" />
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">Email ID: {data.email}</p>
            <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
