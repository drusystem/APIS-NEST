import { TipoNotaSunat } from "../../enums/sunat/tipo-nota-sunat.enum";

export interface NoteInterface{
    code:TipoNotaSunat;
    value:string;//Maximo 100 caracteres
}