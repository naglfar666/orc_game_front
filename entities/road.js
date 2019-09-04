class Road {
    constructor(params) {
        this.x = params.xAxis
        this.y = params.yAxis
        this.mapObjectId = params.id

        this.title = params.gameObject.title
        this.description = params.gameObject.description
        this.height = params.gameObject.height
        this.width = params.gameObject.width
        this.icon = params.gameObject.iconSprite
        this.iconRes = '/res/roads/' + this.icon + '.png'

        this.gameObjectId = params.gameObject.id
        this._road = null
    }

    render() {
        return new Promise (async (resolve, reject) => {
            if (PIXI.loader.resources[this.iconRes]) {
                await this.setup(this)
                resolve(true) 
            } else {
                PIXI.loader
                .add(this.iconRes)
                .load(async () => {
                    await this.setup(this)
                    resolve(true)
                });
            }

            
            
        })
        
    }

    setup(context) {
        return new Promise ((resolve, reject) => {
            context._road = new PIXI.Sprite(PIXI.loader.resources[context.iconRes].texture);
    
            context._road.x = context.x
            context._road.y = context.y
            context._road.height = context.height
            context._road.width = context.width
    
            WORLD.addChild(context._road)
    
            WORLD.GAME_OBJECTS.ROADS.push({
                fromX: context._road.x,
                fromY: context._road.y,
                toX: context._road.x + context._road.width,
                toY: context._road.y + context._road.height
            })

            resolve(true)
        })
        
    }
}