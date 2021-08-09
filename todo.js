// 載入localStorage的預設變數
let todoList = []

// 處理送出
function handleSumit() {
    // input的值
    let todoInput = $('#todoInput').val()
    console.log(todoInput)
    // 如果沒輸入就返回
    if (todoInput === '') return
    // 判斷是否存入localstorage
    if(!localStorage.getItem('todoArr')){
        todoList=[]
    }else{todoList = [localStorage.getItem('todoArr')]}
    // console.log(todoList)
    let arr = []
    arr.push(todoInput)
    // console.log(arr)
    // 若無資料改寫入第一筆
    if (todoList[0] === '') {
        todoList = todoInput
    } else {
        todoList.push(arr)
    }
    
    // console.log(todoList)
    localStorage.setItem('todoArr', todoList)
    // 清空輸入欄
    $('#todoInput').val('')
    // 切換顯示
    $('.noTodo').hide()
    $('.todoList').show()
    // 增加DOM
    $('.todoList').append(
        `<div class="todo">
        <p>${todoInput}</p>
        <button
        class="deleteButton"
        >
        X
        </button>
    </div>`
    )
}

//  載入畫面存入todoArr
(function  getTodoArr() {
    console.log('載入畫面存入todoArr')
    if (localStorage.getItem('todoArr') == null) {
        $('.todoList').hide()
        $('.noTodo').show()
    }else{
        $('.noTodo').hide()
        $('.todoList').show()
        todoList = localStorage.getItem('todoArr').split(',')
        // console.log(todoList)
        todoList.forEach(v=>{
            $('.todoList').append(
                `<div class="todo">
                <p>${v}</p>
                <button
                class="deleteButton"
                >
                X
                </button>
            </div>`
            )
        })
    }
}())


// 刪除
$(document).on('click','.deleteButton',function () {
    console.log($(this).prev().text())
    $(this).parent().remove()
    todoList = localStorage.getItem('todoArr').split(',')
    const newList = todoList.filter((v) => {
    return v !== $(this).prev().text()
    })
    console.log('newList',newList)
    localStorage.setItem('todoArr', newList)
    if(newList.length === 0){
    localStorage.clear()
    $('.todoList').hide()
    $('.noTodo').show()
    }
})
