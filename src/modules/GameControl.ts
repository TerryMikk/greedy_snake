// 游戏控制器，控制其他的所有类
// 引入其他类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

export default class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake
    // 食物
    food: Food
    // 计分板
    scorePanel: ScorePanel

    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = ''
    // 创建一个属性来记录游戏是否结束
    isLive = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10,2)

        this.init()
    }

    // 初始化游戏，调用即游戏开始
    init() {
        // 绑定键盘按键按下的事件
        // 如果这里不适用bind重新绑定，则keyDownHandler方法中的this是document
        document.addEventListener('keydown', this.keyDownHandler.bind(this))
        // 调用蛇的移动方法
        this.move()
    }

    // 创建一个键盘按下的响应函数
    keyDownHandler(event: KeyboardEvent) {
        // 获取键盘按键 
        // chrome：ArrowUp  ArrowDown  ArrowLeft  ArrowRight
        // ie: Up  Down  Left  Right
        // console.log(event.key);

        // 修改direction的值
        this.direction = event.key
    }

    // 蛇移动的方法
    move() {
        /* 
        根据方向（this.direction）来让位置改变
            向上： top 减少
            向下： top 增加
            向左： left 减少
            向右： left 增加
        */

        // 获取蛇的位置
        let X = this.snake.X
        let Y = this.snake.Y

        // 根据按键的方向修改X和Y的值
        switch(this.direction) {
            case 'ArrowUp':
            case 'Up':
            case 'w':
                // 向上移动 top 减小
                Y -= 10
                break
            case 'ArrowDown':
            case 'Down':
            case 's':
                // 向下移动 top 增加
                Y += 10
                break
            case 'ArrowLeft':
            case 'Left':
            case 'a':
                // 向左移动 left 减少
                X -= 10
                break
            case 'ArrowRight':
            case 'Right':
            case 'd':
                // 向左移动 left 增加
                X += 10
                break
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X,Y)

        // 修改蛇的X和Y
        try{
            this.snake.X = X
            this.snake.Y = Y
        }catch (e){
            // 进入catch，说明出现了异常，表示游戏结束了
            // @ts-ignore
            alert(e.message + '游戏结束！')
            this.isLive = false
        }

        // 开启定时调用
        this.isLive && setTimeout(this.move.bind(this), 300 - (this.scorePanel.level - 1) * 20)
    }

    // 定义一个方法，用来检查蛇是否吃到了食物
    checkEat(X:number, Y:number){
        if(X === this.food.X && Y === this.food.Y) {
            // 食物的位置要进行重置
            this.food.change()
            // 分数增加
            this.scorePanel.addScore()
            // 蛇增加一节
            this.snake.addBody()
        }
    }
}