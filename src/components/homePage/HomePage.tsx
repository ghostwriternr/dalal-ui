import React from "react";
import { Button } from "antd";
import history from "../../helpers/history";

export const HomePage = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                verticalAlign: "center",
                height: "80vh",
                background: "#E8684A",
            }}
        >
            <Button ghost onClick={() => history.push("/12345")}>
                Start a new channel
            </Button>
        </div>
    );
};
