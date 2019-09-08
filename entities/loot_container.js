class LootContainer {
    constructor () {
        this._loot_container = new PIXI.Container();

        this._loot_container.x = 0
        this._loot_container.y = 0
    }

    async fillItems(context, items) {
        let newWidth = 0, newHeight = 0

        this._loot_container.x = context.x + context.width
        this._loot_container.y = context.y

        if (items.length > 0) {

            let itemY = 0
            let itemX = 10
            
            for (let i = 0; i < items.length; i++) {
                switch (items[i].lootObject.type) {
                    case 1:
                        await new Food(this._loot_container, items[i], itemX, itemY).render()
                        break;
                }
                
                if ((i + 1) % 3 === 0) {
                    itemY = 0
                    itemX += items[i].lootObject.width + 15
                } else {
                    itemY += items[i].lootObject.height + 10
                }
                
            }
        }
        
        WORLD.addChild(this._loot_container)
    }

    clear () {

    }

    get context() {
        return this._loot_container
    }
}