
/**
 * Устанавливаем человека
 */

var PERSON = null
var HEALTH = null
var RESPECT = null

function setupPerson() {
    var newPositionX = 0
    var newPositionY = 0

    return new Promise((resolve, reject) => {

        PIXI.loader
            .add('/res/city_tiles/tile_0186.png')
            .load(renderPerson);
            
        function renderPerson() {
            PERSON = new PIXI.Sprite(PIXI.loader.resources['/res/city_tiles/tile_0186.png'].texture);

            PERSON.x = 0;
            PERSON.y = 0;

            PERSON.vx = 0;
            PERSON.vy = 0;
            PERSON.width = 16;
            PERSON.height = 16;

            let totalPasses = 0;

            PERSON.interactive = true;

            WORLD.addChild(PERSON);
            APP.stage.addChild(WORLD);
            /**
             * Выставляем ходовку человеку
             */
            let 
                left = keyboard('a'),
                up = keyboard('w'),
                down = keyboard('s'),
                right = keyboard('d');

            left.press = () => {
                PERSON.vx = -1;
                PERSON.vy = 0;
            };
            
            left.release = () => {
                if (!right.isDown && PERSON.vy === 0) {
                    PERSON.vx = 0;
                }
            };
        
            up.press = () => {
                PERSON.vy = -1;
                PERSON.vx = 0;
            };
            up.release = () => {
                if (!down.isDown && PERSON.vx === 0) {
                    PERSON.vy = 0;
                }
            };
        
            right.press = () => {
                PERSON.vx = 1;
                PERSON.vy = 0;
            };
            right.release = () => {
                if (!left.isDown && PERSON.vy === 0) {
                    PERSON.vx = 0;
                }
            };
        
            down.press = () => {
                PERSON.vy = 1;
                PERSON.vx = 0;
            };
            down.release = () => {
                if (!up.isDown && PERSON.vx === 0) {
                    PERSON.vy = 0;
                }
            };
            /**
             * Подгружаем данные из БД
             */
            axios.get(CONFIG.API_URL + '/health/get',{
                headers: {
                    'token': CONFIG.TOKEN
                }
                }).then(async (response) => {
                    if (response.data.type === 'success') {
                        HEALTH = await new Health(response.data.data).render()

                        axios.get(CONFIG.API_URL + '/respect/get',{
                            headers: {
                                'token': CONFIG.TOKEN
                            }
                            }).then(async (response) => {
                                if (response.data.type === 'success') {
                                    RESPECT = await new Respect(response.data.data).render()
                                }
                            })
                    }
                })

            

            axios.get(CONFIG.API_URL + '/user/get_position',{
                headers: {
                    'token': CONFIG.TOKEN
                }
                }).then((response) => {
                if (response.data.type === 'success') {
                    PERSON.x = response.data.data.xAxis;
                    PERSON.y = response.data.data.yAxis;
                    WORLD.pivot.x = response.data.data.xAxis;
                    WORLD.pivot.y = response.data.data.yAxis;
                    /**
                     * Выставляем тикер для записи в БД текущей позиции
                     */
                    APP.ticker.add(delta => {
                        if (
                            PERSON.x + PERSON.vx >= 0 
                            && PERSON.x + PERSON.vx + PERSON.width <= WORLD.width 
                            && PERSON.y + PERSON.vy >= 0
                            && PERSON.y + PERSON.vy + PERSON.height <= WORLD.height
                        ) {

                            newPositionX = PERSON.x + PERSON.vx;
                            newPositionY = PERSON.y + PERSON.vy;

                            if (newPositionY !== PERSON.y || newPositionX !== PERSON.x) {
                                
                                axios.post(CONFIG.API_URL + '/user/set_position',{
                                    xAxis: PERSON.x,
                                    yAxis: PERSON.y
                                },{
                                headers: {
                                    'content-type': 'application/json',
                                    'token': CONFIG.TOKEN,
                                }
                                }).then(response => {
                                    if (totalPasses > 10000 || totalPasses < -10000) {
                                        totalPasses = 0
                                    }
                                    if (response.data.type !== 'success') {
                                        console.log('NO CONNECTION TO SERVER')
                                    }
                                })
                            }

                            if ((newPositionY !== PERSON.y || newPositionX !== PERSON.x) && checkWorldStoppers() ) {
                                totalPasses += PERSON.vx;
                                totalPasses += PERSON.vy;
                                PERSON.x += PERSON.vx;
                                PERSON.y += PERSON.vy;
                                WORLD.pivot.x += PERSON.vx;
                                WORLD.pivot.y += PERSON.vy;
                            }
                            
                            
                        }
                    })

                    resolve(true);
                } else {
                    console.log(response);
                    resolve(false);
                }
            })
        }

        function checkWorldStoppers() {
            let _stoppers = WORLD.GAME_OBJECTS.STOPPERS
            for (let i = 0; i < _stoppers.length; i++) {
                if (
                    (_stoppers[i].fromX < newPositionX || _stoppers[i].fromX < (newPositionX + PERSON.width))
                    && (_stoppers[i].toX > newPositionX || _stoppers[i].toX > (newPositionX + PERSON.width))
                    && (_stoppers[i].fromY < newPositionY || _stoppers[i].fromY < (newPositionY + PERSON.height))
                    && (_stoppers[i].toY > newPositionY || _stoppers[i].toY > (newPositionY + PERSON.height))
                ) {
                    return false
                }
            }
            return true;
        }
        
        
    })
}