import React from "react";
import { useParams } from "react-router-dom";
import { Input, Tabs, Button } from "antd";
import ConfigurationTab from "../configurationTab/configuratiionTab";
import { ChannelPageContainer, WebhookUrlContainer, ChannelHeaderContainer, ChannelContentContainer, DalalHeaderContainer, DalalTaglineContainer, ChannelFooterContainer } from "./ChannelPage.styles";
import { CopyOutlined } from "@ant-design/icons";
import copy from 'copy-to-clipboard';
import HistoryTab from "../historyTab/historyTab";
import { sendNotification } from "../../helpers/utils";
import StatisticsTab from "../statisticsTab/StatisticsTab";
import { API_URL } from '../../service/DalalService';
import { RowContainier } from "../homePage/HomePage.styles";
import { TargetUrlContainer } from "../configurationTab/configurationTab.styles";

export const ChannelPage = () => {
    let { uuid } = useParams<{ uuid: string }>();
    const { TabPane } = Tabs;
    const webhookUrl = `https://dalal.com/${uuid}/webhook`;
    return (
        <ChannelPageContainer>
            <ChannelHeaderContainer>
                <RowContainier>
                    <DalalHeaderContainer>Dalal</DalalHeaderContainer>
                    <DalalTaglineContainer>BYOL* webhook transformation service</DalalTaglineContainer>
                </RowContainier>
            </ChannelHeaderContainer>
            <ChannelContentContainer>
                <WebhookUrlContainer>
                    <TargetUrlContainer>Webhook Proxy Url</TargetUrlContainer>
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
                            <StatisticsTab uuid={uuid} />
                        </TabPane>
                    </Tabs>
                </div>
            </ChannelContentContainer>
            <ChannelFooterContainer>
                * BYOL - Bring Your Own Language
            </ChannelFooterContainer>
        </ChannelPageContainer>
    );
};
