
let a1 : Uint8Array = new Uint8Array(1000 * 1000 * 1000)
let a2 : Uint8Array = new Uint8Array(1000 * 1000 * 1000)
let a3 : Uint8Array = new Uint8Array(1000 * 1000 * 1000)
let a4 : Uint8Array = new Uint8Array(1000 * 1000 * 1000)

for (let index = 0; index < a1.length; index++) {
     a1[index] = index % 254
     a2[index] = (index+1) % 254
     a3[index] = (index+2) % 254
     a4[index] = (index+3) % 254
}


await Deno.writeFile("a1.bin",a1)
await Deno.writeFile("a2.bin",a2)
await Deno.writeFile("a3.bin",a3)
await Deno.writeFile("a4.bin",a4)