import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

export function SearchForm(props) {
    const [filterVal, setFilterVal] = useState(2);
    const prompt = filterVal == 1 ? "gif name..." : "comma separated tags...";
    const onChangeVal = (e) => {
        setFilterVal(e.target.value);
    }
    return (
        <>
            <h3 className="App-header">
                Search for gifs:
        </h3>
            <ToggleButtonGroup
                style={{ marginBottom: '5px' }}
                type="radio"
                name="options"
                defaultValue={2}>
                <ToggleButton variant="outline-primary" id="tbg-radio-1" value={1} onChange={onChangeVal} >
                    Search by name
                </ToggleButton>
                <ToggleButton variant="outline-primary" id="tbg-radio-2" value={2} onChange={onChangeVal}  >
                    Search by tags
                </ToggleButton>
            </ToggleButtonGroup>
            <InputGroup className="mb-3">
                <FormControl
                    value={props.query}
                    onChange={(event) => props.setQuery(event.target.value)}
                    placeholder={prompt}
                    aria-label={prompt}
                    aria-describedby="basic-addon1" />
                <InputGroup.Append>
                    <Button disabled={props.loading} variant="primary" onClick={() => props.handleSearch(filterVal == 1)}>
                        {props.loading ? <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"></Spinner>
                    Search
                    </> : <span>Search</span>}
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </>);
}
