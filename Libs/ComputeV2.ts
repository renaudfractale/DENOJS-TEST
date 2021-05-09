import { Quaternion, Axe, Parameter } from './QuaternionV2.ts'
import { existsSync } from "https://deno.land/std/fs/mod.ts";
export class Compute{
    parameter : Parameter;

    constructor(parameter : Parameter){
        this.parameter = parameter;
    }

    async Plot(filebin : string) : Promise<void> {

        //Lecture du fichier Binaire
        let TabUInu = await Deno.readFile(filebin)

        //Fichier plot
        let filePlot : string = filebin.substr(0,filebin.length-4)+".txt"

        if(existsSync(filePlot)){
            Deno.removeSync(filePlot)
        }

        // ----------------  Parametrage des boucles --------------------//

        //----------------- W -----------------//
        let nbPointsW : number = this.parameter.axeW.nbPoints
        let stepW : number = this.parameter.axeW.valueStep
        let startW : number = this.parameter.axeW.valueMin

        //----------------- X -----------------//   
        let nbPointsX : number = this.parameter.axeX.nbPoints
        let stepX : number = this.parameter.axeX.valueStep
        let startX : number = this.parameter.axeX.valueMin
        
        //----------------- Y -----------------//   
        let nbPointsY : number = this.parameter.axeY.nbPoints
        let stepY : number = this.parameter.axeY.valueStep
        let startY : number = this.parameter.axeY.valueMin

        //----------------- Z -----------------//
        let nbPointsZ : number = this.parameter.axeZ.nbPoints
        let stepZ : number = this.parameter.axeZ.valueStep
        let startZ : number = this.parameter.axeZ.valueMin
        
        //---------------------- Boucles For ------------------
        let posArray : number= 0;

        let nblines : number= 0;
        let txt : string= ""
        for (let wpt : number = 0.0 ; wpt < nbPointsW ; wpt++) {
            let w = this.CurrentValue(wpt,stepW,startW,nbPointsW)
            console.log(wpt/nbPointsW*100)
            for (let xpt : number = 0.0 ; xpt < nbPointsX ; xpt++) {
                let x = this.CurrentValue(xpt,stepX,startX,nbPointsX)
                for (let ypt : number = 0.0 ; ypt < nbPointsY ; ypt++) {
                    let y = this.CurrentValue(ypt,stepY,startY,nbPointsY)
                    for (let zpt : number = 0.0 ; zpt < nbPointsZ ; zpt++) {
                        let z = this.CurrentValue(zpt,stepZ,startZ,nbPointsZ)
                        let value : number =  TabUInu[posArray]
                        posArray++;
                        if( value>0.0  ){
                            nblines++
                            txt += value+"\t"+w+"\t"+x+"\t"+y+"\n"

                            if(nblines %10000 ==0){
                                await Deno.writeTextFile("data.txt",txt,{append : true})
                                txt = ""
                            }
                        }
                    }
                }
            }
        }
        await Deno.writeTextFile("data.txt",txt,{append : true})
    }

    async Compute() : Promise<void> {
        // ----------------  Parametrage des boucles --------------------//

        //----------------- W -----------------//
        let nbPointsW : number = this.parameter.axeW.nbPoints
        let stepW : number = this.parameter.axeW.valueStep
        let startW : number = this.parameter.axeW.valueMin

        //----------------- X -----------------//   
        let nbPointsX : number = this.parameter.axeX.nbPoints
        let stepX : number = this.parameter.axeX.valueStep
        let startX : number = this.parameter.axeX.valueMin
        
        //----------------- Y -----------------//   
        let nbPointsY : number = this.parameter.axeY.nbPoints
        let stepY : number = this.parameter.axeY.valueStep
        let startY : number = this.parameter.axeY.valueMin

        //----------------- Z -----------------//
        let nbPointsZ : number = this.parameter.axeZ.nbPoints
        let stepZ : number = this.parameter.axeZ.valueStep
        let startZ : number = this.parameter.axeZ.valueMin
        
        //---------------------- Tableau ------------------
        let arrayInt : Uint8Array = new Uint8Array(nbPointsW*nbPointsX*nbPointsY*nbPointsZ)

        //---------------------- Boucles For ------------------
        let posArray = 0;
        for (let wpt : number = 0.0 ; wpt < nbPointsW ; wpt++) {
            let w = this.CurrentValue(wpt,stepW,startW,nbPointsW)
            console.log(wpt/nbPointsW*100)
            for (let xpt : number = 0.0 ; xpt < nbPointsX ; xpt++) {
                let x = this.CurrentValue(xpt,stepX,startX,nbPointsX)
                for (let ypt : number = 0.0 ; ypt < nbPointsY ; ypt++) {
                    let y = this.CurrentValue(ypt,stepY,startY,nbPointsY)
                    for (let zpt : number = 0.0 ; zpt < nbPointsZ ; zpt++) {
                        let z = this.CurrentValue(zpt,stepZ,startZ,nbPointsZ)
                        arrayInt[posArray] = this.ComputeIter(new Quaternion(w,x,y,z))
                        posArray++;
                    }
                }
            }
        }
       await Deno.writeFile("data.bin",arrayInt)
    }


    
    CurrentValue(pt : number, step  : number, start  : number, nbPoints : number) : number {
        return ((pt/nbPoints)*step)+start;
    }

    ComputeIter(quaternionBase : Quaternion) : number{
        let nbIter : number = 0.0;
        let quaternionCompute : Quaternion = new Quaternion(quaternionBase.w,quaternionBase.x,quaternionBase.y,quaternionBase.z)

        while(quaternionCompute.length() <= this.parameter.rmax){
            nbIter++;
            quaternionCompute.PowerInt(2.0)
            quaternionCompute.Add(quaternionBase)
            if (nbIter >= this.parameter.nbLoopMax) {
                break 
            }
        }

        return nbIter


    }

}
