


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