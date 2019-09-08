class LootContainer {
    constructor () {
        this._init()
    }

    _init () {
        this._loot_container = new PIXI.Container();

        this._loot_container.x = 0
        this._loot_container.y = 0
    }

    _clear () {
        WORLD.removeChild(this._loot_container)
    }
    /**
     * Заполнение контейнера с лутом
     * @param {*} context - Экземпляр класса, вызывающий открытие контейнера
     * @param {*} items - Список элементов, которые требуется открыть в контейнере
     */
    async fillItems(context, items) {
        this._clear()

        this._init()

        this._loot_container.x = context.x + context.width
        this._loot_container.y = context.y

        if (items.length > 0) {

            let itemY = 0
            let itemX = 10
            
            for (let i = 0; i < items.length; i++) {
                switch (items[i].lootObject.type) {
                    case 1:
                        await new Food(this._loot_container, items[i], itemX, itemY, context).render()
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

    get context() {
        return this._loot_container
    }
}