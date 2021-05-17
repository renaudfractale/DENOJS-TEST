import { parse } from "https://deno.land/std/flags/mod.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";
let Args: any = parse(Deno.args);

let etat = false;
if (typeof parse(Deno.args).file == "string") {
  if (existsSync(parse(Deno.args).file)) {
    let Json = await Deno.readTextFile(parse(Deno.args).file);
    let obj: any = new Object();
    try {
      obj = JSON.parse(Json);
      etat = true
    } catch (error) {

    }

    
    // ------------ type --------------------//
    
    if (typeof obj.type != "number") {
      etat = false;
    } else if ((obj.type < 0 || obj.type > 2)) {
      etat = false;
    }
    
    // ------------ CST --------------------//
    if ( typeof obj.cst != "object") {
      etat = false;
    } else if (typeof obj.cst.length != "number") {
      etat = false;
    } else {
      for (let index = 0; index < obj.cst.length; index++) {
        try {
          const element = obj.cst[index];

          let axes: string[] = ["x", "y", "z", "w"];

          axes.forEach((axe) => {
            if (typeof element[axe] != "number") {
              etat = false;
            }
          });
        } catch (error) {
          etat = false;
        }
      }
    }

    // --------------simulation -----------//
    if (typeof obj.simulation != "object") {
      etat = false;
    } else {
      let axes: string[] = ["x", "y", "z", "w"];

      axes.forEach((axe) => {
        if (typeof obj.simulation[axe] != "object") {
          etat = false;
        } else {
          let subs : string[] = ["min", "max"];

          subs.forEach(sub => {
            if (typeof obj.simulation[axe][sub] != "number") {
              etat = false;
            } else if(obj.simulation[axe][sub] < -5 || obj.simulation[axe][sub] > 5 ){
              etat = false;
            }
          });

        }
      });


      for (let index = 0; index < obj.cst.length; index++) {
        try {
          const element = obj.cst[index];

         
        } catch (error) {
          etat = false;
        }
      }
    }

    // ------------------- Images ------------------------//
    type Param = {
      name: string;
      type: string;
      values : string[];
    };

    let parametersI : Param[]= [{name:"etat",type:"boolean",values:[]},{name:"T",type:"string",values :["x", "y", "z", "w"]},{name:"Size",type:"number",values:[]},{name:"unite",type:"string",values:[]}]
    if (typeof obj.images != "object") {
      etat = false;
    } else {
      parametersI.forEach(parameter => {
        if (typeof obj.images[parameter.name] !=  parameter.type ) {
          etat = false;
        } else if(parameter.values.length >0){
          let subetat : boolean = false 
          parameter.values.forEach(element => {
            if(obj.images[parameter.name].toLocaleLowerCase() == element){
              subetat = true
            }
            if (!subetat) {
              etat = false;
            }
          });
        }
      })
    }

    // ------------------------- Scalet 3D --------------------------------//
    let parametersS : Param[]= [{name:"etat",type:"boolean",values:[]},{name:"T",type:"string",values :["x", "y", "z", "w"]},{name:"Step",type:"number",values:[]}]
    if (typeof obj.scarlet3D != "object") {
      etat = false;
    } else {
      parametersS.forEach(parameter => {
        if (typeof obj.scarlet3D[parameter.name] !=  parameter.type ) {
          etat = false;
        } else if(parameter.values.length >0){
          let subetat : boolean = false 
          parameter.values.forEach(element => {
            if(obj.scarlet3D[parameter.name].toLocaleLowerCase() == element){
              subetat = true
            }
            if (!subetat) {
              etat = false;
            }
          });
        }
      })
    }


    // ------------------------- Scalet 3D --------------------------------//
    let parametersA : Param[]= [{name:"etat",type:"boolean",values:[]},{name:"T",type:"string",values :["x", "y", "z", "w"]},{name:"Step",type:"number",values:[]}]
    if (typeof obj.analyse != "object") {
      etat = false;
    } else {
      parametersA.forEach(parameter => {
        if (typeof obj.analyse[parameter.name] !=  parameter.type ) {
          etat = false;
        } else if(parameter.values.length >0){
          let subetat : boolean = false 
          parameter.values.forEach(element => {
            if(obj.analyse[parameter.name].toLocaleLowerCase() == element){
              subetat = true
            }
            if (!subetat) {
              etat = false;
            }
          });
        }
      })
    }
  }
}

console.dir(etat);

import * as Q3 from './Libs/QuaternionV3.ts'
import {Compute} from './Libs/ComputeV3.ts'

//function CreateAxeSimulation(min : number , max : number, step : number,axeT,)

if(etat){

  console.log(Math.min(1.1,2.2))


  /*
  let axeW = new Q3.QAxe(Q3.EnumQAxe.W,Q3.EnumPlotAxe.X,,0.5,1000)
  let axeX = new Q3.QAxe(Q3.EnumQAxe.X,Q3.EnumPlotAxe.Y,-1.0,1.0,1000)
  let axeY = new Q3.QAxe(Q3.EnumQAxe.Y,Q3.EnumPlotAxe.Z,-1.0,0.0,500)
  let axeZ = new Q3.QAxe(Q3.EnumQAxe.Z,Q3.EnumPlotAxe.T,-0.10,0.10,3)
  */
}
