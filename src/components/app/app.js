import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Иметируем получение данных с ДБ
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: false, id: 1},
                {name: 'Alex M.', salary: 3000, increase: false, rise: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',  //Строка для поиска
            filter: 'all'
        }
        this.maxId = 4;
    }
    //Функция для удаления ел-ов из массива data
    deleteItem = (id) => {  
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id) //filter используется для создания массива на основе если item.id массива не равно переданому значению id(передается при нажатии на кнопку удаления)
            }
        })
    }

    // Да, пока могут добавляться пустые пользователи
    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleIncrease = (id) => {
        /*this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id) // Находим index ел-та(перебираем каждый elem в data и если elem.id совпадает с id на который нажал пользоваетль, то возвращаем его индекс)

            const old = data[index]  // Находим ел-т по index
            const newItem = {...old, increase: !old.increase} // меняем в выбранном ел-те теперь increase
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)] // создаем теперь новый Arr куда помещаем созданный newItem с обратным значением в increase

            return {
                data: newArr
            }
        })*/
        //### 2й способ
        this.setState(({data}) => ({
            data: data.map(item => { //Перебираем каждый итем в data
                if (item.id === id) { //Если item.id равен id который пришел в функции(т.е был нажат пользователем), то берем этот item и возвращаем его с измененным статусом increase
                    return {...item, increase: !item.increase}
                }
                return item // если условие не совпало, то возвращаем просто item без изменений. В итоге в data: у нас запишется новый массив с измененненым эл-м
            })
        }))
    }

    changeSalary = (id, enteredSalary) => {
        this.setState(({data}) => ({
            data: data.map(item => { //Перебираем каждый итем в data
                if (item.id === id) { //Если item.id равен id который пришел в функции(т.е был нажат пользователем), то берем этот item и возвращаем его с измененным 
                    return {...item, salary: enteredSalary}
                }
                return item // если условие не совпало, то возвращаем просто item без изменений. В итоге в data: у нас запишется новый массив с измененненым эл-м
            })
        }))
    }
    
    // Функция которая заменяет собой onToggleIncrease и onToggleRise
    onToggleProps = (id, nameField) => {
        this.setState(({data}) => ({
            data: data.map(item => { //Перебираем каждый итем в data
                if (item.id === id) { //Если item.id равен id который пришел в функции(т.е был нажат пользователем), то берем этот item и возвращаем его с измененным статусом increase
                    return {...item, [nameField]: !item[nameField]}
                }
                return item // если условие не совпало, то возвращаем просто item без изменений. В итоге в data: у нас запишется новый массив с измененненым эл-м
            })
        }))
    }
    // Функия для поиска
    searchEmp = (items, term) => { //Принимает в себя term поисковое слово и items(т.е. data)
        if (term.length === 0) {  //Если пользователь оставил пустую строку то вернутся все items
            return items
        }
        return items.filter(item => {   //Перебираем кажды елемент в items и если в нем есть совпадения по term то возвращаем тот ел-т
            return item.name.indexOf(term) > -1  // indexOf возвращает -1 если не было найдено совпадений, поэтому условие что indexOf > -1, т.е. возвращаем те ел-ты которые больше -1
        })
    }
    // Метод для получения term из компонента SearchPanel
    onUpdateSearch = (term) => {
        this.setState({term}) // {term} Сокращенная запись для установки term:term
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter}); //Еквивалентно тому чтобы мы написали filter: filter, т.е. присваиваем filter из State то значение что получаем при нажатии на кнопку фильтра в UI
    }

    render() {
        const {data, term, filter} = this.state
        const increasedQty = (this.state.data.filter(elem => elem.increase)).length
        const visibleData = this.filterPost(this.searchEmp(data, term), filter); //Используем сначало функицию поиска searchEmp, а потом filterPost. Чтобы можно было использовать фильтрацию с поиском одновременно

        return (
            <div className="app">
                <AppInfo qty={this.state.data} qtyIncreased={increasedQty}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProps={this.onToggleProps}
                    changeSalary={this.changeSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
