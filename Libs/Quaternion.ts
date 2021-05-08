
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
                        let value : number =  TabUInu[posArray]
                        posArray++;
                        if( value>2.0  ){
                            await Deno.writeTextFile("data-"+value+".txt",w+"\t"+x+"\t"+y+"\t"+value+"\n" , {append : true})
                        }
                        
                        //console.log(quaternion)
                    }
                }
            }
        }
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


export class Simulation{
    parameter : Parameter;
    type : number;
    isStop : boolean = false;
    avancement : number = 0.0;

    constructor(parameter : Parameter,type : number){
        this.parameter = parameter
        this.type=type
    }

}


export class Parameter{
    power: number;
    rmax: number;
    nbLoopMax : number;
    axeW : Axe;
    axeX : Axe;
    axeY : Axe;
    axeZ : Axe;
    
    constructor(power : number,rmax: number,axeW : Axe,axeX : Axe,axeY : Axe,axeZ : Axe, nbLoopMax :number){
        this.power =power;
        this.rmax =rmax;
        this.axeW =axeW;
        this.axeX =axeX;
        this.axeY =axeY;
        this.axeZ =axeZ;
        this.nbLoopMax = nbLoopMax
    }

}

export class Axe{
    name : string;
    isFixe : boolean;
    valueMin : number;
    valueMax :number;
    valueStep : number;
    nbPoints : number;
    
    startSimu : number = 0.0;
    constructor(name : string,isFixe : boolean,valueMin : number,valueMax : number,nbPoints : number ){
        this.name =name;
        this.isFixe =isFixe;
        this.valueMin =valueMin;
        if(isFixe){
            this.valueMax =valueMin;
            this.nbPoints =1.0;
            this.valueStep= 0
        } else {
            this.valueMax =valueMax;
            this.nbPoints =nbPoints;
            this.valueStep= (valueMax - valueMin) / 2.0
        }
        

    }

    Simulation(startZero : boolean) : void {
        if(startZero){
            this.startSimu = this.valueMin
        } else
        {
            this.startSimu = this.valueMin + this.valueStep
        }
    }


}

export enum QAxe {
    W,
    X,
    Y,
    Z,
  }

  export class Quaternion{
    w : number = 0.0;
    x : number = 0.0;
    y : number = 0.0;
    z : number = 0.0;
    constructor( w:number,x:number,y:number,z:number){
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length() : number{
       return  Math.sqrt (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }

    Add(Q:Quaternion)  : void{
        this.w += Q.w;
        this.x += Q.x;
        this.y += Q.y;
        this.z += Q.z;
    }

    PowerInt(coef : number): void{
        let w : number = this.w
        let x : number = this.x
        let y : number = this.y
        let z : number = this.z
        for (let index = 0; index < (coef-1); index++) {
            this.Multiple(w,x,y,z)
            
        }
    }

    Multiple(w2 : number,x2 : number,y2 : number,z2 : number): void{
        let w1 : number = this.w;
        let x1 : number = this.x;
        let y1 : number = this.y;
        let z1 : number = this.z;

        this.x = x1 * w2 + y1 * z2 - z1 * y2 + w1 * x2;
        this.y = -x1 * z2 + y1 * w2 + z1 * x2 + w1 * y2;
        this.z = x1 * y2 - y1 * x2 + z1 * w2 + w1 * z2;
        this.w = -x1 * x2 - y1 * y2 - z1 * z2 + w1 * w2;
    }
    Normalise(): void{
        let length : number = this.length();
        this.w = this.w / length;
        this.x = this.x / length;
        this.y = this.y / length;
        this.z = this.z / length;
    }

    PowerFloat(power: number): void{

        let length : number = this.length();

        

        if(length>1.0){
            this.w = this.w / length;
            this.x = this.x / length;
            this.y = this.y / length;
            this.z = this.z / length;
        } else if(length>0){
            let coef : number = 1.0 / length;
            this.w = this.w * coef;
            this.x = this.x * coef;
            this.y = this.y * coef;
            this.z = this.z * coef;
        }

       
        let coef : number = 1.0;
        //console.info("q",this)
        length = this.length();
        //console.info("length",length)


        let theta: number = Math.acos(this.w)
        let B :  number=  Math.sqrt((length * length) - (this.w*this.w))
        let phi_x : number = Math.acos(this.x / B)
        let phi_y : number = Math.acos(this.y / B)
        let phi_z : number = Math.acos(this.z / B)
        //console.info("B",B)
        //console.info("theta",theta)
        
        this.x =  Math.exp(power * Math.log(length / coef)) * Math.sin(theta * power) * Math.cos(phi_x)
        this.y =  Math.exp(power * Math.log(length / coef)) * Math.sin(theta * power) * Math.cos(phi_y)
        this.z =  Math.exp(power * Math.log(length / coef)) * Math.sin(theta * power) * Math.cos(phi_z)
        this.w =  Math.exp(power * Math.log(length / coef)) * Math.sin(theta * power) 
        
    }
/*
    Adds( Tab:Quaternion[]){
        let Q : Quaternion = new Quaternion(0.0,0.0,0.0,0.0);
        Tab.forEach(element =>{
            Q.Add(element)
        })
        this Q
    }
*/
}