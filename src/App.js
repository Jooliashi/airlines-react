import React, {useState} from 'react';
import CustomTable from './components/Table';
import './App.css';
import Data from './data'
import CustomSelect from './components/Select'
import { Button } from '@material-ui/core'
import Map from './components/Map';
const App = () => {
  const [airline, setAirline] = useState('all')
  const [airport, setAirport] = useState('all')

  const filteredRoutes = Data.routes.filter((route) => {
    return(
      (route.airline === airline || airline === 'all') &&
      (route.dest === airport || route.src === airport || airport === 'all')
    )
  })
  
  const airportSelected = (value) => {
    setAirport(value)
  }

  const formatValue = (property, value) => {
    if (property === "airline") {
      return Data.getAirlineById(value).name;
    } else {
      return Data.getAirportByCode(value).name;
    }
  }
  const airlineSelected = (value) => {
    if (value !== "all") {
      value = parseInt(value, 10)
    }
    setAirline(value)
  }

  const clearFilters = () => {
    setAirline("all");
    setAirport("all");
  }

  const filteredAirlines = () => {
    if (airport !== "all") {
      return Data.airlines.filter((airline) => {
        return !!filteredRoutes.find((route) => {
          return route.airline === airline.id
        })
      })
    }
    return Data.airlines;
  }

  const filteredAirports = () => {
    if (airline !== "all") {
      return Data.airports.filter((airport) => {
        return !!filteredRoutes.find((route) => {
          return route.dest === airport.code || route.src === airport.code
        })
      })
    }
    return Data.airports;
  }
  const columns = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ];
  
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <Map routes={filteredRoutes} />
      <div>
        <CustomSelect options={filteredAirlines()} allTitle="All Airlines" valueKey="id" titleKey="name" onSelect={airlineSelected} value={airline}/>
        <CustomSelect options={filteredAirports()} allTitle="All Airport" valueKey="code" titleKey="name" onSelect={airportSelected} value={airport}/>
        <Button onClick={clearFilters}>Clear Filters</Button>
      </div>
      <section>
        <CustomTable columns={columns} rows={filteredRoutes} format={formatValue} />
      </section>
    </div>
  )
}

export default App;