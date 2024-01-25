import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Datatable from '../Component/datatable';
import Searchbar from '../Component/searchbar';

const Table = () => {

    const [userData, setUserData] = useState([]);
    const [text, setText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.github.com/users/manalliaquat/followers');
                setUserData(response.data);
            } catch (error) {
                console.error('Error', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!text) {
            setFilteredData(userData);
        }
    }, [text, userData]);

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
        const filteredResults = userData.filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setText(query)
        setFilteredData(filteredResults);
    };

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
                    <Searchbar handleSearch={handleSearch} />
                </div>
            </div>

            <div className='scrollable-table-container'>
                <Datatable
                    renderTooltipContent={renderTooltipContent}
                    filteredData={filteredData}
                    columns={columns}
                />
            </div>
        </div>
    )
}


export default Table