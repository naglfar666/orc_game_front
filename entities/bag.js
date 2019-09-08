class Bag {
    constructor () {
        this.iconRes = '/res/ui/bag.png'
        this.width = 56
        this.height = 56

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
    
            WORLD.addChild(context._bag)
            resolve(true)
        })
        
    }
}