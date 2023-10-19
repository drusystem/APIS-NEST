import { Injectable } from '@nestjs/common';
import { CreateReceiptyDto } from './dto/create-receipty.dto';
import { UpdateReceiptyDto } from './dto/update-receipty.dto';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { facturaXML } from './xml/factura.xml';

@Injectable()
export class ReceiptiesService {
  create(createReceiptyDto: CreateReceiptyDto) {
    
    const data = {}; // Tus datos para el XML
    this.generateAndSaveXml(data);

    return 'XML generado y guardado con éxito.';
  }

  findAll() {
    return `This action returns all receipties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receipty`;
  }

  update(id: number, updateReceiptyDto: UpdateReceiptyDto) {
    return `This action updates a #${id} receipty`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipty`;
  }

  generateAndSaveXml(data: any): void {
    // Crear un nuevo documento XML con cheerio
    const factura = new facturaXML()
    
    const $ = cheerio.load(factura.getBody(), { xmlMode: true });

    // Agregar elementos y datos XML según tus necesidades
    // $('root').append('<element>Value</element>');

    // Convertir el documento XML a una cadena
    const xmlString = $.xml();

    // Crear la ruta completa del archivo de salida
    const filePath = `${factura.getRutaXML()}/${factura.getName()}.xml`;

    // Verificar si la carpeta de destino existe y, de lo contrario, crearla
    if (!fs.existsSync(factura.getRutaXML())) {
      fs.mkdirSync(factura.getRutaXML(), { recursive: true });
    }

    // Guardar el archivo en la carpeta especificada
    fs.writeFileSync(filePath, xmlString, 'utf-8');
  }

  firmarXML(){

  }
}
