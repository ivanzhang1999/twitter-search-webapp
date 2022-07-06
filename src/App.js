import './App.css';
import {useState, useEffect} from 'react'
import {Card, Form, Row} from "react-bootstrap"
import {Button} from "react-bootstrap"
import axios from "axios"

const api = axios.create({
  baseURL: 'https://randomuser.me/api/'
})

function App() {
  const [tweets, setTweets] = useState([]);
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("");

  const handleGetTweets = async () => {
    const baseURL = `http://localhost:8080/query?search=${query}&type=${queryType}`
    await axios.get(baseURL).then(res=> {
      setTweets(res.data)
    }).catch(err => {
      console.error(err)
    })
    console.log(tweets)
  }

  const renderTweets = (tweets) => {
    return(
        <Card className="text-center" style={{marginTop: 20}}>
        <Card.Header>score: {tweets.score}</Card.Header>
          <Card.Body>
          <Card.Title>@{tweets.username}</Card.Title>
          <Card.Text>
            {tweets.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{tweets.location}</Card.Footer>
      </Card>
    )
  }
  const userEntersQuery = (e) => {
    setQuery(e.target.value)
  }
  const userChoosesQueryType = (e) => {
    setQueryType(e.target.value)
  }

  return (
    
    <div className="App">
      <div className="background">
        <div className="text-box">
          
        <Form>
          <Form.Group className="mb-3" controlId="query" onChange={userEntersQuery}>
            <Form.Label>Enter Twitter query below</Form.Label>
            <Form.Control type="query" placeholder="Enter query" />
          </Form.Group>
        </Form>
        </div>
      
      <input type="radio" value= "username" id="username"
              onChange={userChoosesQueryType} name="queryType" />
            <label className="prompt-text" for="username">username</label>
            <input type="radio" value= "text" id="text"
              onChange={userChoosesQueryType} name="queryType" />
            <label className="prompt-text" for="text">text</label> 
      <Button className="btn-font" variant="outline-light" onClick={handleGetTweets}>
        Search
      </Button>
      
        <div className="tweets">
          {tweets.map(tweet => renderTweets(tweet))}
        </div>
      </div>
    </div>
  );
}

export default App;
