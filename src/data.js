import Burger from "./assets/burger.svg"
import Pizza from "./assets/pizza.png"
import Chocolate from "./assets/chocolate.png"
import Noodles from "./assets/noodles.png"
import Ramen from "./assets/ramen.png"
import Sushi from "./assets/sushi.png"
import Chicken from "./assets/chicken.png"
import Salad from "./assets/salad.png"
import Burger_1 from './assets/Burgers/burger_1.svg'
import Burger_2 from './assets/Burgers/burger_2.svg'
import Burger_3 from './assets/Burgers/burger_3.svg'
import Burger_4 from './assets/Burgers/burger_4.svg'

export const specialMenu = [

    {
    title:"Burgers",
    image:Burger,
    colorScheme:"first",
    items:[
        {
            id:"1",
            name:"HamBurger",
            chef:"Rock Lee",
            image:Burger_1,
            price:4.5
        },
        {
            id:"2",
            name:"Cheese Burger",
            chef:"Negi Hugo",
            image:Burger_2,
            price:4.5
        },
        {
            id:"3",
            name:"Egg Burger",
            chef:"Shikamaru",
            image:Burger_3,
            price:4.5
        },
        {
            id:"4",
            name:"Knuckle Sandwich",
            chef:"Might Guy",
            image:Burger_4,
            price:4.5
        },
    ]
    },
    {
    title:"Chinese",
    image:Sushi,
    colorScheme:"second",
    items:[
        {
            id:"5",
            name:"Haka Noodles",
            image:Noodles,
            chef:"Lee Xiong"
        },
        {
            id:"6",
            name:"Kakashi Sushi",
            image:Sushi,
            chef:"Obito"
        },
        {
            id:"7",
            name:"Kakashi Sushi",
            image:Sushi,
            chef:"Obito"
        },
        {
            id:"8",
            name:"Naruto Ramen",
            image:Ramen,
            chef:"Ichi Raku"
        },
    ]
    },
    {
    title:"Pizzas",
    image:Pizza,
    colorScheme:"fourth",
    items:[]
    },
    {
    title:"Chocolatey",
    image:Chocolate,
    colorScheme:"third",
    items:[]
    },
    {
    title:"Non Veg",
    image:Chicken,
    colorScheme:"first",
    items:[]
    },
    {
    title:"Healthy",
    image:Salad,
    colorScheme:"fourth",
    items:[]
    },
]

export const popularItems = [
    {
        id:"5",
        name:"Haka Noodles",
        image:Noodles,
        chef:"Lee Xiong"
    },
    {
        id:"6",
        name:"Kakashi Sushi",
        image:Sushi,
        chef:"Obito"
    },
    {
        id:"7",
        name:"Kakashi Sushi",
        image:Sushi,
        chef:"Obito"
    },
    {
        id:"2",
        name:"Cheese Burger",
        chef:"Negi Hugo",
        image:Burger_2,
        price:4.5
    },
]
