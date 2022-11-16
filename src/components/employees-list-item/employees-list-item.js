import { Component } from 'react';

import './employees-list-item.css';


class EmployeesListItem  extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.salary
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        const {name, onDelete, onToggleProps, increase, rise, changeSalary} = this.props  //props то что приходит в компонент, достаем из него name, salary

        let classNames = "list-group-item d-flex justify-content-between"
        if(increase){
            classNames += ' increase' //Добавляем класс increase к classNames, если increase = true
        } 
        if (rise) {
            classNames += ' like'
        }

        return (
            // data-toggle созданный мною таг чтобы было можно его вытащить при обьявлении функции onToggleProps
            // onBlur = outOfFocus
            <li className={classNames}>
                <span className="list-group-item-label" data-toggle="rise" onClick={onToggleProps}>{name}</span>
                <input type="number" className="list-group-item-input" value={this.state.value} 
                onChange={this.handleChange}
                onBlur={changeSalary}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        data-toggle="increase"
                        onClick={onToggleProps}> 
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }
}


export default EmployeesListItem;