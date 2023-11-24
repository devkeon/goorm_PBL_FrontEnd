let toDos = [];
let newId = 0;
const tx = "새로운 todos"

function saveToDo() {
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadToDos() {
    const localToDos = localStorage.getItem('toDos');
    if (localToDos !== null) {
        const parsedToDos = JSON.parse(localToDos);
        parsedToDos.forEach(function (toDo) {
            makeToDos(toDo.tx, toDo.checking);
        });
    }
}

function finish(event) {
    finishCheck = event.currentTarget;
    lined = finishCheck.nextSibling;
    if(finishCheck.checked){
        lined.style.textDecorationLine = "line-through";
    }else{
        lined.style.textDecorationLine = "none";
    }
    for (let i = 0; i < toDos.length; i++){
        if (toDos[i].id === parseInt(lined.parentNode.id)){
            toDos[i].checking = finishCheck.checked;
            break;
        }
    }
    saveToDo();
}

function deleteToDo(event) {
    const toDoCat = event.currentTarget.parentNode.parentNode;
    toDoCat.parentNode.removeChild(toDoCat);
    const cleanToDos = toDos.filter(function (toDo) { 
        return toDo.id !== parseInt(toDoCat.id);
    });
    toDos = cleanToDos; // 추출된 내용을 toDos에 넣음
    saveToDo(); // localStorage에 저장
}

function editToDo (event){
    const li = event.currentTarget.parentNode.parentNode;
    const box = event.currentTarget.parentNode.parentNode.firstChild.nextSibling;
        for (let i = 0; i < toDos.length; i++){
            if (toDos[i].id === parseInt(li.id)){
                toDos[i].tx = box.value;
                break;
            }
        }
    if (box.disabled) {
        box.disabled = false;
    }
    else {
        box.disabled = true;
    }
    saveToDo();
}


function makeToDos(lines, finished){
    const toDoList = document.querySelector('main');

    const item = document.createElement('div');
    item.className = 'toDoList';

    const checkBox = document.createElement('input');
    checkBox.className = 'check-button';
    checkBox.setAttribute('type', 'checkbox');
    
    const text = document.createElement('input');
    text.className = 'todo-name';
    text.setAttribute('type', 'text');
    text.setAttribute('value', lines);
    text.disabled = true;
    const btns = document.createElement('div');
    btns.className = 'buttons';

    const editButton = document.createElement('button');
    editButton.className = 'editButton';
    editButton.textContent = '수정';
    const rmvButton = document.createElement('button');
    rmvButton.className = 'deleteButton';
    rmvButton.textContent = '삭제';

    // 체크 여부 심어주기
    if(finished){
        checkBox.checked = finished;
        text.style.textDecorationLine = "line-through";
    }else{
        text.style.textDecorationLine = "none";
    }

    // todo 삭제
    rmvButton.addEventListener('click', (event) => {
        deleteToDo(event);
    })

    // todo 완료
    checkBox.addEventListener('change', (event) => {
        finish(event);
    })

    // todo 수정
    editButton.addEventListener('click', (event) => {
        editToDo(event);
    })

    // todo 추가
    item.appendChild(checkBox)
    item.appendChild(text)
    btns.appendChild(editButton)
    btns.appendChild(rmvButton)
    item.appendChild(btns);
    item.id = newId;
    toDoList.appendChild(item);
    const toDoObj = {
        tx: lines,
        id: newId++,
        checking: finished
    };
    toDos.push(toDoObj);
    saveToDo();
}

const addButton = document.querySelector(".addButton");
addButton.addEventListener('click', (event) => {
    makeToDos(tx, false);
});

loadToDos();
