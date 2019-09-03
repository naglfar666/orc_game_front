const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 700;

const WORLD = new PIXI.Container({
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT
});

WORLD.x = 50;
WORLD.y = 50;

function setupWorld() {
    return new Promise((resolve, reject) => {

        try {
            let bgTexture =  PIXI.Texture.fromImage('/res/city_tiles/tile_0028.png');

            let bg = new PIXI.TilingSprite(bgTexture);

            bg.width = WORLD_WIDTH;
            bg.height = WORLD_HEIGHT;
            WORLD.addChild(bg);

            resolve(true)
        } catch (error) {
            console.log(error)
            resolve(false)
        }
        
    })
}
