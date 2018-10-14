function Card(param){
    this.template = `<li class='content-element' id={id} type="{type}">
        <h2>{title}</h2>
        <p>등록번호 : {id} 만든이 : {name}, 카테고리: {category} </p>
        <button class='remove'>X</button>
        <button class='next' id={id} type="{type}">&rarr;</button>
        </li>`;
    if(param.type === 'done'){
        this.template = `<li class='content-element' id={id} type="{type}">
        <h2>{title}</h2>
        <p>등록번호 : {id} 만든이 : {name}, 카테고리: {category} </p>
        <button class='removeCard'>X</button>
        </li>`;
    }

    this.innerHTML = this.template
      .replace("{title}", param.title)
      .replace("{category}", param.category)
      .replace("{name}", param.name)
      .replace("{id}", param.id)
      .replace("{id}", param.id)
      .replace("{type}", param.type);
}
