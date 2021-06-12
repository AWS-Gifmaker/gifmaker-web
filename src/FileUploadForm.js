import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

export default function FileUploadForm(props) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();
    const isValidForm = file && name;

    const uploadFile = () => {
        const endpointUrl = props.url + "/gifs?";
        var params = new URLSearchParams();
        params.append("name", name);
        const postUrl = endpointUrl + params;

        var formData = new FormData();
        formData.append("gif_file", file);

        const options = {
            method: 'POST',
            body: formData
        };
        setLoading(true);
        fetch(postUrl, options)
            .then(response => response.json())
            .finally(() => setLoading(false));
    };
    const fileUploadSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        //upload to bucket
        uploadFile();
    };
    return (
        <Form onSubmit={fileUploadSubmit} validated={file && name}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Video
        </Form.Label>
                <Col sm="10">
                    <Form.File
                        id="image_file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ marginTop: 10 }}
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
            <Button disabled={!isValidForm || loading} variant="primary" type="submit">
                {loading ? <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"></Spinner>
                    Convert
                    </>
                    :
                    <span>Convert</span>
                }
            </Button>
        </Form>
    );
}
