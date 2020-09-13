import React from 'react';
import { StatisticsContainer } from './StatisticsTab.styles';
import { EmptyHistoryContainer, EmptyHistoryTextContainer } from '../historyTab/HistoryTab.styles';
import { RowContainier } from '../homePage/HomePage.styles';
import { DeleteOutlined } from '@ant-design/icons';

export default function StatisticsTab() {

    return (
        <StatisticsContainer>
            <EmptyHistoryContainer>
                <RowContainier>
                    <DeleteOutlined style={{ fontSize: "50px" }} />
                    <EmptyHistoryTextContainer>Coming Soon</EmptyHistoryTextContainer>
                </RowContainier>
            </EmptyHistoryContainer>
        </StatisticsContainer>
    );
}