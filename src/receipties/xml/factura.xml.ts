import { TipoMonedaSunat } from "src/common/enums/sunat/tipo-moneda-sunat.enum";
import { NoteInterface } from "../../common/interfaces/sunat/note.interface";
import { EmisorInterface } from "src/common/interfaces/sunat/emisor.interface";
import { ComprobanteInterface } from "src/common/interfaces/sunat/comprobante.interface";
import { TipoComprobanteSunat } from "src/common/enums/sunat/tipo-comprobante-sunat.enum";


export class facturaXML {

    private ruta_xml:string='./documents/xml';
    private ruta_cdr:string='./documents/cdr';

    constructor(
        private EMISOR:EmisorInterface={
            ruc:'20607599727',
            rzocial:'INSTITUTO DE SOFTWARE S.A.C',
            direccion:'LAMBAYEQUE - LAMBAYEQUE - LAMBAYEQUE',
            usuario_emisor:'MODDATOS',
            clave_emisor:'MODDATOS'
        },
        private UBL_VER:string ="2.1", //VERSION UBL DEFINIDA POR SUNAT PARA EL TIPO DE COMPROBANTE (EXISTE 2.1 Y 2.0)
        private CUSTOM_ID:string ="2.0", //VERSION ESTRUCTURA DEL DOCUMENTO
        private PROFILE_ID:string="0101",//CODIGO DE TIPO DE OPERACIÓN; usado para farmacias,marketplace,restaurantes
       
        private NOTES:NoteInterface[]=[],// PUEDES AGREGAR MAXIMO 100 CARACTERES POR NOTA Y PUEDE HABER N NOTAS CON SU languageLocaleID
        //1000:MONTO EN LETRAS, 3000: CODIGO INTERNO DEL SOFTWARE -REVISAR CATALOGO #52 para otros CODIGOS
        private COMPROBANTE:ComprobanteInterface={
            tipo:TipoComprobanteSunat.FACTURA,
            serie:'F001',
            correlativo:'001',
            fecha_emision:'2023-10-19',
            hora_emision:'14:29:10',
            tipo_moneda:TipoMonedaSunat.SOLES,
            num_items:7
        }
    ){}


    getName():string{
        return `${this.EMISOR.ruc}-${this.COMPROBANTE.tipo}-${this.COMPROBANTE.serie}-${this.COMPROBANTE.correlativo}`
    }

    getRutaXML():string{
        return this.ruta_xml
    }

    getRutaCDR():string{
        return this.ruta_cdr
    }

    getBody():string{
        return `<?xml version="1.0" encoding="utf-8"?>
        <Invoice xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ccts="urn:un:unece:uncefact:documentation:2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2" xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2" xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
            <ext:UBLExtensions>
                <ext:UBLExtension>
                    <ext:ExtensionContent>
                        <ds:Signature Id="SignatureSP"></ds:Signature>
                    </ext:ExtensionContent>
                </ext:UBLExtension>
            </ext:UBLExtensions>
            <cbc:UBLVersionID>${this.UBL_VER}</cbc:UBLVersionID>
            <cbc:CustomizationID schemeAgencyName="PE:SUNAT">${this.CUSTOM_ID}</cbc:CustomizationID>
            <cbc:ProfileID schemeName="Tipo de Operacion" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo17">${this.PROFILE_ID}</cbc:ProfileID>
            <cbc:ID>${this.COMPROBANTE.serie}-${this.COMPROBANTE.correlativo}</cbc:ID>
            <cbc:IssueDate>${this.COMPROBANTE.fecha_emision}</cbc:IssueDate>
            <cbc:IssueTime>${this.COMPROBANTE.hora_emision}</cbc:IssueTime>
            <cbc:DueDate>${this.COMPROBANTE.fecha_vencimiento === undefined?this.COMPROBANTE.fecha_emision:this.COMPROBANTE.fecha_vencimiento}</cbc:DueDate>
            <cbc:InvoiceTypeCode listAgencyName="PE:SUNAT" listName="Tipo de Documento" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01" listID="0101" name="Tipo de Operacion">${this.COMPROBANTE.tipo}</cbc:InvoiceTypeCode>
            <cbc:DocumentCurrencyCode listID="ISO 4217 Alpha" listName="Currency" listAgencyName="United Nations Economic Commission for Europe">${this.COMPROBANTE.tipo_moneda}</cbc:DocumentCurrencyCode>
            <cbc:LineCountNumeric>${this.COMPROBANTE.num_items}</cbc:LineCountNumeric>
            <cac:Signature>
                <cbc:ID>${this.COMPROBANTE.serie}-${this.COMPROBANTE.correlativo}</cbc:ID>
                <cac:SignatoryParty>
                    <cac:PartyIdentification>
                        <cbc:ID>20607599727</cbc:ID>
                    </cac:PartyIdentification>
                    <cac:PartyName>
                        <cbc:Name><![CDATA[INSTITUTO INTERNACIONAL DE SOFTWARE S.A.C.]]></cbc:Name>
                    </cac:PartyName>
                </cac:SignatoryParty>
                <cac:DigitalSignatureAttachment>
                    <cac:ExternalReference>
                        <cbc:URI>#SignatureSP</cbc:URI>
                    </cac:ExternalReference>
                </cac:DigitalSignatureAttachment>
            </cac:Signature>
            <cac:AccountingSupplierParty>
                <cac:Party>
                    <cac:PartyIdentification>
                        <cbc:ID schemeID="6" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20607599727</cbc:ID>
                    </cac:PartyIdentification>
                    <cac:PartyName>
                        <cbc:Name><![CDATA[INSTITUTO INTERNACIONAL DE SOFTWARE S.A.C.]]></cbc:Name>
                    </cac:PartyName>
                    <cac:PartyTaxScheme>
                        <cbc:RegistrationName><![CDATA[INSTITUTO INTERNACIONAL DE SOFTWARE S.A.C.]]></cbc:RegistrationName>
                        <cbc:CompanyID schemeID="6" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20607599727</cbc:CompanyID>
                        <cac:TaxScheme>
                            <cbc:ID schemeID="6" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20607599727</cbc:ID>
                        </cac:TaxScheme>
                    </cac:PartyTaxScheme>
                    <cac:PartyLegalEntity>
                        <cbc:RegistrationName><![CDATA[INSTITUTO INTERNACIONAL DE SOFTWARE S.A.C.]]></cbc:RegistrationName>
                        <cac:RegistrationAddress>
                            <cbc:ID schemeName="Ubigeos" schemeAgencyName="PE:INEI">140101</cbc:ID>
                            <cbc:AddressTypeCode listAgencyName="PE:SUNAT" listName="Establecimientos anexos">0000</cbc:AddressTypeCode>
                            <cbc:CityName><![CDATA[LAMBAYEQUE]]></cbc:CityName>
                            <cbc:CountrySubentity><![CDATA[LAMBAYEQUE]]></cbc:CountrySubentity>
                            <cbc:District><![CDATA[LAMBAYEQUE]]></cbc:District>
                            <cac:AddressLine>
                                <cbc:Line><![CDATA[8 DE OCTUBRE N 123 - LAMBAYEQUE - LAMBAYEQUE - LAMBAYEQUE]]></cbc:Line>
                            </cac:AddressLine>
                            <cac:Country>
                                <cbc:IdentificationCode listID="ISO 3166-1" listAgencyName="United Nations Economic Commission for Europe" listName="Country">PE</cbc:IdentificationCode>
                            </cac:Country>
                        </cac:RegistrationAddress>
                    </cac:PartyLegalEntity>
                    <cac:Contact>
                        <cbc:Name><![CDATA[]]></cbc:Name>
                    </cac:Contact>
                </cac:Party>
            </cac:AccountingSupplierParty>
            <cac:AccountingCustomerParty>
                <cac:Party>
                    <cac:PartyIdentification>
                        <cbc:ID schemeID="6" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20605145648</cbc:ID>
                    </cac:PartyIdentification>
                    <cac:PartyName>
                        <cbc:Name><![CDATA[AGROINVERSIONES Y SERVICIOS AJINOR S.R.L. - AGROSERVIS AJINOR S.R.L.]]></cbc:Name>
                    </cac:PartyName>
                    <cac:PartyTaxScheme>
                        <cbc:RegistrationName><![CDATA[AGROINVERSIONES Y SERVICIOS AJINOR S.R.L. - AGROSERVIS AJINOR S.R.L.]]></cbc:RegistrationName>
                        <cbc:CompanyID schemeID="6" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20605145648</cbc:CompanyID>
                        <cac:TaxScheme>
                            <cbc:ID schemeID="6" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20605145648</cbc:ID>
                        </cac:TaxScheme>
                    </cac:PartyTaxScheme>
                    <cac:PartyLegalEntity>
                        <cbc:RegistrationName><![CDATA[AGROINVERSIONES Y SERVICIOS AJINOR S.R.L. - AGROSERVIS AJINOR S.R.L.]]></cbc:RegistrationName>
                        <cac:RegistrationAddress>
                            <cbc:ID schemeName="Ubigeos" schemeAgencyName="PE:INEI"/>
                            <cbc:CityName><![CDATA[]]></cbc:CityName>
                            <cbc:CountrySubentity><![CDATA[]]></cbc:CountrySubentity>
                            <cbc:District><![CDATA[]]></cbc:District>
                            <cac:AddressLine>
                                <cbc:Line><![CDATA[MZA. C LOTE. 46 URB. SAN ISIDRO LA LIBERTAD - TRUJILLO - TRUJILLO]]></cbc:Line>
                            </cac:AddressLine>                                        
                            <cac:Country>
                                <cbc:IdentificationCode listID="ISO 3166-1" listAgencyName="United Nations Economic Commission for Europe" listName="Country"/>
                            </cac:Country>
                        </cac:RegistrationAddress>
                    </cac:PartyLegalEntity>
                </cac:Party>
            </cac:AccountingCustomerParty>
            <cac:PaymentTerms>
              <cbc:ID>FormaPago</cbc:ID>
              <cbc:PaymentMeansID>Contado</cbc:PaymentMeansID>
           </cac:PaymentTerms>	
            <cac:TaxTotal>
                <cbc:TaxAmount currencyID="PEN">28.22</cbc:TaxAmount>
                <cac:TaxSubtotal>
                    <cbc:TaxableAmount currencyID="PEN">156.80</cbc:TaxableAmount>
                    <cbc:TaxAmount currencyID="PEN">28.22</cbc:TaxAmount>
                    <cac:TaxCategory>
                        <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier" schemeAgencyName="United Nations Economic Commission for Europe">S</cbc:ID>
                        <cac:TaxScheme>
                            <cbc:ID schemeID="UN/ECE 5153" schemeAgencyID="6">1000</cbc:ID>
                            <cbc:Name>IGV</cbc:Name>
                            <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
                        </cac:TaxScheme>
                    </cac:TaxCategory>
                </cac:TaxSubtotal>			
            </cac:TaxTotal>
            <cac:LegalMonetaryTotal>
                <cbc:LineExtensionAmount currencyID="PEN">156.78</cbc:LineExtensionAmount>
                <cbc:TaxInclusiveAmount currencyID="PEN">185.00</cbc:TaxInclusiveAmount>
                <cbc:PayableAmount currencyID="PEN">185.00</cbc:PayableAmount>
            </cac:LegalMonetaryTotal>
            <cac:InvoiceLine>
                <cbc:ID>1</cbc:ID>
                <cbc:InvoicedQuantity unitCode="NIU" unitCodeListID="UN/ECE rec 20" unitCodeListAgencyName="United Nations Economic Commission for Europe">1</cbc:InvoicedQuantity>
                <cbc:LineExtensionAmount currencyID="PEN">156.78</cbc:LineExtensionAmount>
                <cac:PricingReference>
                    <cac:AlternativeConditionPrice>
                        <cbc:PriceAmount currencyID="PEN">185.00</cbc:PriceAmount>
                        <cbc:PriceTypeCode listName="Tipo de Precio" listAgencyName="PE:SUNAT" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16">01</cbc:PriceTypeCode>
                    </cac:AlternativeConditionPrice>
                </cac:PricingReference>
                <cac:TaxTotal>
                    <cbc:TaxAmount currencyID="PEN">28.22</cbc:TaxAmount>
                    <cac:TaxSubtotal>
                        <cbc:TaxableAmount currencyID="PEN">156.78</cbc:TaxableAmount>
                        <cbc:TaxAmount currencyID="PEN">28.22</cbc:TaxAmount>
                        <cac:TaxCategory>
                            <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier" schemeAgencyName="United Nations Economic Commission for Europe">S</cbc:ID>
                            <cbc:Percent>18</cbc:Percent>
                            <cbc:TaxExemptionReasonCode listAgencyName="PE:SUNAT" listName="Afectacion del IGV" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07">10</cbc:TaxExemptionReasonCode>
                            <cac:TaxScheme>
                                <cbc:ID schemeID="UN/ECE 5153" schemeName="Codigo de tributos" schemeAgencyName="PE:SUNAT">1000</cbc:ID>
                                <cbc:Name>IGV</cbc:Name>
                                <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
                            </cac:TaxScheme>
                        </cac:TaxCategory>
                    </cac:TaxSubtotal></cac:TaxTotal>
                <cac:Item>
                    <cbc:Description><![CDATA[FENA X L]]></cbc:Description>
                    <cac:SellersItemIdentification>
                        <cbc:ID><![CDATA[195]]></cbc:ID>
                    </cac:SellersItemIdentification>
                    <cac:CommodityClassification>
                        <cbc:ItemClassificationCode listID="UNSPSC" listAgencyName="GS1 US" listName="Item Classification">10191509</cbc:ItemClassificationCode>
                    </cac:CommodityClassification>
                </cac:Item>
                <cac:Price>
                    <cbc:PriceAmount currencyID="PEN">156.78</cbc:PriceAmount>
                </cac:Price>
            </cac:InvoiceLine>
        </Invoice>`
    }



    private isNote():string{
        let Notas = "";
        this.NOTES.forEach(e => {
            Notas = Notas + `<cbc:Note languageLocaleID="${e.code}">${e.value}</cbc:Note>`
        });
        return Notas;
    }
}