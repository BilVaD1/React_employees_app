import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsData = [  // Создаем кнопки фильтров из имитации полученных данных
        {name: 'all', label: 'All employees'},
        {name: 'rise', label: 'For promotion'},
        {name: 'moreThen1000', label: 'Salary over 1000$'}
    ];

    const buttons = buttonsData.map(({name, label}) => { //перебираем полученные данные и создаем кнопки
        const active = props.filter === name; //props.filter === name возвращает true
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button type="button"
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => props.onFilterSelect(name)}>
                    {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;