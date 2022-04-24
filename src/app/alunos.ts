export class Alunos {
    
    id: number = 0;
    nome: string = '';
    ru: string = '';
    curso: string = '';
    // INICIALIZA O OBJETO, PASSANDO OS PARAMETROS DE VALUES PARA O OBJETO ATUAL(THIS)
    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
