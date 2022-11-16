import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        }
    }
    // Метод для записи term
    onUpdateSearchForValue = (e) => {
        const term = e.target.value
        this.setState({term})
        this.props.onUpdateSearch(term)
    }

    render() {
        //value для хранения переменной в самом ел-те
        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="Search an employee"
                    value={this.state.term}
                    onChange={this.onUpdateSearchForValue}/>
        )
    }
}

export default SearchPanel;