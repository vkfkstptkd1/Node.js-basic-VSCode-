var http = require('http');
var fs = require('fs');
var url = require('url');

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
var app = http.createServer(function(request, response) {
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
            <form action="http://localhost:3000/process_create" method="post">
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
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);