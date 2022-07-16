class Food{
    // 定义一个属性表示食物相应的元素
    element: HTMLElement

    constructor() {
        // 获取界面中父元素并将其复制给element
        this.element = document.getElementById('food')!
    }

    // 定义一个获取食物x轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    // 修改食物位置的方法
    change() {
        // 生成随机的位置
        // 食物的位置，最小0，最大290
        // 蛇移动一次是一格，一格的大小是10px，所有就要求食物的坐标必须是10的倍数
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10

        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export default Food