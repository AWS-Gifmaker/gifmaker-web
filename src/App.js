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
  const [loading, setLoading] = useState(false);

  const env = process.env.REACT_APP_STAGE;

  const getApiUrl = () => 'https://avl72k250m.execute-api.us-east-1.amazonaws.com/prod';
  const url = env == 'dev' ? `http://localhost:8000` : getApiUrl();

  const getGifs = (byName, topGifs = false) => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json' },
    }
    let getUrl = url;
    if (topGifs) {
      getUrl = url + '/top-gifs/overall';
    } else {
      var params = new URLSearchParams();
      byName && params.append("name", query);
      !byName && params.append("tags", query);
      getUrl = url + "/gifs?" + params;
    }
    setLoading(true);
    fetch(getUrl, options)
      .then(response => response.json())
      .then((data) => {
        const mappedData = data?.gifs?.map(x => {
          const gif = new GifResponse();
          gif.url = x.image_url?.S;
          gif.name = x.name?.S;
          gif.key = x.key?.S;
          return gif;
        });
        data?.gifs ? setGifs(mappedData) : setGifs([]);
      }).finally(() => setLoading(false));
  }
  const showDetails = (gif) => {
    setSelectedGif(gif);
    setModalShow(true);
  }
  const displayGif = (gif, i) => {
    return gif ?
      <Col sm={3} key={i} className="row-elem">
        <Card style={{ width: '15rem', height: '15rem', marginBotton: "20px" }} >
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
          <SearchForm loading={loading} query={query} handleSearch={getGifs} setQuery={setQuery} />
        </Jumbotron>
        <Jumbotron>
          <Row>
            {gifs.map((x, i) => displayGif(x, i))}
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
