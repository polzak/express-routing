var express = require('express');
var app = express();
var path = require('path');

//메인 페이지에 인덱스 파일 연결
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

//어드민 라우터 선언.
var adminRouter = express.Router();

//어드민 라우터에 미들웨어 추가. 
adminRouter.use(function(req, res, next){
	console.log(req.method, req.url);//이 미들웨어는 리퀘스트를 어떤 메소드로 어떤 url을 처리했는지 콘솔에 로그하는 작업을 한다. 
	next();//next()는 미들웨어의 작업이 끝났으므로 계속 하던 일 해라라는 뜻.
});//이 미들웨어 선언 이후에 선언된 페이지들만 콘솔에 로그되는 것에 유의. 즉, 이 미들웨어 이후에 선언된 경로들만 이 미들웨어를 사용한다. 이전에 선언된 경로는 이 부분까지 오기 전에 끝나버리므로.
//이 미들웨어는 대표적으로 로그인 여부를 감지하는 데 사용될 수 있다. 경로 이동을 하는 중간에(세션 중간에), 사용자가 로그인 상태인지 검사한 다음 경로를 계속 이어나가는 것이다. 

//어드민 메인 페이지.
adminRouter.get('/', function(req, res){
	res.send('I am the dashboard!');
});

//어드민 사용자 페이지.
adminRouter.get('/users', function(req, res){
	res.send('I show all the users!');
});

//어드민 라우터를 사용한다고 선언.
app.use('/admin', adminRouter);

//서버 연결.
app.listen(1337);
console.log('server is running on 1337');
