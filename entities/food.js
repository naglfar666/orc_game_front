class Food {
    constructor (context, params, x, y) {
        this.x = x
        this.y = y
        this.mapObjectId = params.id

        this.title = params.lootObject.title
        this.description = params.lootObject.description
        this.height = params.lootObject.height
        this.width = params.lootObject.width
        this.icon = params.lootObject.iconSprite
        this.iconRes = '/res/food/' + this.icon + '.png'
        this.action = params.action

        this.lootObjectId = params.id
        this.amount = params.amount
        this._food = null
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

            let graphic = new PIXI.Graphics()

            graphic.x = context.x
            graphic.y = context.y

            LOOT_CONTAINER.context.addChild(graphic)

            graphic.lineStyle(1.5, 0xc4b875)
            graphic.beginFill(0x4b4b4b)
            graphic.drawCircle(4,4,8)
            graphic.endFill()

            context._food = new PIXI.Sprite(PIXI.loader.resources[context.iconRes].texture)
            
            context._food.x = context.x
            context._food.y = context.y
            context._food.height = context.height
            context._food.width = context.width
            // console.log(context._food)
            LOOT_CONTAINER.context.addChild(context._food)

            resolve(true)
        })
        
    }
}