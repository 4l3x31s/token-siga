import { BeanRespuesta } from './beanRespuesta';
import { BeanUsuario } from './beanUsuario';
export interface BeanResponse {
    beanUsuario: BeanUsuario;
    beanAutentificado: BeanRespuesta;
    estado: boolean;
    mensaje: string;
}