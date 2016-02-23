let result = 0;
let flagNumEmpty = true;
let printResult = function(){
  document.getElementById("field").value= result;
}
let numPress = function(num){
  if (flagNumEmpty){
    result = num;
    flagNumEmpty = false;
  }else{
    result = result*10+num;
  }
  printResult();
  console.log(result);
}

for(let i = 0; i <= 9; i++){
  document.getElementById("n"+i).onclick = function () {
    numPress(i);
  }
}