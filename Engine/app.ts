import { parse } from "https://deno.land/std/flags/mod.ts";

console.dir(parse(Deno.args));

import * as Q3 from './Libs/QuaternionV3.ts'
import {Compute} from './Libs/ComputeV3.ts'
console.log("Création des Axes Q")
let axeW = new Q3.QAxe(Q3.EnumQAxe.W,Q3.EnumPlotAxe.X,-1.5,0.5,1000)
let axeX = new Q3.QAxe(Q3.EnumQAxe.X,Q3.EnumPlotAxe.Y,-1.0,1.0,1000)
let axeY = new Q3.QAxe(Q3.EnumQAxe.Y,Q3.EnumPlotAxe.Z,-1.0,0.0,1000)
let axeZ = new Q3.QAxe(Q3.EnumQAxe.Z,Q3.EnumPlotAxe.T,-0.10,0.10,3)



console.log("Création de ParameterGlobale")
let  parameterG = new Q3.ParameterGlobale(2.0,4.0,254.0,axeW,axeX,axeY,axeZ)
let axes = parameterG.ExportAxes()
console.log("Création des Axes PLOT")
let axePlotQ = parameterG.ExportAxes()
let axeT : Q3.QAxe = axes[axes.length-1]

for (let index = 0; index < axes.length; index++) {
    const axe = axes[index];

    if(axe.plotAxe == Q3.EnumPlotAxe.T){
        axePlotQ.splice(index, 1)
        axeT = axes[index]
        break;
    }
    
}

console.log("Création des Json Simulations")
for (let pt = 0; pt < axeT.nbPoints; pt++) {
    const t = axeT.valueMin+((pt/(axeT.nbPoints-1))*axeT.valueStep);

    let axePlotT = new Q3.PlotAxe(-1,axeT.qAxe,axeT.plotAxe,t,t,1)

    let axesPlotValue : Q3.PlotAxe[] =  Array(3)
    let axesPlotName : Q3.EnumPlotAxe[] =  [Q3.EnumPlotAxe.X,Q3.EnumPlotAxe.Y,Q3.EnumPlotAxe.Z]
    let index = 0
    axesPlotName.forEach(plotName => {
        axePlotQ.forEach(plotQ => {
            if(plotQ.plotAxe == plotName){
                axesPlotValue[index] = new Q3.PlotAxe(index,plotQ.qAxe,plotQ.plotAxe,plotQ.valueMin,plotQ.valueMax,plotQ.nbPoints)
                index++;
            }
        });
    });
    
    let parameterPlot : Q3.ParameterPlot =  new Q3.ParameterPlot(parameterG.power,parameterG.rmax,parameterG.nbLoopMax,axePlotT,axesPlotValue[0],axesPlotValue[1],axesPlotValue[2])

    let simu : Q3.Simulation = new Q3.Simulation(parameterPlot,parameterG)
    console.log("Ecriture des Json Simulations pour t("+pt+")= "+t)
    await Deno.writeTextFile("Works/Pot/"+Q3.GetName(simu,".json"),JSON.stringify(simu,undefined,4))
}

for await (const dirEntry of Deno.readDir('Works/Pot')) {
    console.log(dirEntry);
    if (dirEntry.isFile) {
        let compute : Compute = new Compute("Works/Pot/"+dirEntry.name)
        await compute.Launch()
    }
}



