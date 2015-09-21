var express = require('express');
var app = express();
var path = require('path');

//메인 페이지에 인덱스 파일 연결
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

//어드민 라우터 선언.
var adminRouter = express.Router();

//어드민 메인 페이지.
adminRouter.get('/', function(req, res){
	res.send('I am the dashboard!');
});

//어드민 사용자 페이지.
adminRouter.get('/users', function(req, res){
	res.send('I show all the users!');
});

//어드민 포스트 페이지.
adminRouter.get('/posts', function(req, res){
	res.send('I show all the posts!');
});




//어드민 라우터를 사용한다고 선언.
app.use('/admin', adminRouter);


//서버 연결.
app.listen(1337);
console.log('server is running on 1337');
