import { Quaternion, Axe, Parameter, Simulation } from './QuaternionV1.ts'

export class Compute{
    simulation : Simulation;

    constructor(simulation : Simulation){
        this.simulation = simulation;
    }

    async Plot() : Promise<void> {

        let TabUInu = await Deno.readFile("data.bin")


        let StartZero : boolean[] =  new Array(3);
        // ----------------  Découpage de l'espace --------------------//
        if(this.simulation.type  >= 5){
            StartZero[0] = true
        } else {
            StartZero[0] = false
        }

        if(this.simulation.type <=2 || this.simulation.type >= 7){
            StartZero[1] = true
        } else {
            StartZero[1] = false
        }

        if(this.simulation.type % 2 == 1){
            StartZero[2] = true
        } else {
            StartZero[2] = false
        }
        // ----------------  Parametrage des boucles --------------------//
        let index : number = -1;
        //----------------- W -----------------//
        if(this.simulation.parameter.axeW.isFixe ==false){
            index++;
            this.simulation.parameter.axeW.Simulation(StartZero[index])
        } else {
            this.simulation.parameter.axeW.Simulation(true)
        }
        let nbPointsW : number = this.simulation.parameter.axeW.nbPoints
        let stepW : number = this.simulation.parameter.axeW.valueStep
        let startW : number = this.simulation.parameter.axeW.startSimu

        //----------------- X -----------------//   
        if(this.simulation.parameter.axeX.isFixe ==false){
            index++;
            this.simulation.parameter.axeX.Simulation(StartZero[index])
        } else {
            this.simulation.parameter.axeX.Simulation(true)
        }
        let nbPointsX : number = this.simulation.parameter.axeX.nbPoints
        let stepX : number = this.simulation.parameter.axeX.valueStep
        let startX : number = this.simulation.parameter.axeX.startSimu
        
        
        //----------------- Y -----------------//   
        if(this.simulation.parameter.axeY.isFixe ==false){
            index++;
            this.simulation.parameter.axeY.Simulation(StartZero[index])
        } else {
            this.simulation.parameter.axeY.Simulation(true)
        }
        let nbPointsY : number = this.simulation.parameter.axeY.nbPoints
        let stepY : number = this.simulation.parameter.axeY.valueStep
        let startY : number = this.simulation.parameter.axeY.startSimu

        //----------------- Z -----------------//
        if(this.simulation.parameter.axeZ.isFixe ==false){
            index++;
            this.simulation.parameter.axeZ.Simulation(StartZero[index])
        } else {
            this.simulation.parameter.axeZ.Simulation(true)
        }
        let nbPointsZ : number = this.simulation.parameter.axeZ.nbPoints
        let stepZ : number = this.simulation.parameter.axeZ.valueStep
        let startZ : number = this.simulation.parameter.axeZ.startSimu
        //----------------------   Tableau        --------------
        //let arrayInt : Uint8Array = new Uint8Array(nbPointsW*nbPointsX*nbPointsY*nbPointsZ)

        //---------------------- Boucles For ------------------
        let posArray : number= 0;
        let nblines : number= 0;
        let csv : string= ""
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
                        csv+= posArray+"\t"+wpt+"\t"+xpt+"\t"+ypt+"\t"+zpt+"\t"+nbPointsW+"\t"+nbPointsX+"\t"+nbPointsY+"\t"+nbPointsZ+"\n"
                        posArray++;
                        if( value>2.0  ){
                            nblines++
                            txt += value+"\t"+w+"\t"+x+"\t"+y+"\n"

                            if(nblines %10000 ==0){
                                await Deno.writeTextFile("data.txt",txt,{append : true})
                                txt = ""
                            }
                        }


                        
                        //console.log(quaternion)
                    }
                }
            }
        }
        await Deno.writeTextFile("data.txt",txt,{append : true})
        await Deno.writeTextFile("data.csv",csv,{append : false})
    }

    async Compute() : Promise<void> {
        let StartZero : boolean[] =  new Array(3);
        // ----------------  Découpage de l'espace --------------------//
        if(this.simulation.type  >= 5){
            StartZero[0] = true
        } else {
            StartZero[0] = false
        }

        if(this.simulation.type <=2 || this.simulation.type >= 7){
            StartZero[1] = true
        } else {
            StartZero[1] = false
        }

        if(this.simulation.type % 2 == 1){
            StartZero[2] = true
        } else {
            StartZero[2] = false
        }
        // ----------------  Parametrage des boucles --------------------//
        let index : number = -1;
        //----------------- W -----------------//
        if(this.simulation.parameter.axeW.isFixe ==false){
            index++;
            this.simulation.parameter.axeW.Simulation(StartZero[index])
        } else {
            this.simulation.parameter.axeW.Simulation(true)
        }
        let nbPointsW : number = this.simulation.parameter.axeW.nbPoints
        let stepW : number = this.simulation.parameter.axeW.valueStep
        let startW : number = this.simulation.parameter.axeW.startSimu

        //----------------- X -----------------//   
        if(this.simulation.parameter.axeX.isFixe ==false){
            index++;
            this.simulation.parameter.axeX.Simulation(StartZero[index])
        } else {
            this.simulation.parameter.axeX.Simulation(true)
        }
        let nbPointsX : number = this.simulation.parameter.axeX.nbPoints
        let stepX : number = this.simulation.parameter.axeX.valueStep
        let startX : number = this.simulation.parameter.axeX.startSimu
        
        
        //----------------- Y -----------------//   
        if(this.simulation.parameter.axeY.isFixe ==false){
            index++;
            this.simulation.parameter.axeY.Simulation(StartZero[index])
        } else {
            this.simulation.parameter.axeY.Simulation(true)
        }
        let nbPointsY : number = this.simulation.parameter.axeY.nbPoints
        let stepY : number = this.simulation.parameter.axeY.valueStep
        let startY : number = this.simulation.parameter.axeY.startSimu

        //----------------- Z -----------------//
        if(this.simulation.parameter.axeZ.isFixe ==false){
            index++;
            this.simulation.parameter.axeZ.Simulation(StartZero[index])
        } else {
            this.simulation.parameter.axeZ.Simulation(true)
        }
        let nbPointsZ : number = this.simulation.parameter.axeZ.nbPoints
        let stepZ : number = this.simulation.parameter.axeZ.valueStep
        let startZ : number = this.simulation.parameter.axeZ.startSimu
        //----------------------   Tableau        --------------
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
                        //console.log(quaternion)
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

        while(quaternionCompute.length() <= this.simulation.parameter.rmax){
            nbIter++;
            quaternionCompute.PowerInt(2.0)
            quaternionCompute.Add(quaternionBase)
            if (nbIter >= this.simulation.parameter.nbLoopMax) {
                break 
            }
        }

        return nbIter


    }

}
