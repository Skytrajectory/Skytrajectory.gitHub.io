var cells = document.querySelectorAll('.cell');
var currentPlayer = 'x'; //默认X开始
var currentPlayerh = 'xh'; //默认Xh开始
var gameBox = document.querySelector('#box');
var steps = 0;
cells.forEach(function (item) {
    var cell = item;
    cell.addEventListener('click', clickCell, { once: true });
});
function clickCell(event) {
    var target = event.target;
    target.classList.add(currentPlayer);
    steps++;
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        var who = currentPlayer === 'x' ? '红滑稽' : '黄滑稽';
        alert(who + '赢了');
        location.reload();
        return; //因为游戏已经结束，使用return强制结束，组织后续代码执行
    }
    if (steps === 9) {
        alert('平局');
        location.reload();
        return;
    }
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; //通过三元运算符交替玩家
    currentPlayerh = currentPlayerh === 'xh' ? 'oh' : 'xh'; //通过三元运算符交替玩家悬浮
    gameBox.classList.remove('x', 'o');
    gameBox.classList.remove('xh', 'oh');
    gameBox.classList.add(currentPlayer);
    gameBox.classList.add(currentPlayerh);
}
var winArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
function checkWin(currentPlayer) {
    return winArr.some(function (item) {
        var cellIndex1 = item[0];
        var cellIndex2 = item[1];
        var cellIndex3 = item[2];
        if (
        //    cells[cellIndex1].classList.contains(currentPlayer)&&
        //    cells[cellIndex2].classList.contains(currentPlayer)&&
        //    cells[cellIndex3].classList.contains(currentPlayer)
        hasClass(cells[cellIndex1], currentPlayer) &&
            hasClass(cells[cellIndex2], currentPlayer) &&
            hasClass(cells[cellIndex3], currentPlayer)) {
            return true;
        }
        return false;
    });
}
//封装函数
function hasClass(el, name) {
    return el.classList.contains(name);
}
//作弊功能
var b = document.querySelector('.cheat');
b.addEventListener('click', yo);
function yo() {
    alert('你赢了，但这值得吗？');
    location.reload();
}
