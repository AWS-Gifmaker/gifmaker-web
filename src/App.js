import './App.css';
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import { DetailsView } from './DetailsView'
import { SearchForm } from './SearchForm'
import FileUploadForm from './FileUploadForm'

class GifResponse {
  name;
  url;
  key;
  visits;
  tags;
}
function App() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([])
  const [selectedGif, setSelectedGif] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const env = process.env.REACT_APP_STAGE;

  const getApiUrl = () => 'https://avl72k250m.execute-api.us-east-1.amazonaws.com/dev';
  const url = env == 'dev' ? `http://localhost:8000` : getApiUrl();

  const handleSearch = () => {
    getGifs();
  }
  const getGifs = () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json' },
    }
    const tags = query.split(',');

    var params = new URLSearchParams();
    tags.length == 1 && params.append("name", tags[0]);
    tags.length != 1 && params.append("tags", tags);
    const getGifsUrl = url + "/gifs?" + params;

    fetch(getGifsUrl, options)
      .then(response => response.json())
      .then((data) => {
        const mappedData = data.gifs.map(x => {
          const gif = new GifResponse();
          gif.url = x.image_url.S;
          gif.name = x.name.S;
          gif.key = x.key.S;
          return gif;
        });
        data.gifs ? setGifs(mappedData) : setGifs([]);
      });
  }
  const showDetails = (gif) => {
    setSelectedGif(gif);
    setModalShow(true);
  }
  const displayGif = (gif) => {
    console.log(gif);
    return gif ?
      <Col sm={3} key="{gif.name}">
        <Card style={{ width: '15rem', height: '15rem' }} >
          <Card.Body>
            <Card.Title>{gif.name}</Card.Title>
            <div className="container container-full">
              <div className="container-full div-center">
                <Image src={gif.url} fluid />
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => showDetails(gif)} >Details</Button>
          </Card.Footer>
        </Card>
      </Col>
      : null;
  }

  return (
    <div className="app">
      <Container className="p-3">
        <Jumbotron>
          <h3 className="App-header">
            Upload video and convert it to gif:
          </h3>
          <FileUploadForm url={url} />
        </Jumbotron>
        <Jumbotron>
          <SearchForm query={query} handleSearch={handleSearch} setQuery={setQuery} />
        </Jumbotron>
        <Jumbotron>
          <Row>
            {gifs.map(x => displayGif(x))}
          </Row>
        </Jumbotron>
        <DetailsView
          gif={selectedGif}
          url={url}
          show={modalShow}
          onHide={() => setModalShow(false)} />

      </Container>
    </div>
  );
}

export default App;
