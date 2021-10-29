import { v4 } from 'https://deno.land/std/uuid/mod.ts'
let a1 : Uint8Array = new Uint8Array(1000 * 1000 )
do {
     for (let index = 0; index < a1.length; index++) {
          a1[index] = index % 254
     }  
     await Deno.writeFile(v4.generate()+".bin",a1)
} while (true);



