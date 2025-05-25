import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Professor } from 'src/app/interfaces/professor.interface';
import { ProfessorService } from 'src/app/services/professores.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-put-or-post',
  templateUrl: './put-or-post.component.html',
  styleUrls: ['./put-or-post.component.css'],
})
export class PutOrPostComponent implements OnInit {
  formulario!: FormGroup;
  idUser!: any;

  title: string = '';
  subtitle: string = '';

  professor!: Professor;

  constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      disciplina: ['', [Validators.required]],
      status: [null, Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.idUser = id;

    if (this.idUser) {
      this.title = 'Atualizar Usuários';
      this.subtitle = 'Edite as informações para atualizar o usuário';
      this.professorService.getById(this.idUser).subscribe({
        next: (prof) => {
          this.professor = prof;
          this.buildForm(this.professor);
        },
      });
    } else {
      this.title = 'Cadastrar Usuários';
      this.subtitle = 'Preencha as informações para criar um novo usuário';
    }
  }

  buildForm(professor: Professor) {
    this.formulario.patchValue({
      nome: professor.nome,
      email: professor.email,
      telefone: professor.telefone,
      disciplina: professor.disciplina,
      status: professor.status,
    });
  }

  salvarProfessor() {
    if (this.formulario.invalid) return;

    if (this.idUser) {
      const professorAtualizado: Professor = {
        id: Number(this.idUser), // garante que seja número
        ...this.formulario.value, // pega todos os campos automaticamente
      };

      this.professorService
        .updateById(professorAtualizado.id as number, professorAtualizado)
        .subscribe({
          next: (res) => {
            this.dialog.open(ModalComponent, {
              data: {
                message: 'Professor Atualizado com Sucesso!',
              },
            });
          },
        });
    } else {
      this.cadastrar();
    }
  }

  cadastrar() {
    if (this.formulario.valid) {
      this.professorService.cadastrar(this.formulario.value).subscribe({
        next: (res) => {
          this.formulario.reset();
          this.dialog.open(ModalComponent, {
            data: {
              message: 'Professor Cadastrado com Sucesso!',
            },
          });
        },
      });
    }
  }
}
