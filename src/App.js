import logo from './logo.svg';
import './App.css';
import {Container, InputGroup, FormControl, Button, Form, FormGroup, Jumbotron} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'

function App() {
  const [query, setQuery] = useState("");
  const handleSearch = () => {
      const tags = query.split(',');
      //query lambda
      console.log("searching tags  " + query);
  }
  const fileUploadSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //upload to bucket
      console.log("uploading file" + form);
  }
  return (
  <div className="app">
    <Container className="p-3">
        <Jumbotron>
          <h3 className="App-header">
            Upload video and convert it to gif:
          </h3>
        <Form onSubmit={fileUploadSubmit}>
            <Form.Group>
              <Form.File id="file1" label="" accept="video/mp4,video/x-m4v,video/*" />
             </Form.Group>
             <Button variant="primary">Convert</Button>
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
