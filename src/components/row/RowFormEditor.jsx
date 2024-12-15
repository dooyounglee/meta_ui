import { useRef, forwardRef } from 'react';

import { Editor, Viewer } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import * as util from 'js/utils';

function RowFormTextarea({ type,
        title, id, name, placeholder,
        defaultValue, value, onChange,
        list, // radio, checkbox, select
        checkedValue, checked, // radio, checkbox
        rows, cols, // textarea
        mode, height, // editor
        selected, keyStartDate, keyEndDate, startDate, endDate, handlerChange, // calender~
        // selectCallback, onKeyDownCallback, reset, selectMe, // chooseUser
        keyUsrNo, keyUsrNm, usrNo, usrNm, // findUser
        readOnly, disabled, required,
        onKeyDown
    }, ref) {

        const editorRef = useRef();
        console.log(name,value)

        // 필수값 세팅
        util.Validate.setRequired(required, ref, title, name);

    return (
        <dl>
            <dt><label>{title}</label>{required && <span className="req">필수</span>}</dt>
            <dd>
                {mode == "create" && (
                    <Editor
                        title={title}
                        initialValue={value}
                        placeholder={placeholder}
                        previewStyle="vertical" // 미리보기 스타일 지정
                        height={height} // 에디터 창 높이
                        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                        toolbarItems={[
                            // 툴바 옵션 설정
                            ['heading', 'bold', 'italic', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task', 'indent', 'outdent'],
                            ['table', 'image', 'link'],
                            ['code', 'codeblock']
                        ]}
                        plugins={[colorSyntax]}
                        ref={el => ref.current[name] = el}
                    />)}
                    {mode == "modify" && value && (
                    <Editor
                        title={title}
                        initialValue={value}
                        placeholder={placeholder}
                        previewStyle="vertical" // 미리보기 스타일 지정
                        height={height} // 에디터 창 높이
                        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                        toolbarItems={[
                            // 툴바 옵션 설정
                            ['heading', 'bold', 'italic', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task', 'indent', 'outdent'],
                            ['table', 'image', 'link'],
                            ['code', 'codeblock']
                        ]}
                        plugins={[colorSyntax]}
                        onChange={(e => {
                            ref.current[name] = editorRef.current?.getInstance().getHTML()
                        })}
                        ref={el => ref.current = el}
                    />)}
                    {mode == "read" && value && (
                    <div style={{height, overflow:'auto'}}>
                        <Viewer initialValue={value || ''} />
                    </div>
                )}
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormTextarea);