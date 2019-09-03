const APP = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
})

document.body.appendChild(APP.view)

// APP.ticker.add(delta => {
//     console.log(delta)
// })