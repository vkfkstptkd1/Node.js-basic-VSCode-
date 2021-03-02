var fs = require('fs');


//동기
//readFileSync

console.log('A');
var result = fs.readFileSync('practice/sample.txt');
console.log(result);
console.log('C');
/*
출력 :
A
B

C
*/

//비동기
//readFile->callback이 인자에 있음
console.log('A');
fs.readFile('practice/sample.txt','utf8',function(err,result){
  console.log(result);
});
console.log('C');

/*
출력 :
A
C
B
*/
