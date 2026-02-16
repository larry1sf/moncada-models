import { NextRequest, NextResponse } from "next/server";
import { tursoClient } from "@/service/connect-turso";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const body = await request.json();
    if (!body) return NextResponse.json({ message: "La peticion es undefine o null", data: body }, { status: 501 });

    if (!body.whatsapp || !body.message)
        return NextResponse.json({ message: "Son muy importantes el numero y el mensaje para realizar el envio", data: body }, { status: 501 });

    // revisamos si el nombre esta en la bd
    await tursoClient.execute({
        sql: "INSERT INTO cliente (nombre, fecha_registro) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM cliente WHERE nombre = ?)",
        args: [body.name, new Date().toLocaleDateString('es-ES'), body.name],
    });

    return NextResponse.json({
        message: "Mensaje enviado con éxito",
        data: body,
        redirectTo: `https://api.whatsapp.com/send/?phone=+57${body.whatsapp}&type=phone_number&app_absent=0&text=${encodeURIComponent(body.message)}`
    }, { status: 200 });
}