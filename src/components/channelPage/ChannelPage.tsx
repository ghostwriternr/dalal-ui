import React from "react";
import { useParams } from "react-router-dom";
import { Input, Tabs, Button } from "antd";
import ConfigurationTab from "../configurationTab/configuratiionTab";
import { ChannelPageContainer, WebhookUrlContainer, TaglineContainer } from "./ChannelPage.styles";
import { CopyOutlined } from "@ant-design/icons";
import copy from 'copy-to-clipboard';
import HistoryTab from "../historyTab/historyTab";
import { sendNotification } from "../../helpers/utils";
import StatisticsTab from "../statisticsTab/StatisticsTab";
import { API_URL } from '../../service/DalalService';

export const ChannelPage = () => {
    let { uuid } = useParams<{ uuid: string }>();
    const { TabPane } = Tabs;
    const webhookUrl = `https://dalal.com/${uuid}/webhook`;
    return (
        <ChannelPageContainer>
            <TaglineContainer>
                <h1 style={{ margin: "0px" }}>Proxy URL</h1>
                <p>BYOL* webhook transformation service</p>
            </TaglineContainer>
            <WebhookUrlContainer>
                <Input placeholder="Web Proxy Url" value={`${API_URL}/${uuid}/webhook`} />
                <Button onClick={() => {
                    copy(webhookUrl);
                    sendNotification({
                        message: "URL copied"
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
                        <StatisticsTab />
                    </TabPane>
                </Tabs>
            </div>
        </ChannelPageContainer>
    );
};
