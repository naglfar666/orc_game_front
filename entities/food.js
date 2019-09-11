class Food {
    /**
     * @param {*} context - Экземпляр контейнера, в котором отрисовываются элементы
     * @param {*} params - Список параметров объекта
     * @param x - Позиция по диагонали
     * @param y - Позиция по вертикали
     * @param clickedObjectContext - Экземпляр объекта, по которому был произведен клик
     */
    constructor (context, params, x, y, clickedObjectContext) {
        this.x = x
        this.y = y

        this.title = params.lootObject.title
        this.description = params.lootObject.description
        this.height = params.lootObject.height
        this.width = params.lootObject.width
        this.icon = params.lootObject.iconSprite
        this.iconRes = '/res/food/' + this.icon + '.png'
        this.action = params.action

        this.gameObjectMapLootObjectId = params.id
        this.mapObjectId = params.gameObjectMapId
        this.clickedObject = clickedObjectContext
        this.lootObjectId = params.lootObject.id
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

            if (context.amount >= 1) {
                let amountGraphic = new PIXI.Graphics()
                amountGraphic.x = context.x + context.width
                amountGraphic.y = context.y - 5
                LOOT_CONTAINER.context.addChild(amountGraphic)
                
                amountGraphic.lineStyle(1.5, 0xec0000)
                amountGraphic.beginFill(0xec0000)
                amountGraphic.drawCircle(2,2,4)
                amountGraphic.endFill()

                let amountText = new PIXI.Text(context.amount,{fontFamily : 'Arial', fontSize: 8, fill : 0xffffff});
                amountText.x = amountGraphic.x - 1
                amountText.y = amountGraphic.y - 3
                LOOT_CONTAINER.context.addChild(amountText)
            }

            context._food = new PIXI.Sprite(PIXI.loader.resources[context.iconRes].texture)
            
            context._food.x = context.x
            context._food.y = context.y
            context._food.height = context.height
            context._food.width = context.width

            context._food.interactive = true
            context._food.buttonMode = true

            context._food.on('pointerdown', () => {
                if (context.clickedObject.action === 'loot') {
                    axios.get(CONFIG.API_URL + '/game_object/loot/' + context.mapObjectId + '/' + context.gameObjectMapLootObjectId,{
                        headers: {
                            'token': CONFIG.TOKEN
                        }
                    }).then(response => {
                        if (response.data.type === 'success') {
                            context.clickedObject.context.emit('pointerdown')
                        }
                        console.log(response)
                    })
                } else if (context.clickedObject.action === 'use') {
                    axios.get(CONFIG.API_URL + '/food/eat/' + context.lootObjectId,{
                        headers: {
                            'token': CONFIG.TOKEN
                        }
                    }).then(response => {
                        if (response.data.type === 'success') {
                            context.clickedObject.context.emit('pointerdown')
                        }
                        console.log(response)
                    })
                }
                
            })
            
            LOOT_CONTAINER.context.addChild(context._food)

            resolve(true)
        })
        
    }

    get context () {
        return this._food
    }
}