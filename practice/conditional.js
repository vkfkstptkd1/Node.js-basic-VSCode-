var args=process.argv;
console.log(args[2]);//3번째 위치에 입력, ex)node 경로 1 ->> c1 출력
console.log('A');
console.log('B');
if(args[2]==='1'){
  console.log('C1')
}else {
  console.log('C2');
}
console.log('D');
