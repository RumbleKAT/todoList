class Page {
  constructor(url) {
    this.url = "views/" + url;
    this.innerHTML = "";
    this.pageName = url;
  }

  get() {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open("GET", "./" + this.url, false);
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (req.status === 200) resolve(this.responseText);
          else {
            reject("error!");
          }
        }
      };
      req.send();
    });
  }

  load() {
    this.get("./" + this.url).then(
      res => {
        this.innerHTML = res;
      },
      () => {
        console.log("Cannot Found...");
      }
    );
  }

  addBtnEvent(type, element){
    if(type ==='next'){
      element.querySelectorAll('button')[1].addEventListener('click',function(){
        let id = this.parentNode.getAttribute('id');
        let type = this.parentNode.getAttribute('type');
          if (type === 'todo') {
            type = 'doing';
          } else if (type === 'doing') {
            type = 'done';
          }
          state.todoList.forEach(element => {
            if (element.id == id) {
              element.type = type;
            }
          });
          state.update();
      })
    }else if(type == 'delete'){
      element.querySelectorAll('button')[0].addEventListener('click', function () {
        let id = this.parentNode.getAttribute("id");
        let temp = state.todoList.filter(element => {
          return element.id != id;
        });
        state.todoList = temp;
        repository.todoList = state.todoList;
        repository.setData(repository.todoList);
        state.update();
      });
    }
  }

  appendList(type, element){
    let listElement = '';
    listElement += state.todoList
      .map(el => {
        if (el.type === type) {
          return new Card(el).innerHTML;
        } else {
          return "";
        }
      })
      .reduce((total, el) => {
        return total + el;
      }, "");


    if(type === 'done'){
      element.querySelector("#DONE").innerHTML += listElement;
      element.querySelector("#DONE").querySelectorAll("li").forEach(el=>{
        this.addBtnEvent('delete', el);
      });
    }else if(type == 'doing'){
      element.querySelector("#DOING").innerHTML += listElement;
      element.querySelector("#DOING").querySelectorAll("li").forEach(el => {
        this.addBtnEvent('next', el);
        this.addBtnEvent("delete", el);

      });
    } else if (type == 'todo') {
      element.querySelector("#TODO").innerHTML += listElement;
      element.querySelector("#TODO").querySelectorAll("li").forEach(el => {
        this.addBtnEvent('next', el);
        this.addBtnEvent("delete", el);
      });
    }
  }

  send(element){
    element.querySelector("form").addEventListener("submit", e => {
      const formData = new FormData(e.target);
      let category = formData.get("category");
      if (category == 1){
          category = "Study"
      } else if (category ==2){
        category = "Excercise"
      } else{
        category = "Working"
      }
      let todo = { "id": state.todoList[state.todoList.length - 1].id + 1, "title": formData.get("description"), "category": category, "name": formData.get("maker"), "type": "todo" };
      state.todoList.push(todo);

      alert(JSON.stringify(todo));
      repository.setData(state.todoList);

      window.location.href = "./";
      state.update();
    });
  }

  show(element) {
    element.innerHTML = this.innerHTML;
    if (this.pageName === 'home.html'){
      if(state.todoList){
        this.appendList('done',element);
        this.appendList('doing', element);
        this.appendList('todo', element);
        element.querySelector('#sorting').addEventListener('click',function(){
          state.todoList = state.todoList.sort(idSorting);
          state.update();
        });
      }
    }
    else if(this.pageName === 'addtodo.html'){
      this.send(element);
    }
  }
}