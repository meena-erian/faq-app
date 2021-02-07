const domain    = 'https://docs.google.com';
const docType   = 'spreadsheets';
const format    = "csv";
//const docId     = "1H2JCDOmrbdTKLpwwDuloNKnymDReOPUM6zwLK_-p1Lc";
const docId     = "1v5ue1yohYEJQW_CuYNbXRr_0VreV4Q4mjthb0wMlbZY";
const sheetId   = "0";
//const sheetId   = "1386834576";

async function getFAQ(){
    var resp = await fetch(`${domain}/${docType}/export?format=${format}&id=${docId}&gid=${sheetId}`, { mode: 'no-cors'});
    return await resp.text();
}

export default getFAQ;