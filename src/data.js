import Burger from "./assets/burger.svg"
import Pizza from "./assets/pizza.png"
import Chocolate from "./assets/chocolate.png"
import Noodles from "./assets/noodles.png"
import Sushi from "./assets/sushi.png"
import Salad from "./assets/salad.png"
import Burger_2 from './assets/Burgers/burger_2.svg'

export const specialMenu = [

    {
    title:"Burgers",
    image:Burger,
    colorScheme:"first",
    },
    {
    title:"Chinese",
    image:Sushi,
    colorScheme:"second"
    },
    {
    title:"Pizzas",
    image:Pizza,
    colorScheme:"fourth"
    },
    {
    title:"Chocolatey",
    image:Chocolate,
    colorScheme:"third",
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
