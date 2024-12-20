import { read, utils, writeFile } from 'xlsx';

export const formDownload = ({ headings, sheetNm, fileNm, extension }) => {
    exportExcel({ headings, data: [], sheetNm, fileNm, extension, isForm: true })
}

export const exportExcel = ({ headings, data, sheetNm, fileNm, extension, isForm }) => {
    
    if (!isForm && data.length == 0) {
        alert("데이터가 없는데요.");
        return false;
    }

    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true }); // 데이터
    utils.book_append_sheet(wb, ws, sheetNm); // 시트명
    writeFile(wb, `${fileNm}.${extension}`); // 파일명
}

export const importExcel = (e, keys, callback) => {
    const files = e.target.files;
    if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
                let rows = utils.sheet_to_json(wb.Sheets[sheets[0]], { header: keys });
                rows.shift();
                callback(rows);
            }
        }
        reader.readAsArrayBuffer(file);
    }
}