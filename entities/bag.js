class Bag {
    constructor () {
        this.iconRes = '/res/ui/bag.png'
        this.width = 56
        this.height = 56

        this.actionName = 'use'
        this.x = 10
        this.y = window.innerHeight - 50
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
            context._bag = new PIXI.Sprite(PIXI.loader.resources[context.iconRes].texture);
    
            context._bag.x = context.x
            context._bag.y = context.y
            context._bag.height = context.height
            context._bag.width = context.width

            context._bag.interactive = true
            context._bag.buttonMode = true

            context._bag.on('pointerdown', () => {
                axios.get(CONFIG.API_URL + '/user/bag/',{
                    headers: {
                        'token': CONFIG.TOKEN
                    }
                }).then(response => {
                    if (response.data.type === 'success') {
                        LOOT_CONTAINER.fillItems(context, response.data.data)
                    }
                })
            })
    
            WORLD.addChild(context._bag)
            resolve(true)
        })
        
    }

    get context () {
        return this._bag
    }

    get action () {
        return this.actionName
    }
}