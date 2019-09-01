const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight
})

document.body.appendChild(app.view)

var container = new PIXI.Container({
  width: 10000,
  height: 5000
});


container.y = 50;
container.x = 50;

var bg = new PIXI.Sprite(PIXI.Texture.WHITE);
bg.tint = 0xff0000;
bg.width = 10000;
bg.height = 5000;

container.addChild(bg);

PIXI.loader
  .add("./res/cat.png")
  .load(setup);

function setup() {
  let cat = new PIXI.Sprite(PIXI.loader.resources["./res/cat.png"].texture);
  cat.y = 96;
  cat.x = 10;
  cat.vx = 0;
  cat.vy = 0;
  cat.width = 64;
  cat.height = 64;

  // Opt-in to interactivity
  cat.interactive = true;

  // Shows hand cursor
  cat.buttonMode = true;

  cat.on('pointerdown', () => {
    console.log('clicked')
  })

  container.addChild(cat);

  app.stage.addChild(container);

  let 
    left = keyboard('a'),
    up = keyboard('w'),
    down = keyboard('s'),
    right = keyboard('d');

  left.press = () => {
    cat.vx = -5;
    cat.vy = 0;
  };
  
  left.release = () => {
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  up.press = () => {
    cat.vy = -5;
    cat.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  right.press = () => {
    cat.vx = 5;
    cat.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  down.press = () => {
    cat.vy = 5;
    cat.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  state = play;
 
  app.ticker.add(delta => gameLoop(delta));

  function gameLoop(delta){
    state(delta);
  }
  
  function play(delta) {
    if (
      cat.x + cat.vx <= 0 
      || cat.x + cat.vx + cat.width >= container.width 
      || cat.y + cat.vy <= 0
      || cat.y + cat.vy + cat.height >= container.height
    ) {
      console.log('BORDER')
    } else {

      container.pivot.x += cat.vx;
      container.pivot.y += cat.vy;
      cat.x += cat.vx;
      cat.y += cat.vy;
    }
    
  }
}

