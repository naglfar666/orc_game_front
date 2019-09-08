const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 700;

const WORLD = new PIXI.Container({
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT
});

WORLD.x = 50;
WORLD.y = 50;

WORLD.GAME_OBJECTS = {
    STOPPERS: [],
    ROADS: []
}

const LOOT_CONTAINER = new LootContainer()

const BAG = new Bag().render()

function setupWorld() {
    return new Promise((resolve, reject) => {
        /**
         * Загружаем игровой мир
         */
        axios.get(CONFIG.API_URL + '/game_object/all',{
            headers: {
                'token': CONFIG.TOKEN
            }
        }).then(async (response) => {
            console.log(response)
            if (response.data.type === 'success') {

                let bgTexture =  PIXI.Texture.fromImage('/res/city_tiles/tile_0028.png');

                let bg = new PIXI.TilingSprite(bgTexture);

                bg.width = WORLD_WIDTH;
                bg.height = WORLD_HEIGHT;

                bg.interactive = true
                bg.on('pointerdown', () => {
                    LOOT_CONTAINER._clear()
                })

                WORLD.addChild(bg);

                let gameObjects = response.data.data
                for (let i = 0; i < gameObjects.length; i++) {

                    switch (gameObjects[i].gameObject.type) {
                        case 1:
                            await new Building(gameObjects[i]).render()
                            break;

                        case 2:
                            await new Road(gameObjects[i]).render()
                            break;

                        case 3:
                            await new TrashCan(gameObjects[i]).render()
                            break;
                    }
                }

                resolve(true)
            } else {
                resolve(false)
            }
        })
        
    })
}
