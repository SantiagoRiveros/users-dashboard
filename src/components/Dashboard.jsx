import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "primeflex/primeflex.css";

// Registrar elementos de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleCounts, setRoleCounts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((data) => {
        setUsers(data.data);
        setFilteredUsers(data.data);
        calculateRoleCounts(data.data);
      })
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:3001/roles")
      .then((data) => setRoles(data.data))
      .catch((error) => console.error(error));
  }, []);

  const calculateRoleCounts = (users) => {
    const counts = users.reduce((acc, user) => {
      acc[user.rol] = (acc[user.rol] || 0) + 1;
      return acc;
    }, {});
    setRoleCounts(counts);
  };

  const handleChangeFilter = (role) => {
    if (role === "Todos") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.rol === role);
      setFilteredUsers(filtered);
    }
  };

  const pieData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        data: Object.values(roleCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div
      className="p-grid p-justify-center p-align-center"
      style={{ height: "100vh" }}
    >
      <div className="p-col-12 p-md-8 p-lg-6 p-d-flex p-flex-column p-align-items-center p-justify-content-center">
        {/* Botones de Filtro */}
        <div className="p-mb-4 p-d-flex p-flex-wrap p-justify-center">
          <Button
            label="Todos"
            onClick={() => handleChangeFilter("Todos")}
            className="p-button-rounded p-button-outlined p-mr-2"
          />
          {roles.map((role) => (
            <Button
              key={role}
              label={role}
              onClick={() => handleChangeFilter(role)}
              className="p-button-rounded p-button-outlined p-mr-2"
            />
          ))}
        </div>

        {/* Tabla de Usuarios */}
        <div className="p-mb-4" style={{ width: "100%" }}>
          <DataTable value={filteredUsers} tableStyle={{ minWidth: "50rem" }}>
            {/* <Column field="code" header="Código"></Column> */}
            <Column field="nombre" header="Nombre"></Column>
            <Column field="rol" header="Rol"></Column>
          </DataTable>
        </div>

        {/* Gráfico de Usuarios por Rol */}
        <div className="p-mb-4" style={{ width: "80%", maxWidth: "400px" }}>
          <h3 className="p-text-center">Usuarios por Rol</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
