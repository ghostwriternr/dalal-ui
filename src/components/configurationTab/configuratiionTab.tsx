import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { Input, Dropdown, Menu, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CodeContainer, LanguageContainer, EditorContainer, ChannelContainer, TargetContainer, TargetUrlContainer, SaveButtonContainer } from "./configurationTab.styles";
import { update, getTemplates, getChannel } from '../../service/DalalService';
import { checkEmptyOrNullString } from "../../helpers/utils";
interface templateState {
    id: string;
    content: string;
    language: string;
}

interface templateResponse {
    data: [templateState]
}

export interface ChannelResponse {
    id: string;
    function: string;
    target: string;
    language: string;
    uuid: string;
}

type TemplateMapType = { [key: string]: templateState };
export default function ConfigurationTab({ uuid }: { uuid: string }) {
    const [code, setCode] = useState<string>("");
    const [target, setTarget] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [templates, setTemplates] = useState<templateState[]>([]);
    const [channelCode, setChannelCode] = useState<string>("");
    const [channelLanguage, setChannelLanguage] = useState<string>("");
    const [templatesMap, setTemplatesMap] = useState<TemplateMapType>({});
    useEffect(() => {
        getChannel(uuid)
            .then(resp => {
                if (resp?.data?.language) {
                    setChannelLanguage(resp.data.language);
                    setSelectedLanguage(resp.data.language);
                }
                if (resp?.data?.function) {
                    setChannelCode(resp.data.function);
                    setCode(resp.data.function);
                }
                if (resp?.data?.target) {
                    setTarget(resp.data.target);
                }

            });
    }, [uuid])

    useEffect(() => {
        getTemplates()
            .then((resp: templateResponse) => {
                if (resp?.data) {
                    const templatesResponse = resp.data;
                    setTemplates(templatesResponse);
                    console.log(templatesResponse);
                    let templatesMap: TemplateMapType = {};
                    templatesResponse.forEach((template) => {
                        templatesMap[template.language] = template;
                    });
                    setTemplatesMap(templatesMap);
                }

            });
    }, []);

    const handleLanguageChange = (e: any) => {
        setSelectedLanguage(e.key);
        console.log(templatesMap);
        if (e.key === channelLanguage && channelCode) {
            setCode(channelCode)
        } else {
            setCode(templatesMap[e.key].content);
        }
    };


    const menu = (
        <Menu onClick={handleLanguageChange}>
            {templates.map((template: templateState) => {
                return (
                    <Menu.Item key={template.language}>
                        {template.language}
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    const updateChannel = () => {
        update({ uuid, code, target, language: selectedLanguage })
            .then((resp) => {
                console.log(resp);
            }).catch(err => {
                console.log(err);
            })
    }

    const handleTargetChange = (e: any) => {
        setTarget(e.target.value);
    }

    const disableSave = (): boolean => {
        return checkEmptyOrNullString(selectedLanguage) || checkEmptyOrNullString(code) || checkEmptyOrNullString(target);
    }


    return (
        <ChannelContainer>
            <CodeContainer>
                <LanguageContainer>
                    <Dropdown overlay={menu}>
                        <Button style={{ fontWeight: "bold" }}>
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
                        style={{
                            height: "60vh",
                            minWidth: 'calc(100vw - 190px)',
                        }}
                    />
                </EditorContainer>
            </CodeContainer>
            <Divider />
            <TargetContainer>
                <TargetUrlContainer>Target URL</TargetUrlContainer>
                <Input placeholder="https://targetUrl.com" value={target} onChange={handleTargetChange} />
            </TargetContainer>
            <SaveButtonContainer>
                <Button type="primary" disabled={disableSave()} onClick={updateChannel}>Save</Button>
            </SaveButtonContainer>
        </ChannelContainer>
    );
}
