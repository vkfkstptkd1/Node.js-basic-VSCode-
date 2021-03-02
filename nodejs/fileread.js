//실행시킬때 반드시 디렉토리 맞추기. nodejs하위로 들어가서 실행해야해!
var fs=require('fs');
fs.readFile('sample.txt','utf8'/function(err,data){
  console.log(data);
})
