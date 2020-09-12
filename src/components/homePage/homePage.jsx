import React from 'react';
import { Button } from 'antd';
import history from './../../history';

function homePage() {
    return (
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "center",
            height: "80vh",
            background: "#E8684A"
          }}>
            <Button ghost onClick={() => history.push('/12345')}>Start a new channel</Button>
        </div>
    );
}

export default homePage;