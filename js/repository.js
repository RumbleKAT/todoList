function Repository(){
    this.storage = window.localStorage;
    this.todoList;
}

Repository.prototype.init = function () {
    if(this.getDatas('todoList')){
        this.todoList = JSON.parse(this.storage.getItem("todoList"));
    }
};

Repository.prototype.getDatas = function() {
  return this.storage.getItem("todoList");
};

Repository.prototype.getData = function(type) {
  let arr = this.storage.getItem("todoList").filter(element => {
    return (element.type == type);
  });
  return arr;
};

Repository.prototype.deleteData = function(id){
    let temp = JSON.parse(this.getDatas("todoList"));
    temp = temp.filter((element)=>{
        return element.id != id;
    });
    this.storage.setItem("todoList",JSON.stringify(temp));
}

Repository.prototype.setData = function(data) {
    this.storage.setItem('todoList', JSON.stringify(data));
};