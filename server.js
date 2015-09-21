var express = require('express');
var app = express();
var path = require('path');

//메인 페이지에 인덱스 파일 연결
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

//한꺼번에 라우팅하는 방법. app.route는 곧 express.Router()를 선언하는 것과 같다. 
app.route('/login')//이를테면 로그인 페이지에서
				.get(function(req, res){//GET으로 받음과 동시에
					res.send('Here is shown the login form which is from GET method.')
				})
				.post(function(req, res){//POST로 보내는 것을 선언할 수 있다.
					console.log('login POST process is being processed...');
					res.send('From here the login information is sent through POST method.');
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

//param middleware를 사용해 name validation.
adminRouter.param('name', function(req, res, next, name){
	//여기에 validation 코드가 들어감.
	console.log('We are verifying your name, dear ' + name);
	req.name = name;//validation이 완료된 name을 req에 저장. 그래서 다음의 파라미터 라우팅에서는 req.params.name 대신 req.name으로 받는다.
	next();
});//반드시 파라미터 라우팅보다 앞서 선언되어야 한다.

//파라미터를 이용한 라우팅.
adminRouter.get('/users/:name', function(req, res){
	res.send('Hello, ' + req.name + '!');
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
