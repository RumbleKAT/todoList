class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;
        window.onhashchange = this.hashChanged.bind(this);
        this.hashChanged();
    }

    hashChanged() {
        let pageName = undefined;
        if (window.location.hash.length > 0) {
            pageName = window.location.hash.substr(1);
            this.draw(pageName);
        } else if (window.location.hash.length == 0) {
            pageName = "home"
            this.draw(pageName);
        }
    }

    draw(pageName) {
        const currentLayout = this.routes[pageName];
        state.pageName = pageName;
        return new Promise((resolve,reject)=>{
            resolve(currentLayout.load());
        }).then(()=>{
            this.rootElement.innerHTML = "";
            currentLayout.draw(this.rootElement);
        });
    }
}

