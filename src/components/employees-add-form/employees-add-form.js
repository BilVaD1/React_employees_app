import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value //[e.target.name] используется чтобы обработчик событий понимал с какого поля пользователь вводит значение и меняет соответствующее значение в this.state
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // Можно еще и сообщения добавлять, подсветку, атрибуты minlength и тд.
        if (this.state.name.length < 3 || !this.state.salary) return;  //Добавляем валидацию на поля, чтобы длина в name была не меньше 3 символов и чтобы salary было заполнено
        this.props.onAdd(this.state.name, this.state.salary);  // Передаем значения из полей в функцию onAdd
        this.setState({   //Используется чтобы очищать поля после отправки формы
            name: '',
            salary: ''
        })
    }

    render() {
        //const {addItem} = this.props
        const {name, salary} = this.state;
        // value={name} хранит в себе введенное значение пользователям, это называется управляемый компонент, это делается для оптимизации инпутов
        //onChange={this.onValueChange} обработчик событий который использует функцию onValueChange
        return (
            <div className="app-add-form" onSubmit = {this.onSubmit}>
                <h3>Add a new employee</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="What's his name?"
                        name="name"
                        value={name} 
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="Salary in $?"
                        name="salary"
                        value={salary} 
                        onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light">Add</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;