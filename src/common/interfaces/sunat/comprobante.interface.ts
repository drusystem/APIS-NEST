import { TipoComprobanteSunat } from "src/common/enums/sunat/tipo-comprobante-sunat.enum";
import { TipoMonedaSunat } from "src/common/enums/sunat/tipo-moneda-sunat.enum";

export interface ComprobanteInterface{
    tipo:TipoComprobanteSunat, //INVOICE_TYPE_CODE FACTURA,BOLETA,...
    serie:string, //LA FACTURA EMPIEZA SIEMPRE CON LA F, PUEDE SER F001,FA01,FAB1,FABX
    correlativo:string,//MAXIMO 8 NUMEROS EN EL CORRELATIVO
    fecha_emision:string,//yyyy-mm-dd FECHA EMISION DEL COMPROBANTE
    hora_emision:string,//HH:mm:ss HORA EN FORMATO 24H,MINUTO Y SEGUNDOS
    fecha_vencimiento?:string,//si el pago es a credito, fecha del ultimo dia a pagar
    //si es por cuotas, la fecha vencimiento de la ultima cuota
    tipo_moneda:TipoMonedaSunat, // SOLES / DOLARES
    num_items:number, //cantidad de items en total en la venta
}