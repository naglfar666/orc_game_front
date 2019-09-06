class LootContainer {
    constructor () {
        this._loot_container = new PIXI.Container({
            width: 0,
            height: 0
        });

        this._loot_container.x = 0
        this._loot_container.y = 0

        this._loot_container.zIndex = 10;
    }

    async fillItems(context, items) {
        this._loot_container.width = 0
        this._loot_container.height = 0

        // if (items.length > 0) {
        //     for (let i = 0; i < items.length; i++) {
        //         if (i % 3) {
        //             this._loot_container.width += 10
        //         } else {
        //             this._loot_container.height += 10
        //         }
        //     }
            
        //     for (let i = 0; i < items.length; i++) {
        //         switch (items[i].lootObject.type) {
        //             case 1:
        //                 await new Food(this, items[i]).render()
        //                 break;
        //         }
        //     }
        // } else {
        //     this._loot_container.width = 20
        //     this._loot_container.height = 10
        // }

        this._loot_container.width = 100
        this._loot_container.height = 100

        this._loot_container.x = context.x
        this._loot_container.y = context.y
        
        this._loot_container.interactive = true
        this._loot_container.buttonMode = true

        this._loot_container.on('pointerdown', () => {
           
            console.log('Контейнер был нажат')
        })
        
        let bgTexture =  PIXI.Texture.fromImage('/res/city_tiles/tile_0075.png');

        let bg = new PIXI.TilingSprite(bgTexture);

        bg.width = this._loot_container.width;
        bg.height = this._loot_container.height;

        this._loot_container.addChild(bg);
        console.log(this._loot_container)
        WORLD.addChild(this._loot_container)
        console.log(WORLD)
    }

    clear () {

    }

    context() {
        return this._loot_container
    }
}