import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private apiUrl = 'http://localhost:8000/api/diccionario';

  constructor(private http: HttpClient) {}

  // Método para buscar una palabra completa
  searchWord(term: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/${term}`);
  }

  // Método para buscar palabras por letra inicial
  searchWordsByInitial(letter: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?initial=${letter}`);
  }

  // Método para agregar una nueva palabra
  addWord(word: { word: string; definition: string }): Observable<any> {
    return this.http.post(this.apiUrl, word);
  }

  // Método para obtener todas las palabras
  getWords(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Método para eliminar una palabra
  deleteWord(word_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${word_id}`);
  }

  // Método para actualizar una palabra existente
  updateWord(word_id: number, wordData: { word: string; definition: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${word_id}`, wordData);
  }
}
