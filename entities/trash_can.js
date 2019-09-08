class TrashCan {
    constructor(params) {
        this.x = params.xAxis
        this.y = params.yAxis
        this.mapObjectId = params.id

        this.title = params.gameObject.title
        this.description = params.gameObject.description
        this.height = params.gameObject.height
        this.width = params.gameObject.width
        this.icon = params.gameObject.iconSprite
        this.iconRes = '/res/trash_cans/' + this.icon + '.png'
        this.action = params.action

        this.gameObjectId = params.gameObject.id
        this.mapObjectId = params.id
        this._trash_cans = null
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
            context._trash_cans = new PIXI.Sprite(PIXI.loader.resources[context.iconRes].texture);
            
            context._trash_cans.x = context.x
            context._trash_cans.y = context.y
            context._trash_cans.height = context.height
            context._trash_cans.width = context.width

            if (context.action) {
                context._trash_cans.interactive = true
                context._trash_cans.buttonMode = true
    
                context._trash_cans.on('pointerdown', () => {
                    axios.get(CONFIG.API_URL + '/game_object/open/' + context.mapObjectId,{
                        headers: {
                            'token': CONFIG.TOKEN
                        }
                    }).then(response => {
                        if (response.data.type === 'success') {
                            LOOT_CONTAINER.fillItems(context, response.data.data)
                        }
                    })
                })
            }
            

            WORLD.addChild(context._trash_cans)

            WORLD.GAME_OBJECTS.STOPPERS.push({
                fromX: context._trash_cans.x,
                fromY: context._trash_cans.y,
                toX: context._trash_cans.x + context._trash_cans.width,
                toY: context._trash_cans.y + context._trash_cans.height
            })

            resolve(true)
        })
        
    }

    get context() {
        return this._trash_cans
    }
}