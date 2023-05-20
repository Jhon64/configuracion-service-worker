import { ISubMenuScheme } from "../../schemes/security/navegacion.scheme";

export interface SubmenuAddDTO extends Partial<ISubMenuScheme>{
   menuID:string
}