class Health {
    constructor (params) {
        this.iconRes = '/res/ui/bar.png'
        this.width = 128
        this.height = 32
        this.healthAmount = params.amount

        this.x = window.innerWidth - 138
        this.y = window.innerHeight - 30
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
            context._health = new PIXI.Sprite(PIXI.loader.resources[context.iconRes].texture);
    
            context._health.x = context.x
            context._health.y = context.y
            context._health.height = context.height
            context._health.width = context.width
    
            WORLD.addChild(context._health)

            let graphic = new PIXI.Graphics();
            graphic.x = context.x + 5
            graphic.y = context.y + 5

            graphic.interactive = true;

            graphic
                .on('pointerover', () => {
                    context._amountText = new PIXI.Text(context.healthAmount,{fontFamily : 'Arial', fontSize: 12, fill : 0xffffff});
                    context._amountText.x = context.width / 2 - 20
                    context._amountText.y = context.height / 2 - 14
                    graphic.addChild(context._amountText)
                    
                })
                .on('pointerout', () => {
                    graphic.removeChild(context._amountText)
                })

            WORLD.addChild(graphic)

            graphic.beginFill(0xec0000)
            graphic.drawRect(0, 0, context.healthAmount, 22)
            graphic.endFill();

            resolve(true)
        })
        
    }

    get context () {
        return this._health
    }

}