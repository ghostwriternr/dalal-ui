import React, { useState, useEffect } from 'react';
import { HistoryResponse, History } from '../../types';
import { getChannelHistory } from '../../service/DalalService';
import { Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import moment from 'moment';
import JSONPretty from 'react-json-pretty';
import { PanelContainer, PanelHeaderTextContainer, HistoryContainer } from './HistoryTab.styles';

var JSONPrettyMon = {
    main: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;border-radius:5px;height:20vh',
    error: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;border-radius:5px',
    key: 'color:#f92672;',
    string: 'color:#fd971f;',
    value: 'color:#a6e22e;',
    boolean: 'color:#ac81fe;',
}
export default function HistoryTab({ uuid }: { uuid: string }) {

    const [history, setHistory] = useState<HistoryResponse>();

    useEffect(() => {
        getChannelHistory(uuid)
            .then(resp => {
                if (resp?.data) {
                    setHistory(resp.data);
                }
            });
    }, [uuid]);

    const formatTime = (time: string) => {
        const localDateTime = moment(time);
        return `${localDateTime.format('MM/DD/YYYY')} ${localDateTime.format('hh:mm A')}`;
    }

    const renderHistoryItem = (historyItem: History) => {
        return (
            <CollapsePanel header={formatTime(historyItem.created_at)} key={historyItem.id} extra="200 OK ✅">
                <PanelContainer>
                    <PanelHeaderTextContainer>Payload</PanelHeaderTextContainer>
                    <PanelHeaderTextContainer>Transformed Payload</PanelHeaderTextContainer>
                </PanelContainer>
                <PanelContainer>
                    <JSONPretty style={{ width: "50vw", padding: "5px", borderRadius: "10px" }} mainStyle="padding:1em" id={historyItem.id} theme={JSONPrettyMon} data={JSON.parse(historyItem.payload)}></JSONPretty>
                    <JSONPretty style={{ width: "50vw", padding: "5px", borderRadius: "10px" }} mainStyle="padding:1em" id={historyItem.id} theme={JSONPrettyMon} data={JSON.parse(historyItem.transformed_payload)}></JSONPretty>
                </PanelContainer>
            </CollapsePanel>
        )
    }

    return (
        <HistoryContainer>
            <Collapse>
                {history?.map(historyItem => renderHistoryItem(historyItem))}
            </Collapse >
        </HistoryContainer>
    );

}