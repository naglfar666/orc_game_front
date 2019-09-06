const APP = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
})

var ratio = window.innerWidth / window.innerHeight
document.body.appendChild(APP.view)

window.onresize = () => {
    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    APP.view.style.width = w + 'px';
    APP.view.style.height = h + 'px';
}