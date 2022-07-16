export default class Snake {
    // 表示蛇头的元素
    head: HTMLElement
    // 蛇的身体（包括蛇头）
    bodies: HTMLCollection
    // 获取蛇的容器
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    // 获取蛇的坐标（其实就是蛇头的坐标）
    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }

    set X(val: number) {
        // 判断如果传入的值和之前的值相同，则不修改
        if (this.X === val) return

        // X的值得合法范围 0-290，超过范围表示蛇撞墙了
        if (val < 0 || val > 290) {
            throw new Error('蛇撞墙了！')
        }

        // 修改X时，时在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
            // 如果新值val大于旧值X，则说明蛇在向右走，此时发生掉头，应该让蛇继续向左走
            if(val > this.X) val = this.X - 10
            else val = this.X + 10
        }

        //移动身体
        this.moveBody()
        this.head.style.left = val + 'px'
        this.checkHeadBody()
    }

    set Y(val: number) {
        // 判断如果传入的值和之前的值相同，则不修改
        if (this.Y === val) return

        if (val < 0 || val > 290) {
            throw new Error('蛇撞墙了！')
        }

        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
            if(val > this.Y) val = this.Y - 10
            else val = this.Y + 10
        }

        // 移动身体
        this.moveBody()
        this.head.style.top = val + 'px'
        this.checkHeadBody()
    }

    // 蛇增加身体长度的方法
    addBody() {
        // 向element中添加div
        this.element.appendChild(document.createElement('div'))
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        /*
        * 将后边的身体设置为前边身体的位置
        *   举例子：
        *       第四节 = 第三节的位置
        *       第三节 = 第二节的位置
        *       第二节 = 蛇头的位置
        * */
        // 遍历获取所有的身
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 检查蛇头是否撞到身体的方法
    checkHeadBody(){
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i = 1;i<this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了~')
            }
        }
    }
}