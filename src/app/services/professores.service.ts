import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../interfaces/professor.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private readonly API = 'http://localhost:8080/professores';

  constructor(private http: HttpClient) {}

  cadastrar(professor: Professor): Observable<any> {
    return this.http.post(this.API, professor);
  }

  getList(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.API);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.API}/${id}`); //ex: http://localhost:8080/professores/1
  }

  updateById(id: number, professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.API}/${id}`, professor);
  }

  deleteByid(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
