import type { APIRoute } from "astro";
import fs from "node:fs"
export const prerender = false;

interface strapiData {
    data: {
        reference: string;
        nameClient: string;
        numberClient: number;
        typeDelivery: string;
        buyMethod: string;
        address: string;
        dateDelivery: string;
        totalDelivery: any;
        email: string | undefined;
    };
}

const PedidoStruct = {
  reference:  { size: 32, type: "string" },
  nameClient: { size: 32, type: "string" },
  numberClient:{ size: 8,  type: "int64" },
  typeDelivery:{ size: 32, type: "string" },
  buyMethod:  { size: 64, type: "string" },
  address:    { size: 64, type: "string" },
  dateDelivery:{ size: 32, type: "string" },
  totalDelivery:{ size: 4, type: "int32" }
} as const;

const PEDIDO_SIZE = Object.values(PedidoStruct)
  .reduce((acc, f) => acc + f.size, 0);

function writePedido(path: string, pedido: strapiData["data"]) {
  const buffer = Buffer.alloc(PEDIDO_SIZE);
  let offset = 0;

  for (const key in PedidoStruct) {
    const field = PedidoStruct[key as keyof typeof PedidoStruct];
    const value = pedido[key as keyof typeof PedidoStruct];

    switch (field.type) {
      case "string":
        buffer.write(value ?? "", offset, field.size, "utf8");
        offset += field.size;
        break;

      case "int32":
        buffer.writeInt32LE(value ?? 0, offset);
        offset += field.size;
        break;

      case "int64":
        buffer.writeBigInt64LE(BigInt(value ?? 0), offset);
        offset += field.size;
        break;
    }
  }

  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, Buffer.alloc(0));
  }
  console.log(buffer);
  
  fs.appendFileSync(path, buffer);
  
  
  const path2 = "./src/stores/registros.txt"
  if(!fs.existsSync(path2)){
    fs.writeFileSync(path2,'')
  }
  
  fs.appendFileSync(path2,JSON.stringify(pedido))

}

export const POST:APIRoute = async ({params,request})=>{
    const {data:pedido} = await request.json() as strapiData
    
    writePedido("./src/stores/registros.dat", pedido);
    
    return new Response(
    JSON.stringify({ ok: true, message:"registro exitoso!" }),
    { status: 200 }
    );
}