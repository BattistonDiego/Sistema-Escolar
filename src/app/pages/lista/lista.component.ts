import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Professor } from 'src/app/interfaces/professor.interface';
import { ProfessorService } from 'src/app/services/professores.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  listProfessores: Professor[] = [];
  statusSelecionado: string | number = '';
  profListDefault!: Professor[];

  pageSize = 10;

  displayedColumns: string[] = [
    'nome',
    'email',
    'telefone',
    'disciplina',
    'status',
    'acao',
  ];
  dataSource = new MatTableDataSource<Professor>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serviceProfessores: ProfessorService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.serviceProfessores.getList().subscribe({
      next: (res) => {
        this.dataSource.data = res.filter((prof) => prof.status === 1);
        this.profListDefault = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error(err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
  }

  atualiza(dados: any) {
    this.router.navigate(['/atualizar', dados.id]);
  }

  deleteProf(id: number) {
    this.serviceProfessores.deleteByid(id).subscribe({
      next: (res) => {
        const dialoRef = this.dialog.open(ModalComponent, {
          data: {
            message: 'Professor deletado com sucesso!',
          },
        });

        dialoRef.afterClosed().subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (prof) => prof.id !== id
          );
        });
      },
    });
  }

  filtrarLista(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.statusSelecionado = +selectElement.value;

    this.dataSource.data = this.profListDefault.filter(
      (prof) => prof.status === this.statusSelecionado
    );
  }
}
