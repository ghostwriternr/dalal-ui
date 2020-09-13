import React, { useState, useEffect } from 'react';
import { StatisticsContainer } from './StatisticsTab.styles';
import { StatType } from '../../types';
import { getChannelStats } from '../../service/DalalService';
import { MyResponsiveBar } from '../barChart/BarChart';

export default function StatisticsTab({ uuid }: { uuid: string }) {

    const [statsArray, setStatsArray] = useState<StatType[]>([])

    useEffect(() => {
        getChannelStats(uuid)
            .then(resp => {
                console.log(resp.data);
                if (resp?.data) {
                    const statistics = resp.data;
                    let statisticsArray = [];
                    for (var key in statistics) {
                        statisticsArray.push({
                            time: key,
                            count: parseInt(statistics[key])
                        });
                    }
                    console.log(statisticsArray);
                    setStatsArray(statisticsArray);
                }

            })
    }, [uuid])
    return (
        <StatisticsContainer>
            <MyResponsiveBar data={statsArray} />
        </StatisticsContainer>
    );
}