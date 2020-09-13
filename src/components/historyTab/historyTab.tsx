import React, { useState, useEffect } from 'react';
import { HistoryResponse, History } from '../../types';
import { getChannelHistory } from '../../service/DalalService';
import { Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import JSONPretty from 'react-json-pretty';
import { PanelContainer, PanelHeaderTextContainer, HistoryContainer, EmptyHistoryContainer, EmptyHistoryTextContainer } from './HistoryTab.styles';
import { formatDate, JsonPrettyStyle } from '../../helpers/utils';
import { DeleteOutlined } from '@ant-design/icons';
import { RowContainier } from '../homePage/HomePage.styles';

export default function HistoryTab({ uuid }: { uuid: string }) {

    const [history, setHistory] = useState<HistoryResponse>();
    const jsonViewStyle = { width: "50vw", padding: "5px", borderRadius: "10px" };
    useEffect(() => {
        getChannelHistory(uuid)
            .then(resp => {
                if (resp?.data) {
                    setHistory(resp.data);
                }
            });
    }, [uuid]);

    const renderHistoryItem = (historyItem: History) => {
        return (
            <CollapsePanel header={formatDate(historyItem.created_at)} key={historyItem.id} extra="200 OK ✅">
                <PanelContainer>
                    <PanelHeaderTextContainer>Payload</PanelHeaderTextContainer>
                    <PanelHeaderTextContainer>Transformed Payload</PanelHeaderTextContainer>
                </PanelContainer>
                <PanelContainer>
                    <JSONPretty style={jsonViewStyle} mainStyle="padding:1em" id={historyItem.id} theme={JsonPrettyStyle} data={JSON.parse(historyItem.payload)}></JSONPretty>
                    <JSONPretty style={jsonViewStyle} mainStyle="padding:1em" id={historyItem.id} theme={JsonPrettyStyle} data={JSON.parse(historyItem.transformed_payload)}></JSONPretty>
                </PanelContainer>
            </CollapsePanel>
        )
    }

    const renderHistory = () => {
        return (
            <Collapse>
                {history?.map(historyItem => renderHistoryItem(historyItem))}
            </Collapse >
        );
    }

    const renderEmptyHistory = () => {
        return (
            <EmptyHistoryContainer>
                <RowContainier>
                    <DeleteOutlined style={{ fontSize: "50px" }} />
                    <EmptyHistoryTextContainer>No events triggered yet</EmptyHistoryTextContainer>
                </RowContainier>
            </EmptyHistoryContainer>
        )
    }

    return (
        <HistoryContainer>
            {
                history && history.length > 0 ? renderHistory() : renderEmptyHistory()
            }
        </HistoryContainer>
    );

}