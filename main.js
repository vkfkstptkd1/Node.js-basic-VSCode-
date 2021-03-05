var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <a href="/create">create</a>
      ${body}
    </body>
    </html>
    `;
}

function templateList(filelist) {
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}
var app = http.createServer(function(request, response) { //nodejs로 웹브라우저가 접속이 들어올때마다 callback함수 호출
    //request : 요청할 때 웹브라우저가 서버에게 전송한 정보들
    //response : 응답할 때 서버가 웹브라우저에게 전송할 정보들
    var _url = request.url; ///?=HTML 이부분 가져옴
    var queryData = url.parse(_url, true).query; // querystring parse 결과:{id=HTML}
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') { //home으로 갔느냐.
        if (queryData.id === undefined) //존재하지 않을때
        {
            //fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
            //특정 디렉터리에서 파일을 읽어서,description이라는 변수를 생성해주는 코드
            fs.readdir('./data', function(error, filelist) {
                //  console.log(filelist);
                var title = 'WelCome';
                var description = 'Hello,Node.js';
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', function(error, filelist) {
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else if (pathname === '/create') { //사용자가 서버에게 정보보내기
        fs.readdir('./data', function(error, filelist) {
            var title = 'WEB - create';
            var description = 'Hello,Node.js';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
            <form action="http://localhost:3000/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description"
                    placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `);
            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === '/create_process') {
        var body = '';
        request.on('data', function(data) {
            //callback이 실행될 때마다 body에 data추가(배열로 저장)
            body = body + data;

            //post로 전송되는 양이 많을 경우를 대비해서 씀
            if (body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
        });
        response.writeHead(200);
        response.end('sucess');

    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);