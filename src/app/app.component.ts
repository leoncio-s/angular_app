import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// Importa os modulos Alunos e Alunos Service
import {Alunos} from './alunos';
import {AlunosService} from './alunos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AlunosService]
})
export class AppComponent {
  title = 'app-ads';

  alunoSearch: string = '';
  retorno = [] as any;
  erro:String = '';
  alunos:Alunos = new Alunos();
  novoAluno = false;
  success = false;
  message = '';
  constructor(private alunosService: AlunosService){

  }

  // Faz uma pesquisa nos objetos salvos, procurando por nome, curso ou RU
  pesquisar(){
    this.retorno= [];
    let data:any = [];
    this.success = false;
    data = this.alunosService.search(this.alunoSearch);

    // Percorre os dados retornados e verifica se o retorno é uma mensagem de erro
    // Se for um erro, irá retornar a mensagem ao usuário, caso contrário vai exibir os dados da pesquisa para o usuário
    if (data.length > 0){
      data.forEach(element => {
        if(element.hasOwnProperty("erro")){
          this.erro = element.erro;
        }else{
          this.retorno.push(element);
        }
      });
      
    }else{
      this.erro = "Nenhum aluno localizado";
    }
    // this.alunoSearch = '';
    
  }
  
  // Obtem todos os dados salvo no objeto
  listarTodos(){
    this.novoAluno = false;
    this.success = false;
    this.erro = '';
    this.retorno = this.alunosService.getAll();

    // Retorna uma mensagem ao usuário caso não tenha nenhum objeto salvo
    if (this.retorno.length == 0){
      this.erro = "Nenhum aluno cadastrado";
    }
    
  }

  // Recebe os dados do formulário dataForm e salva ele no objeto Aluno
  salvar(dataForm: NgForm){
    this.success = false;
    this.retorno = [];

    // Verifica se o formulário é válido
    if (dataForm.valid){
      // Armazena os dados no objeto aluno
      this.alunos.curso = dataForm.value.curso;
      this.alunos.ru = dataForm.value.ru;
      this.alunos.nome = dataForm.value.nome;

      // Armazena os dados no Objeto aluno retorna a tela o Objeto salvo
      let data:any;
      data = this.alunosService.saveAlunos(this.alunos);
      this.retorno = this.alunosService.getAlunoById(data.lastId);
        
      this.alunos = new Alunos();
      this.novoAluno = false;
      this.success = true;
      this.message = "Cadastro realizado com sucesso";
    }else{
      // Exibe um erro caso formulário não seja válido
      this.erro="Preencha todos os campos do formulário";
    }
    
  }

  // Deleta um item do objeto aluno de acordo com o número do ID
  // Retorna uma mensagem de sucesso diminuir a quantidade de itens no objeto, caso contrário retornará uma mensagem de erro
  deletar(id:number){
    this.success = false;
    let total = this.alunosService.getAll().length
    let returno:any = [];

    returno = this.alunosService.deletaAluno(id);

    if (returno.length < total){
      this.retorno = returno;
      this.success = true;
      this.message = "Cadastro deletado com sucesso";
      
    }else{
      this.erro = "Não foi possível excluir o aluno";
    }

  }
}
