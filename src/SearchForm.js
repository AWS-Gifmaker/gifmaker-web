import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export function SearchForm(props) {
    return (
        <>
            <h3 className="App-header">
                Search for gifs:
        </h3>
            <InputGroup className="mb-3">
                <FormControl
                    value={props.query}
                    onChange={(event) => props.setQuery(event.target.value)}
                    placeholder="comma separated tags..."
                    aria-label="comma separated tags..."
                    aria-describedby="basic-addon1" />
                <InputGroup.Append>
                    <Button variant="primary" onClick={props.handleSearch}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </>);
}
