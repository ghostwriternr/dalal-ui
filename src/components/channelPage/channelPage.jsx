import React from 'react';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';

function ChannelPage() {

    let {id} = useParams();
    return (
        <div>
            <h1>Proxy URL</h1>
            <Input placeholder="Web Proxy Url" value={`https://dalal.com/${id}`} />
            
        </div>
    )
}

export default ChannelPage;