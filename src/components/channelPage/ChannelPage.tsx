import React from "react";
import { useParams } from "react-router-dom";
import { Input, Tabs, Button, notification } from "antd";
import ConfigurationTab from "../configurationTab/configuratiionTab";
import { ChannelPageContainer, WebhookUrlContainer } from "./ChannelPage.styles";
import { CopyOutlined } from "@ant-design/icons";
import copy from 'copy-to-clipboard';
import HistoryTab from "../historyTab/historyTab";

export const ChannelPage = () => {
    let { uuid } = useParams<{ uuid: string }>();
    const { TabPane } = Tabs;
    const webhookUrl = `https://dalal.com/${uuid}/webhook`;
    return (
        <ChannelPageContainer>
            <h1 style={{ textAlign: "left" }}>Proxy URL</h1>
            <WebhookUrlContainer>
                <Input placeholder="Web Proxy Url" value={webhookUrl} />
                <Button onClick={() => {
                    copy(webhookUrl);
                    notification.open({
                        message: "URL copied",
                        duration: 1,
                        placement: 'bottomRight'
                    });
                }}><CopyOutlined /></Button>
            </WebhookUrlContainer>
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Configuration" key="1">
                        <ConfigurationTab uuid={uuid} />
                    </TabPane>
                    <TabPane tab="History" key="2">
                        <HistoryTab uuid={uuid} />
                    </TabPane>
                    <TabPane tab="Statistics" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        </ChannelPageContainer>
    );
};
