//https://deno.land/std@0.95.0/flags/README.md

import { parse } from "https://deno.land/std/flags/mod.ts";
let Args : any = parse(Deno.args)
console.dir(parse(Deno.args));


let C : any = new Object()
if(typeof Args.c == "string"){
    if(Args.c =="position"){
        C["type"] = "position"
        C["x"] = 0;
        C["y"] = 0;
        C["z"] = 0;
        C["w"] = 0;
    }else{
        throw new Error("Arg c string != 'position'");
    }
} else if(typeof Args.c == "object") {
    if( Args.c.x != undefined && Args.c.y != undefined && Args.c.z != undefined && Args.c.w != undefined ){
        C["type"] = "constante"
        let Cx = 0.0
        try {
            Cx=parseFloat(Args.c.x)
        } catch (error) {
            throw new Error("Arg c.x is not number");  
        }
        let Cy = 0.0
        try {
            Cy=parseFloat(Args.c.y)
        } catch (error) {
            throw new Error("Arg c.y is not number");  
        }
        let Cz = 0.0
        try {
            Cz=parseFloat(Args.c.z)
        } catch (error) {
            throw new Error("Arg c.z is not number");  
        }
        let Cw = 0.0
        try {
            Cw=parseFloat(Args.c.w)
        } catch (error) {
            throw new Error("Arg c.w is not number");  
        }
        C["x"] = Cx;
        C["y"] = Cy;
        C["z"] = Cz;
        C["w"] = Cw;
    } else {
        throw new Error("Arg c object != '{x,y,z,w}'");
    }
} else {
    throw new Error('Arg c Error Type unknown'); 
}

let Q : any = new Object()
if(typeof Args.Q == "object") {
    if( Args.Q.x != undefined && Args.Q.y != undefined && Args.Q.z != undefined &&
         Args.Q.w != undefined ){
        let X : any =  new Object
        if(typeof Args.Q.x == "object" && Args.Q.x.start != undefined &&
         Args.Q.x.end != undefined && Args.Q.x.axeplot != undefined){
            try {
                X.start = parseFloat(Args.Q.x.start) 
            } catch (error) {
                throw new Error("Arg Q.x.start must be a number");
            }
            try {
                X.end = parseFloat(Args.Q.x.end) 
            } catch (error) {
                throw new Error("Arg Q.x.end must be a number");
            }
            switch (Args.Q.x.axeplot) {
                case "x":
                    X.axeplot="x"
                    break;
                case "y":
                    X.axeplot="y"
                    break;
                case "z":
                    X.axeplot="z"
                    break;
                case "t":
                    X.axeplot="t"
                    break;           
                default:
                    throw new Error("Arg Q.x.start must be a string = [x or y or z or t]")
            }
               
                

        } else {
            throw new Error("Arg Q.x object != '{start,end,axeplot}'");
        }
        let Y : any =  new Object
        if(typeof Args.Q.y == "object" && Args.Q.y.start != undefined &&
         Args.Q.y.end != undefined && Args.Q.y.axeplot != undefined){
            try {
                Y.start = parseFloat(Args.Q.y.start) 
            } catch (error) {
                throw new Error("Arg Q.y.start must be a number");
            }
            try {
                Y.end = parseFloat(Args.Q.y.end) 
            } catch (error) {
                throw new Error("Arg Q.y.end must be a number");
            }
            switch (Args.Q.y.axeplot) {
                case "x":
                    Y.axeplot="x"
                    break;
                case "y":
                    Y.axeplot="y"
                    break;
                case "z":
                    Y.axeplot="z"
                    break;
                case "t":
                    Y.axeplot="t"
                    break;           
                default:
                    throw new Error("Arg Q.y.start must be a string = [x or y or z or t]")
            }
        } else {
            throw new Error("Arg Q.y object != '{start,end,axeplot}'");
        }
        let Z : any =  new Object
        if(typeof Args.Q.z == "object" && Args.Q.z.start != undefined &&
         Args.Q.z.end != undefined && Args.Q.z.axeplot != undefined){
            try {
                Z.start = parseFloat(Args.Q.z.start) 
            } catch (error) {
                throw new Error("Arg Q.z.start must be a number");
            }
            try {
                Z.end = parseFloat(Args.Q.z.end) 
            } catch (error) {
                throw new Error("Arg Q.z.end must be a number");
            }
            switch (Args.Q.z.axeplot) {
                case "x":
                    Z.axeplot="x"
                    break;
                case "y":
                    Z.axeplot="y"
                    break;
                case "z":
                    Z.axeplot="z"
                    break;
                case "t":
                    Z.axeplot="t"
                    break;           
                default:
                    throw new Error("Arg Q.z.start must be a string = [x or y or z or t]")
            }
        } else {
            throw new Error("Arg Q.z object != '{start,end,axeplot}'");
        }
        let W : any =  new Object
        if(typeof Args.Q.w == "object" && Args.Q.w.start != undefined &&
         Args.Q.w.end != undefined && Args.Q.w.axeplot != undefined){
            try {
                W.start = parseFloat(Args.Q.w.start) 
            } catch (error) {
                throw new Error("Arg Q.w.start must be a number");
            }
            try {
                W.end = parseFloat(Args.Q.w.end) 
            } catch (error) {
                throw new Error("Arg Q.w.end must be a number");
            }
            switch (Args.Q.w.axeplot) {
                case "x":
                    W.axeplot="x"
                    break;
                case "y":
                    W.axeplot="y"
                    break;
                case "z":
                    W.axeplot="z"
                    break;
                case "t":
                    W.axeplot="t"
                    break;           
                default:
                    throw new Error("Arg Q.w.start must be a string = [x or y or z or t]")
            }
        } else {
            throw new Error("Arg Q.w object != '{start,end,axeplot}'");
        }
    } else {
        throw new Error("Arg Q object != '{x,y,z,w}'");
    }

} else {
    throw new Error('Arg Q Error Type unknown'); 
}
