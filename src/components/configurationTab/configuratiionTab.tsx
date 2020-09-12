import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { Input, Dropdown, Menu, Button, Divider } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { CodeContainer, LanguageContainer, EditorContainer, ChannelContainer, TargetContainer, TargetUrlContainer } from "./configurationTab.styles";

export default function ConfigurationTab() {
    const initialCode = `function add(a, b) {\n\treturn a + b;\n}`;
    const [code, setCode] = useState(initialCode);
    const [selectedLanguage, changeLanguage] = useState("Java");
    const codeLanguages = ["javascript", "java", "python"];

    const handleLanguageChange = (e: any) => {
        changeLanguage(e.key);
    };
    const menu = (
        <Menu onClick={handleLanguageChange}>
            {codeLanguages.map((language) => {
                return (
                    <Menu.Item key={language} icon={<UserOutlined />}>
                        {language}
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    return (
        <ChannelContainer>
            <CodeContainer>
                <LanguageContainer>
                    <Dropdown overlay={menu}>
                        <Button>
                            {selectedLanguage} <DownOutlined />
                        </Button>
                    </Dropdown>
                </LanguageContainer>
                <EditorContainer>
                    <AceEditor
                        mode={selectedLanguage}
                        theme="tomorrow"
                        onChange={setCode}
                        name="codeEditor"
                        value={code}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                        }}
                    />
                </EditorContainer>
                
            </CodeContainer>
            <Divider />
            <TargetContainer>
                <TargetUrlContainer>Target URL</TargetUrlContainer>
                <Input placeholder="Target URL" />
            </TargetContainer>
        </ChannelContainer>
    );
}
