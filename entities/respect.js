class Respect {
    constructor (params) {
        this.iconRes = '/res/ui/bar.png'
        this.width = 128
        this.height = 32
        this.respectAmount = params.amount

        this.x = window.innerWidth - 138
        this.y = window.innerHeight - 62
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
            context._respect = new PIXI.Sprite(PIXI.loader.resources[context.iconRes].texture);
    
            context._respect.x = context.x
            context._respect.y = context.y
            context._respect.height = context.height
            context._respect.width = context.width
    
            WORLD.addChild(context._respect)

            let graphic = new PIXI.Graphics();
            graphic.x = context.x + 5
            graphic.y = context.y + 5

            graphic.interactive = true;

            graphic
                .on('pointerover', () => {
                    context._amountText = new PIXI.Text(context.respectAmount,{fontFamily : 'Arial', fontSize: 12, fill : 0xffffff});
                    context._amountText.x = context.width / 2 - 20
                    context._amountText.y = context.height / 2 - 14
                    graphic.addChild(context._amountText)
                    
                })
                .on('pointerout', () => {
                    graphic.removeChild(context._amountText)
                })

            WORLD.addChild(graphic)

            graphic.beginFill(0x0500d6)
            graphic.drawRect(0, 0, context.respectAmount, 22)
            graphic.endFill();

            resolve(true)
        })
        
    }

    get context () {
        return this._respect
    }
}