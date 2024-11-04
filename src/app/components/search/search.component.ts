import { Component } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  result: any = null;
  
  constructor(private dictionaryService: DictionaryService) {}

  // Función para buscar la palabra exacta
  search() {
    if (this.searchTerm.trim() === '') {
      // Si el campo está vacío, limpia el resultado y no realiza la búsqueda
      this.result = null;
      return;
    }

    // Llamada a la API para buscar la palabra exacta
    this.dictionaryService.searchWord(this.searchTerm).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          // Si existe la palabra, muestra solo el resultado
          this.result = response[0]; // Muestra solo la primera coincidencia
        } else {
          // Si no existe, muestra una alerta y limpia el resultado
          this.result = null;
          this.showAlert();
        }
      },
      (error) => {
        console.error('Error al buscar la palabra:', error);
        this.result = null;
      }
    );
  }

  // Alerta simple en caso de que la palabra no exista
  showAlert() {
    alert(`No se encontraron resultados para "${this.searchTerm}".`);
  }
}
