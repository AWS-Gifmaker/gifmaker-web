import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import './App.css';

export function DetailsView(props) {
    const [gifDetails, setGifDetails] = useState(null);
    useEffect(() => {
        props.gif && fetchDetails();
    }, [props.gif]);

    const fetchDetails = () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json' },
        }
        const getGifUrl = props.url + "/gifs/" + gif.key;

        fetch(getGifUrl, options)
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    const mappedData = {
                        url: data.image_url.S,
                        name: data.name.S,
                        key: data.key.S,
                        tags: data.tags.SS,
                        visits: data.visits.N
                    };
                    setGifDetails(mappedData);
                }
            });
    }

    const gif = props.gif;
    const body = () => {
        return (
            <>
                <Row>
                    <Col><h3>tags:</h3> </Col>
                    <Col> {gifDetails.tags?.join(", ")}</Col>
                </Row>
                <Row>
                    <Col><h3>visits: </h3></Col>
                    <Col> {gifDetails.visits}</Col>
                </Row>
                <Row >
                    <div className="image-details div-center image-card">
                        <img className="image" src={gifDetails.url} />
                    </div>
                </Row>
            </>
        );
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {gif?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {gifDetails && body()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
