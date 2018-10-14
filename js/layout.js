class Layout {
  constructor(...pages) {
    this.pages = pages;
  }

  load() {
    return Promise.all(this.pages.map(page => page.load()));
  }

  draw(rootElement) {
    this.pages.forEach((page)=>{
        let div = document.createElement("div");
        div.setAttribute('class',"navbar");
        page.show(div);
        rootElement.appendChild(div);
    });
  }


}