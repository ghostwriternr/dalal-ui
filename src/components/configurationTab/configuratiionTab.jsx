import React, { useState } from 'react';
// import Editor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-markup';
// import './styles.css'
import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"
import { Input, Dropdown, Menu, Button, Divider } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

// require('prismjs/components/prism-jsx');



export default function ConfigurationTab() {

    const initialCode = `function add(a, b) {
        return a + b;
      }
      `;
    const [code, setCode] = useState(initialCode);
    const [selectedLanguage, changeLanguage] = useState("Java");
    const codeLanguages = ["javascript", "java", "python"];

    const handleLanguageChange = (e) => {
        changeLanguage(e.key);

    }
    const menu = (
        <Menu onClick={handleLanguageChange}>
            {
                codeLanguages.map(language => {
                    return (
                        <Menu.Item key={language} icon={<UserOutlined />}>
                            {language}
                        </Menu.Item>
                    )
                })
            }
        </Menu>
      );

    return (
        <div>
            <Dropdown overlay={menu}>
                <Button>
                    {selectedLanguage} <DownOutlined />
                </Button>
            </Dropdown>
            {/* <Editor
                placeholder="Type some code"
                value={code}
                onValueChange={newCode => setCode(newCode)}
                highlight={code => highlight(code, languages.jsx)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    height: "50vh"
                }} */}
            <AceEditor
                mode={selectedLanguage}
                theme="github"
                onChange={setCode}
                name="codeEditor"
                value={code}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                  }}
            />
            <Divider />
            <div>
                <p>Target URL</p>
                <Input placeholder="Target URL" />
            </div>
        </div>
    );

}