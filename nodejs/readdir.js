var testFolder='./data';//./의 뜻은 현재 디렉토리에 있는 data를 뜻함.
var fs=require('fs');

fs.readdir(testFolder,function(error,filelist){
  console.log(filelist);
})
// 이 함수 출력하면 [ 'CSS', 'HTML', 'JavaScript' ] 이렇게 출력됨.
// 즉 , readdir은 파일 명을 순서대로 배열에 저장해줌.
