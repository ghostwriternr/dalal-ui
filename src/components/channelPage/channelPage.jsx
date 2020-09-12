import React from 'react';
import { useParams } from 'react-router-dom';
import { Input, Tabs } from 'antd';
import ConfigurationTab from '../configurationTab/configuratiionTab';

function ChannelPage() {

    let {id} = useParams();
    const { TabPane } = Tabs;
    return (
        <div>
            <h1>Proxy URL</h1>
            <Input placeholder="Web Proxy Url" value={`https://dalal.com/${id}`} />
            <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Configuratiion" key="1">
                    <ConfigurationTab />
                </TabPane>
                <TabPane tab="History" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Statistics" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
            </div>
        </div>
    )
}

export default ChannelPage;