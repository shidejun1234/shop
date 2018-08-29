var app = getApp()
Page({
    data: {
        curNav: 1,
        curIndex: 0,
        cart: [],
        navList: [
            {
                id: 1,
                name: '盆栽'
            },
            {
                id: 2,
                name: '台灯'
            },
            {
                id: 3,
                name: '神器'
            },
            {
                id: 4,
                name: '杂货铺'
            },
            {
                id: 5,
                name: '雨伞'
            },
            {
                id: 6,
                name: '文具'
            },
            {
                id: 7,
                name: '袜子'
            },
            {
                id: 8,
                name: '沐浴'
            }
        ],
        dishesList: [
            [
                {
                    name: "啊啊啊",
                    price: 38,
                    num: 1,
                    id: 1
                },
                {
                    name: "啊啊啊",
                    price: 58,
                    num: 1,
                    id: 29
                },
                {
                    name: "啊啊啊",
                    price: 88,
                    num: 1,
                    id: 2
                }
            ],
            [
                {
                    name: "啊啊啊",
                    price: 18,
                    num: 1,
                    id: 3
                },
                {
                    name: "啊啊啊",
                    price: 58,
                    num: 1,
                    id: 4
                }
            ],
            [
                {
                    name: "啊啊啊",
                    price: 18,
                    num: 1,
                    id: 5
                },
                {
                    name: "啊啊啊",
                    price: 8,
                    num: 1,
                    id: 6
                }
            ],
            []
        ],
        dishes: []
    },
    selectNav(event) {
        let id = event.target.dataset.id,
            index = parseInt(event.target.dataset.index);
        self = this;
        this.setData({
            curNav: id,
            curIndex: index
        })
    },
    // 选择菜品
    selectDish(event) {
        let dish = event.currentTarget.dataset.dish;
        let flag = true;
        let cart = this.data.cart;

        if (cart.length > 0) {
            cart.forEach(function (item, index) {
                if (item == dish) {
                    cart.splice(index, 1);
                    flag = false;
                }
            })
        }
    },
    setStatus(dishId) {
        let dishes = this.data.dishesList;
        for (let dish of dishes) {
            dish.forEach((item) => {
                if (item.id == dishId) {
                    item.status = !item.status || false
                }
            })
        }

        this.setData({
            dishesList: this.data.dishesList
        })
    },
    onLoad() {
    }
})