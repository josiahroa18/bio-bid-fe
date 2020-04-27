import React, { useEffect, useState } from "react";
import { Table } from 'reactstrap';
import { EllipsisOutlined } from "@ant-design/icons";
import { Button } from "reactstrap";

import { GET_STUDIES } from '../queries';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import * as JsSearch from 'js-search';

/* STYLE IMPORT */
import '../styles/CP-dash-header.css';
import '../styles/dash.css';

/* IMAGE IMPORTS */
import { ReactComponent as AddIcon } from '../images/add-button-1.svg';
import { ReactComponent as SearchIcon } from '../images/search.svg';
import { ReactComponent as FilterIcon } from '../images/filter-2.svg';

import CheckBoxFilters from './CheckBoxFilters';

const Bids = (props) => {

  const { loading, data, error } = useQuery(GET_STUDIES);

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [studies, setStudies] = useState([]);

  const search = new JsSearch.Search('name');

  search.addIndex('name');
  search.addIndex('area');
  search.addIndex('protocol_number');
  search.addIndex('title');

  const createStudy = () => {

      // Placeholder for the create button.

      console.log('Creating new study...');

  }

  const handleSearch = (event) => {

      event.preventDefault();

      if (value.length <= 0)
          setStudies(data.studies);
      else
          setStudies(search.search(value));

  }

  const processSearch = (event) => {

      event.preventDefault();

      setValue(event.target.value);

      if (value.length <= 0)
          setStudies(data.studies);
      else
          setStudies(search.search(value));

  }

  const processFilter = () => {

    setOpen(!open);
    props.shadow();

  }

  useEffect(() => {

      if (data !== undefined) {

          search.addDocuments(data.studies);

          if (studies.length <= 0 && value.length <= 0)
              setStudies(data.studies);

      }

  });

  return (
    <div className="tableheader" id='core-wrapper'>
      <div id='content-container'>
        <div id='current-projects-header' style={{ marginBottom: '20px' }}>
          <p id='current-projects-header-text-1'>Current Projects</p>
          <div id='input-container'>
            <form onSubmit={event => handleSearch(event)} style={{ display: 'flex' }}>
              <SearchIcon id='search-icon' />
              <input onChange={event => processSearch(event)} id='search-input' placeholder='Enter a keyword' />
              <button id='search-button'>Search</button>
            </form>
          </div>
          <div id='current-projects-header-2'>
            <p id='current-projects-header-text-2' onClick={() => { createStudy() }} >Create new study</p>
            <AddIcon style={{ width: '16px', height: '16px', margin: '8px 8px 8px 12px' }} />
          </div>
          <div id='filter-container'>
            <div id='filter-sub-container' onClick={() => processFilter() } >
              <p id='filter-text'>Filter</p>
            </div>
            <FilterIcon id='filter-icon' onClick={() => processFilter() } />
          </div>
        </div>
        <Table striped id='core-table'>
          <thead>
            <tr id='bbb'>
              <th>BIDS</th>
              <th>NAME</th>
              <th>THERAPEUTIC AREA</th>
              <th>PROTOCOL NO./TITLE</th>
              <th>PHASE</th>
              <th>SERVICE LIST</th>
              <th>MODIFIED DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data && (studies.map(study => <tr className='aaa' key={study.id}>
                <th scope="row"> <Button className='row-button' style={{ background: (study.status === 'Open' ? '#389E0D' : study.status === 'Active' ? '#FA8C16': '#F5222D') }} >{study.status}</Button></th>
                <td> {study.name}</td>
                <td> {study.area}<br>
                </br> Indication: Back pain<br>
                  </br> Molecule type: Chemical</td>
                <td> {study.protocol_number}<br>
                </br> Title: {study.title} </td>
                <td> {study.phase}</td>
                <td> {study.services}</td>
                <td> {moment(study.modified_date).format('LL')} <br>
              </br> {moment(study.modified_date).format('LTS')}</td>
                <td> <EllipsisOutlined style={{ fontSize: '25px' }} /></td>
              </tr>)
            )}
          </tbody>
        </Table>
      </div>
      <CheckBoxFilters process={processFilter} open={open} />
    </div>
  );
}
export default Bids;