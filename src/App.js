import logo from './logo.svg';
import './App.css';
import {Row, Col,Container, InputGroup, FormControl, Button, Form, FormGroup, Jumbotron} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'

function App() {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const url = `http://localhost:8000`;    

  const handleSearch = () => {
      console.log("searching tags  " + query);
      getGifs();
  }
  const getGifs = () => {
      const gifsUrl = url + "gifs";
      const options = {
        method: 'GET',
        headers: {accept: 'application/json'},
      }
      const tags = query.split(',');
      console.log(tags);
      var params = new URLSearchParams();
      tags.length == 1 && params.append("name", tags[0]);
      tags.length != 1 && params.append("tags", tags);
      const getGifsUrl = url + "/gifs/" + params;

      fetch(getGifsUrl, options)
      .then(response => response.json())
      .then((data) => console.log(data));
  }

  const uploadFile = () => {
    var reader = new FileReader();
    reader.onload = (e) => {
      if(e.target.readyState != 2) return;
      if(e.target.error) {
          alert('Error while reading file');
          return;
      }
      const fileEncoded = e.target.result;
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', accept: 'application/json'},
        body: JSON.stringify({
          name: name,
          image_file: fileEncoded
        })
      }
      const createGifUrl = url + "/gifs/create";
      fetch(createGifUrl, options)
      .then(response => response.json())
      .then((data) => console.log(data));
    }
    reader.readAsText(file);
  }
  const fileUploadSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log("validating");
    if (form.checkValidity() === false) {
    console.log("invalid");
      event.stopPropagation();
    }
    //upload to bucket
    console.log("name " + name);
    console.log("file " + file);
    uploadFile();
  }
  const isValidForm = file && name;
  return (
  <div className="app">
    <Container className="p-3">
        <Jumbotron>
          <h3 className="App-header">
            Upload video and convert it to gif:
          </h3>
        <Form onSubmit={fileUploadSubmit} validated={ file && name} >
            <Form.Group as={Row} class="mb-3">
              <Form.Label column sm="2">
                Video
              </Form.Label>
              <Col sm="10">
              <Form.File 
              id="image_file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{marginTop: 10}}
              accept="video/mp4,video/x-m4v,video/*" />
              </Col>
             </Form.Group>
             <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
              <Form.Control type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
              </Col>
             </Form.Group>
             <Button disabled={!isValidForm} variant="primary" type="submit">Convert</Button>
        </Form>
        </Jumbotron>
        <Jumbotron>
          <h3 className="App-header">
            Search for gifs:
          </h3>
          <InputGroup className="mb-3">
           <FormControl
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="comma separated tags..."
            aria-label="comma separated tags..."
            aria-describedby="basic-addon1"/>
           <InputGroup.Append>
              <Button variant="primary" onClick={handleSearch}>Search</Button>
           </InputGroup.Append>
          </InputGroup>
        </Jumbotron>
    </Container>
</div>
  );
}

export default App;
