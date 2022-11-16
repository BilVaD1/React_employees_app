import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProps, changeSalary}) => {

    const elements = data.map(item => {  //map перебирает каждый item и создает новый массив на основе data
        const {id, ...itemProps} = item // деструкторизация Props, вытаскваем из Props id, а все остальные props оставляем в itemProps
        return (
            // Извлекаем на этом этапе id(чтобы каждый ел-т был уникальным) и передаем дальше по иерархии itemProps и функцию onDelete с id
            <EmployeesListItem key={id} {...itemProps} 
            onDelete={() => onDelete(id)} 
            onToggleProps={(e) => onToggleProps(id, e.currentTarget.getAttribute('data-toggle'))}
            changeSalary={(e) => changeSalary(id, e.currentTarget.getAttribute('value'))}/>
            // key={id} будет доступен в расширениии Components в devTools
        )
    })

    return ( //помещаем массив elements
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;