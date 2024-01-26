import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Datatable from '../Component/datatable';
import Searchbar from '../Component/searchbar';
import { debounce } from '../Config/utils';

const Table = () => {

    const [userData, setUserData] = useState([]);
    const [text, setText] = useState('manalliaquat');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${text}/followers`);
                setUserData(response.data);
            } catch (error) {
                setUserData([]);
            }
        };
        fetchData();
    }, [text]);

    const renderTooltipContent = (data, maxLength) => (
        <>
            <span className='tooltip'>{data}</span>
            <a href={data} target='_blank'>
                {data.length > maxLength ? `${data.substring(0, maxLength)}...` : data}
            </a>
        </>
    );

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        if (!query) {
            setText('manalliaquat')
        } else {
            setText(query);
        }

    };
    const debouncedHandleSearch = debounce(handleSearch, 1000);

    const columns = [
        { title: 'ID' },
        { title: 'Node ID' },
        { title: 'Avatar URL' },
        { title: 'GitHub URL' },
        { title: 'Followers URL' },
        { title: 'Following URL' },
        { title: 'Gists URL' },
        { title: 'Starred URL' },
        { title: 'Subscriptions URL' },
        { title: 'Organizations URL' },
        { title: 'Repos URL' },
        { title: 'Events URL' },
        { title: 'Received Events URL' },
        { title: 'Type' },
        { title: 'Site Admin' },
    ];

    return (
        <div className='m-4'>
            <div className="wrapper">
                <div className="searchBar">
                    <Searchbar handleSearch={debouncedHandleSearch} />
                </div>
            </div>

            <div className='scrollable-table-container'>
                <Datatable
                    renderTooltipContent={renderTooltipContent}
                    filteredData={userData}
                    columns={columns}
                />
            </div>
        </div>
    )
}


export default Table