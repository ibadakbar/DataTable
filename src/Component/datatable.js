import React from 'react'

const Datatable = ({
    filteredData,
    renderTooltipContent,
    columns


}) => {
    return (
        <table border={'1'}>
            <thead>
                <tr>
                    <th className='main-column' scope="col" >User Name</th>
                    {
                        columns.map(col => (<>
                            <th className='column-width' scope="col">{col?.title}</th>
                        </>))
                    }
                </tr>
            </thead>
            <tbody>
                {filteredData?.length > 0 ? filteredData?.map(user => (
                    <tr key={user.id}>
                        <td className='main-column'>{user.login}</td>
                        <td >{user.id}</td>
                        <td >{user.node_id}</td>
                        <td >
                            <img src={user.avatar_url} alt="Avatar" class="avatar" />
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.html_url, 25)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.followers_url, 25)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.following_url, 35)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.gists_url, 35)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.starred_url, 35)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.subscriptions_url, 35)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.organizations_url, 35)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.repos_url, 35)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.events_url, 35)}
                        </td>
                        <td className="parentCell" >
                            {renderTooltipContent(user.received_events_url, 35)}
                        </td>
                        <td className='column-width'>
                            {user.type}
                        </td>
                        <td className='column-width'>
                            {user.site_admin.toString()}
                        </td>
                    </tr>
                )) : <h3 className='text-center'>Not Found</h3>}
            </tbody>
        </table>
    )
}

export default Datatable