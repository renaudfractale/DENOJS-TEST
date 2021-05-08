//fetch
/*
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
const todo = await res.json()

console.log(todo)
*/
//Blob
/*
const blob = new Blob([new Uint8Array([5,10])])
console.log(blob)

//FormData
const formData = new FormData()
formData.append("key1","value1")
formData.append("key2",blob)
*/
/*
const data = await Deno.readFile("text.txt")
console.log(data)

const file = await Deno.open("text.txt")

console.log(file)
*/

import { v4 } from 'uuid/mod.ts'
import { Quaternion, Axe, Parameter, Simulation , Compute} from './Libs/Quaternion.ts'
const id = v4.generate()
console.log(id)





let a :Quaternion = new Quaternion(1.0,2.0,3.0,4.0)
let b :Quaternion = new Quaternion(1.0,2.0,3.0,4.0)
console.log(a.PowerFloat(1.0))
console.log(b.PowerInt(2.0))
console.log(a.Normalise())
console.log(b.Normalise())
console.log(a)
console.log(b)








let axeW = new Axe("W",false,-4.0,4.0,1000)
let axeX = new Axe("X",false,-4.0,4.0,1000)
let axeY = new Axe("Y",false,-4.0,4.0,1000)
let axeZ = new Axe("Z",true,0.0,0.0,0)




let  parameter = new Parameter(2.0,4.0,axeW,axeX,axeY,axeZ,254.0)



let simulations : Simulation[] = new Array();
for (let index = 1; index <= 8; index++) {
    simulations.push(new Simulation(parameter,index))
}
console.log(simulations[0])
console.log(JSON.stringify(simulations[0],undefined,5))


let computeTest : Compute = new Compute(simulations[0])
console.log(new Date)
await computeTest.Compute()
console.log(new Date)