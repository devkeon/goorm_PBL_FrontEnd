const colIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const rowIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const data = Array.from(Array(9), () => Array(9).fill(""));
const exportBtn = document.querySelector('#export');

function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
};

function exportExcel(arrayData){ 
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(arrayData);
    XLSX.utils.book_append_sheet(wb, ws, 'PBL4 Excel');
    let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'PBL4_' + new Date().getMilliseconds() + '.xlsx');
}

const toData = () => {
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            const toFind = colIndex[i] + '-' + `${j + 1}`
            const cell = document.getElementById(toFind)
            data[j][i] = cell.value;
        }
    }
    exportExcel(data);
}

exportBtn.addEventListener('click', toData);

function highlight (event){
    const index = event.currentTarget.id.split('-');
    const info = document.getElementById('current-info');
    info.innerHTML = index[0] + index[1];
    const col = document.getElementById(index[0]);
    const row = document.getElementById(index[1]);
    col.classList.add('selected');
    row.classList.add('selected');
}

function highlightOut(event) {
    const index = event.currentTarget.id.split('-');
    const col = document.getElementById(index[0]);
    const row = document.getElementById(index[1]);
    col.classList.remove('selected');
    row.classList.remove('selected');
}

function createExcel() {
    const excel = document.querySelector('.cell-container');

    const column = document.createElement('div');
    column.className = 'col-index';
    const empty = document.createElement('span');
    empty.className ='index';
    empty.innerHTML = '&nbsp';
    column.appendChild(empty);

    colIndex.forEach(idx => {
        const indexCell = document.createElement('span');
        indexCell.className = 'index';
        indexCell.id = idx;
        indexCell.innerHTML = idx;
        column.appendChild(indexCell);
    });
    excel.appendChild(column);

    rowIndex.forEach(idx => {
        const rowCell = document.createElement('div');
        rowCell.className ='row';

        const indexCell = document.createElement('span');
        indexCell.className = 'index';
        indexCell.id = `${idx}`;
        indexCell.innerHTML = idx;
        rowCell.appendChild(indexCell);

        colIndex.forEach(coli => {
            const inputCell = document.createElement('span');
            inputCell.className = 'cell';

            const write = document.createElement('input');
            write.className = 'cell-write';
            write.setAttribute('type', 'text');
            write.id = `${coli}-${idx}`;
            write.addEventListener('focus', (e) => highlight(e));
            write.addEventListener('blur', (e) => highlightOut(e));
            inputCell.appendChild(write);
            rowCell.appendChild(inputCell);
        });
        excel.appendChild(rowCell);
    });
}

createExcel();
