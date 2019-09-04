class Building {
    constructor(params) {
        this.x = params.xAxis
        this.y = params.yAxis
        this.mapObjectId = params.id

        this.title = params.gameObject.title
        this.description = params.gameObject.description
        this.height = params.gameObject.height
        this.width = params.gameObject.width
        this.icon = params.gameObject.iconSprite
        this.iconRes = '/res/buildings/' + this.icon + '.png'

        this.gameObjectId = params.gameObject.id
        this._building = null
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
            context._building = new PIXI.Sprite(PIXI.loader.resources[context.iconRes].texture);
            
            context._building.x = context.x
            context._building.y = context.y
            context._building.height = context.height
            context._building.width = context.width

            context._building.interactive = true
            context._building.buttonMode = true

            context._building.on('pointerdown', () => {
                console.log(context.title, context.description)
            })

            WORLD.addChild(context._building)

            WORLD.GAME_OBJECTS.STOPPERS.push({
                fromX: context._building.x,
                fromY: context._building.y,
                toX: context._building.x + context._building.width,
                toY: context._building.y + context._building.height
            })

            resolve(true)
        })
        
    }
}