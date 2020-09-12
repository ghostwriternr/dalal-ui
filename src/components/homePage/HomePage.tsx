import React, { useState } from "react";
import { Button } from "antd";
import history from "../../helpers/history";
import {createChannel} from '../../service/DalalService';
import { HomePageContainer, DalalContainer, CreateChannelContainer, RowContainier } from "./HomePage.styles";
import {LoadingOutlined} from '@ant-design/icons';

export const HomePage = () => {

    const [creatingChannel, setCreatingChannel] = useState(false)

    const createNewChannel = async () => {
        setCreatingChannel(true);
        createChannel()
        .then(res => {
            console.log(res.data);
            setCreatingChannel(false);
            history.push(`/${res.data.uuid}`)
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <HomePageContainer>
            <RowContainier>
                <DalalContainer>
                    Dalal
                </DalalContainer>
                <CreateChannelContainer>
                    {
                        creatingChannel ? <LoadingOutlined style={{ fontSize: '30px', color: 'white' }}/> :
                        <Button ghost onClick={createNewChannel} className="changeHover">
                            Start a new channel
                        </Button>
                    }
                </CreateChannelContainer>
            </RowContainier>
        </HomePageContainer>
    );
};
