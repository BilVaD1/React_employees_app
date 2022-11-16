import "./app-info.css";

const AppInfo = ({qty, qtyIncreased}) => {
    return (
        <div className="app-info">
            <h1>Accounting for employees in MyCompany</h1>
            <h2>Total number of employees: {qty.length}</h2>
            <h2>The award will be given to: {qtyIncreased}</h2>
        </div>
    )
}

export default AppInfo;