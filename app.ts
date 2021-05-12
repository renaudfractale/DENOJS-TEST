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
import * as Q3 from './Libs/QuaternionV3.ts'
import { Compute} from './Libs/ComputeV1.ts'

const id = v4.generate()
console.log(id)









let axeW = new Q3.QAxe(Q3.EnumQAxe.W,Q3.EnumPlotAxe.X,-1.0,1.0,1000)
let axeX = new Q3.QAxe(Q3.EnumQAxe.X,Q3.EnumPlotAxe.Y,-1.0,1.0,1000)
let axeY = new Q3.QAxe(Q3.EnumQAxe.Y,Q3.EnumPlotAxe.Z,-1.0,1.0,1000)
let axeZ = new Q3.QAxe(Q3.EnumQAxe.Z,Q3.EnumPlotAxe.T,-1.0,1.0,100)




let  parameterG = new Q3.ParameterGlobale(2.0,4.0,254.0,axeW,axeX,axeY,axeZ)
let axes = parameterG.ExportAxes()

let axePlot = parameterG.ExportAxes()
let axeT : Q3.QAxe = axes[axes.length-1]

for (let index = 0; index < axes.length; index++) {
    const axe = axes[index];

    if(axe.plotAxe == Q3.EnumPlotAxe.T){
        axePlot.splice(index, 1)
        axeT = axes[index]
        break;
    }
    
}

for (let pt = 0; pt < axeT.nbPoints; pt++) {
    const t = axeT.valueMin+((pt/axeT.nbPoints)*axeT.valueStep);
    let axeTPlot : 
    let parameterPlot : Q3.ParameterPlot =  new Q3.ParameterPlot(parameterG.power,parameterG.rmax,parameterG.nbLoopMax,,)

    let simu = 
}



/*
let computeTest : Compute = new Compute(simulations[0])
console.log(new Date)
await computeTest.Compute()
console.log(new Date)
await computeTest.Plot()
*/
