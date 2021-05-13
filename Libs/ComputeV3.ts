import { Quaternion,Simulation, EnumQAxe, GetName} from './QuaternionV3.ts'
import { moveSync }  from "https://deno.land/std/fs/mod.ts";

enum EnumTypeOperation{
    Compute,
    Filtrage,
    Plot
}


export class Compute{
    simulation : Simulation;
    data : Uint8Array
    filtre :  boolean[]
    nameFileIn :  string
    nameCurrent : string
    nameEnd : string
    namePlot : string
    nameBin : string
    nameFiltre : string
    constructor(nameFileIn : string){
        this.nameFileIn = nameFileIn

        let json =  Deno.readTextFileSync(nameFileIn);
        this.simulation = <Simulation>JSON.parse(json)

        this.nameCurrent = "Works/EnCours/"+ GetName(this.simulation,".json")
        moveSync(this.nameFileIn,this.nameCurrent)

        this.nameEnd = "Works/Data/"+ GetName(this.simulation,".json")
        this.namePlot = "Works/Data/"+ GetName(this.simulation,".txt")
        this.nameBin = "Works/Data/"+ GetName(this.simulation,".bin")
        this.nameFiltre= "Works/Data/"+ GetName(this.simulation,".filtre")

        this.data = new  Uint8Array(this.simulation.parameterPlot.axeX.nbPoints*this.simulation.parameterPlot.axeY.nbPoints*this.simulation.parameterPlot.axeZ.nbPoints)
        this.filtre = new Array(this.simulation.parameterPlot.axeX.nbPoints*this.simulation.parameterPlot.axeY.nbPoints*this.simulation.parameterPlot.axeZ.nbPoints)
        
    }
    

    async Launch() : Promise<void>{
        console.log("Compute")
        await this.Loop(EnumTypeOperation.Compute)
        await Deno.writeFile(this.nameBin,this.data)
        Deno
        console.log("Filtrage")
        await this.Loop(EnumTypeOperation.Filtrage)
        //await Deno.writeTextFile(this.nameFiltre,this.filtre.toString())
        console.log("Plot")
        await this.Loop(EnumTypeOperation.Plot)
        moveSync(this.nameCurrent,this.nameEnd)
    }



    private async Loop(typeOperation : EnumTypeOperation) : Promise<void> {

        // ----------------  Parametrage des boucles --------------------//
        let ParamPlot = this.simulation.parameterPlot
        let tabPosition : number[] = Array()
        let axeT : number= ParamPlot.axeT.qAxe

        //----------------- T -----------------//
        tabPosition[axeT] = ParamPlot.axeT.valueMin

        //----------------- X -----------------//
        let nbPointsX : number = ParamPlot.axeX.nbPoints
        let stepX : number = ParamPlot.axeX.valueStep
        let startX : number = ParamPlot.axeX.valueMin
        let axeX : number= ParamPlot.axeX.qAxe

        //----------------- Y -----------------//   
        let nbPointsY : number = ParamPlot.axeY.nbPoints
        let stepY : number = ParamPlot.axeY.valueStep
        let startY : number = ParamPlot.axeY.valueMin
        let axeY : number= ParamPlot.axeY.qAxe

        //----------------- Z -----------------//
        let nbPointsZ : number = ParamPlot.axeZ.nbPoints
        let stepZ : number = ParamPlot.axeZ.valueStep
        let startZ : number = ParamPlot.axeZ.valueMin
        let axeZ : number= ParamPlot.axeZ.qAxe

        //-------------------- Offcet ------------------------//
        let offcetX : number = nbPointsY*nbPointsZ;
        let offcetY : number = nbPointsZ;
        let offcetZ : number = 1;

        //---------------------- Boucles For ------------------
        let posArray : number= 0;

        let nblignePlot : number= 0
        let txtPlot : string = ""
        for (let xpt : number = 0.0 ; xpt < nbPointsX ; xpt++) {
            console.log("Avancement : ", (xpt/(nbPointsX-1)*100.0))
            tabPosition[axeX] = this.CurrentValue(xpt,stepX,startX,nbPointsX)
            for (let ypt : number = 0.0 ; ypt < nbPointsY ; ypt++) {
                tabPosition[axeY] = this.CurrentValue(ypt,stepY,startY,nbPointsY)
                for (let zpt : number = 0.0 ; zpt < nbPointsZ ; zpt++) {
                    tabPosition[axeZ] = this.CurrentValue(zpt,stepZ,startZ,nbPointsZ)
                    
                    if(typeOperation == EnumTypeOperation.Compute){
                        let x =tabPosition[<number>EnumQAxe.X] 
                        let y =tabPosition[<number>EnumQAxe.Y] 
                        let z =tabPosition[<number>EnumQAxe.Z] 
                        let w =tabPosition[<number>EnumQAxe.W] 
                        this.data[posArray] = this.ComputeIter(new Quaternion(w,x,y,z))

                    } else if(typeOperation == EnumTypeOperation.Filtrage){

                        let arrayP : number[] = Array()
                        for (let x = -1; x <= 1; x++) {
                            for (let y = -1; y <= 1; y++) {
                                for (let z = -1; z <= 1; z++) {
                                     if(x!=0 && y!=0 && z!=0){
                                        let pos = posArray+(x*offcetX)+(y*offcetY)+(z*offcetZ);
                                        arrayP.push(pos)
                                     }
                                }                          
                            }                               
                        }
                        // si pas de pos négative
                        let etat : boolean = true
                        for (let index = 0; index < arrayP.length; index++) {
                            const pos = arrayP[index];
                            if(pos<0){
                                etat=false
                                break
                            }
                        }
                        // si pas de pos négative
                        if(etat) {
                            let value  = this.data[posArray]
                            let fitre : boolean = true
                            for (let index = 0; index < arrayP.length; index++) {
                                const pos = arrayP[index];
                                if(this.data[pos] != value){
                                    fitre=false;
                                    break
                                }
                            }
                            this.filtre[posArray] = fitre
                        }
                    } else if(typeOperation == EnumTypeOperation.Plot){
                        if (nblignePlot >= 10000) {
                            await Deno.writeTextFile(this.namePlot,txtPlot,{append : true})
                            txtPlot = ""
                            nblignePlot = 0
                        }

                        if(this.filtre[posArray]){
                            nblignePlot++
                            txtPlot += this.data[posArray] +"\t"+tabPosition[axeX]+"\t"+tabPosition[axeY]+"\t"+tabPosition[axeZ]+"\n"
                        }

                    }

                    posArray++;
                }
            }
        }

        if (typeOperation == EnumTypeOperation.Plot) {
            await Deno.writeTextFile(this.namePlot,txtPlot,{append : true})
        }
    }
  
    CurrentValue(pt : number, step  : number, start  : number, nbPoints : number) : number {
        return ((pt/(nbPoints-1))*step)+start;
    }

    ComputeIter(quaternionBase : Quaternion) : number{
        let nbIter : number = 0.0;
        let quaternionCompute : Quaternion = new Quaternion(quaternionBase.w,quaternionBase.x,quaternionBase.y,quaternionBase.z)

        while(quaternionCompute.length() <= this.simulation.parameterPlot.rmax){
            nbIter++;
            quaternionCompute.PowerInt(2.0)
            quaternionCompute.Add(quaternionBase)
            if (nbIter >= this.simulation.parameterPlot.nbLoopMax) {
                break 
            }
        }

        return nbIter


    }

}
