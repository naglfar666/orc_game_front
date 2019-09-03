
/**
 * Устанавливаем человека
 */

var PERSON = null

function setupPerson() {
    return new Promise((resolve, reject) => {

        PIXI.loader
            .add("/res/cat.png")
            .load(renderPerson);
            
        function renderPerson() {
            PERSON = new PIXI.Sprite(PIXI.loader.resources["/res/cat.png"].texture);

            PERSON.x = 0;
            PERSON.y = 0;

            PERSON.vx = 0;
            PERSON.vy = 0;
            PERSON.width = 96;
            PERSON.height = 96;

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
            axios.get('http://127.0.0.1:8080/api/v1/user/get_position',{
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
                            WORLD.pivot.x += PERSON.vx;
                            WORLD.pivot.y += PERSON.vy;

                            let newPositionX = PERSON.x + PERSON.vx;
                            let newPositionY = PERSON.y + PERSON.vy;

                            if ((newPositionY !== PERSON.y || newPositionX !== PERSON.x) && totalPasses % 10 === 0) {
                                
                                axios.post('http://127.0.0.1:8080/api/v1/user/set_position',{
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
                            totalPasses += PERSON.vx;
                            totalPasses += PERSON.vy;
                            PERSON.x += PERSON.vx;
                            PERSON.y += PERSON.vy;
                            
                        }
                    })

                    resolve(true);
                } else {
                    console.log(response);
                    resolve(false);
                }
            })
        }
        
        
    })
}