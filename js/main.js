var repository = new Repository();
repository.init();
repository.getDatas();

function State() {
  /*
  테스트 셋
  this.todoList = [
    { title : "한컴" , category : "study", id : 1,name:"song",type : "todo"},
    { title: "song", category: "study", id: 5, name: "song",type: "done" },
    { title: "song", category: "working", id: 4, name: "song", type : "doing" },
    { title: "song", category: "study", id: 3, name: "song", type : "todo" },
  ];*/
  this.todoList = [];
  this.pageName = '';
}

State.prototype.update = function () {
  router.draw('home');
}

var state = new State();
if(repository.todoList){
  state.todoList = repository.todoList;
}

var router = new Router(
  {
    addtodo: new Layout(new Page("menu.html"), new Page("addtodo.html")),
    home: new Layout(new Page("menu.html"), new Page("home.html"))
  },//레이아웃은 메뉴와 각 페이지에 해당하는 template html 정보를 저장하여 화면을 구성함
  document.querySelector("#root")
);


