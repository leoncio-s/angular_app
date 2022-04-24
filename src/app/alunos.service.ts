import { Injectable } from '@angular/core';
import { Alunos } from './alunos';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  lastId: number = 0;
  alunos: Alunos[] = [];

  constructor() { }

  // Salva os dados obtidos via formulário e anexa no objeto aluno, incrementando um  numero a mais no id
  // Retornando os objetos
  saveAlunos(aluno: Alunos): AlunosService{
    if(!aluno.id){
      aluno.id = ++this.lastId;
    }
    this.alunos.push(aluno);

    return this;
  }

  // Retorna todos os dados cadastrados no objeto
  getAll(): Alunos[]{
    return this.alunos;
  }

  // Percorre todo o objeto aluno e verifica se o dados do objeto condiz com o item da pesquisa
  // Caso encontre o dados na pesquisa ira anexar no objeto dados e retorna ao usuário todos os dados que condiz com a pesquisa
  // Se não encontrar nenhum dado, irá retornar uma mensagem ao usuário
  search(find: string): Alunos {
    let dados:any = [] ;
    this.alunos.forEach(data=>{
      if (data.ru.includes(find) || data.nome.includes(find) || data.curso.includes(find)){
        dados.push(data)
      }else{
        dados.push({'erro': 'Nenhum dado encontrado'})
      }
    })
    return dados;
  }

  // Retorna o objeto com base no id
  // utilizado para retornar o ultimo cadastro salvo no objeto
  getAlunoById(id:number):Alunos{
    let data:any = [];
    data.push(this.alunos.filter(aluno=>aluno.id===id).pop());
    // this.alunos.forEach(aluno=>{
      // if (aluno.id === id) data.push(aluno);
    // })

    return data;
  }

  // Deleta o aluno com base no ID informado
  deletaAluno(id:number): AlunosService{
    let alunos:any = this.alunos.filter(
      aluno => aluno.id !==id
    );
    this.alunos = alunos;
    return alunos;
  }

}
