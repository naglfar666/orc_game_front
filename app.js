const APP = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
})

document.body.appendChild(APP.view)

window.onresize(() => {
    if (window.innerWidth / window.innerHeight >= ratio) {
            ancho = ~~(window.innerHeight * ratio);
            alto= window.innerHeight;

            APP.view.style.position = 'absolute';
            APP.view.style.width = ancho + 'px';
            APP.view.style.height = alto + 'px';
            //console.log("A");
            
            APP.view.style.left = ~~((window.innerWidth-ancho)/2) + 'px';
            APP.view.style.top = '0px';
            
    } else {
            
            ancho = window.innerWidth;
            alto = ~~(window.innerWidth / ratio);

            APP.view.style.position = 'absolute';
            APP.view.style.width = ancho + 'px';
            APP.view.style.height = alto + 'px';
            //console.log("B");
            APP.view.style.left = 0 + 'px';
            APP.view.style.top = (window.innerWidth-(alto/2)) + 'px';
            
    }
})