/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-04-07 16:50:38
 * @version $Id$
 */

var table = document.getElementById('table');
var passed = [];
var str = "";
var a = null;
var b = null;
for(var i=0;i<20;i++){
  str += '<tr>';
  for(j=0;j<20;j++){
    str += '<td></td>';
  }
  str += '</tr>';
}
table.innerHTML = str;
var td = document.getElementsByTagName('td');

function onLoad() {
  table.innerHTML = str;

  var passed = [];
  var start = Math.floor(Math.random()*20);
  startTd = start*20;
  td[startTd].style.borderLeft = 0;
  goToNext(startTd);
  //随机去掉一些边界
  for(i=0;i<40;i++){//随机去掉上边界
    a = Math.floor(Math.random()*400);
    if(a > 19){
      td[a].style.borderTop = 0;
      td[a-20].style.borderBottom = 0;
    }
  }
  for(i=0;i<40;i++){//右边界
    a = Math.floor(Math.random()*400);
    if(a%20 != 19){
      td[a].style.borderRight = 0;
      td[a+1].style.borderLeft = 0;
    }
  }
  for(i=0;i<40;i++){//下边界
    a = Math.floor(Math.random()*400);
    if(a < 380 ){
      td[a].style.borderBottom = 0;
      td[a+20].style.borderTop = 0;
    }
  }
  for(i=0;i<40;i++){//左边界
    a = Math.floor(Math.random()*400);
    if(a%20 != 0){
      td[a].style.borderLeft = 0;
      td[a-1].style.borderRight = 0;
    }
  }
}
//因为起始点在左边，为了避免走入死路，每次默认先走上面或者右面，走不通再考虑左和下。
function goToNext(nowid) {
  
  if(nowid%20 == 19){
    td[nowid].style.borderRight = 0;
    return;
  }else{
    var nextid = null;
    var direction = null;
    passed.push(startTd);
    direction = Math.floor(Math.random()*2);
    if(direction == 0){//往上走
      nextid = nowid -20;
      if(nextid < 0 || passed.indexOf(nextid) > -1){
        direction++;
      }else {
        td[nowid].style.borderTop = 0;
        td[nextid].style.borderBottom =0;
        passed.push(nextid);
        goToNext(nextid);
      }
      
    }
    if(direction == 1){//往右走
      nextid = nowid + 1;
      if(nextid %20 == 0 || passed.indexOf(nextid) > -1){
        direction++; 
      }else{
        td[nowid].style.borderRight = 0;
        td[nextid].style.borderLeft = 0;
        passed.push(nextid);
        goToNext(nextid);
      }
    }
    if(direction == 2){//往下走
      nextid = nowid + 20;
      if(nextid > 399 || passed.indexOf(nextid) > -1){
        direction++;
      }else{
        td[nowid].style.borderBottom = 0;
        td[nextid].style.borderTop = 0;
        passed.push(nextid);
        goToNext(nextid);
      }
    }
    if(direction ==3){//往左走
      nextid = nowid - 1;
      if((nextid%20 == 19) || (passed.indexOf(nextid) > -1)||(nextid < 0)){
        onLoad();
      }else{
        td[nowid].style.borderLeft = 0;
        td[nextid].style.borderRight = 0;
        passed.push(nextid);
        goToNext(nextid);
      }
    }
}
  
}
