import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log(12)

  async function onClickEmployeeList() {
    let response = await fetch("http://localhost:8085/employees/",
      {
        method: "GET",
        headers: {
          "Accept": 'application/json'
        }
      });
  
    if (response.ok) {
      let employees = await response.json();
      let employee_list = document.querySelector('#employee-list');
  
      for (let employee of employees) {
        let new_list_elem = document.createElement('li');
        new_list_elem.innerText = 'ID: '+employee['ID']+' Name: '+employee['name']+' Avg Handling Time: '+employee['avg_handling_time']+' Availability: '+employee['availability'];
        employee_list.appendChild(new_list_elem);
      }
    } else {
      console.log('Failed to fetch employees');
    }
  }
  
  function getValuesByDay(day_name, demand_json) {
    const values = demand_json[day_name.toLowerCase()];
    return values ? [...values] : [];
  }

  async function onClickDemand(week_number, day_name) {
    let response = await fetch(`http://localhost:8085/call-demand/${week_number}`, {
      method: "GET",
      headers: {
        "Accept": 'application/json'
      }
    });

    if (response.ok) {
      let demand_json = await response.json();
      let demand_values = getValuesByDay(day_name, demand_json);
      console.log(demand_values)
      return demand_values;
    } else {
      console.log('Failed to fetch demand');
      return []; // Return an empty array in case of failure
    }
  }
  
  onClickDemand(12,'mon');

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
