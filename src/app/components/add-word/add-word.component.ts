import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-add-word',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnChanges {
  @Input() word: any = { word: '', definition: '' };
  @Output() wordSaved = new EventEmitter<void>();

  constructor(private dictionaryService: DictionaryService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['word'] && changes['word'].currentValue) {
      this.word = { ...changes['word'].currentValue };
    } else {
      this.resetForm();
    }
  }

  addOrUpdateWord() {
    if (this.word.word_id) {
      this.dictionaryService.updateWord(this.word.word_id, { word: this.word.word, definition: this.word.definition }).subscribe(() => {
        alert('Palabra actualizada');
        this.wordSaved.emit();
        this.resetForm();
      });
    } else {
      this.dictionaryService.addWord({ word: this.word.word, definition: this.word.definition }).subscribe(() => {
        alert('Palabra agregada');
        this.wordSaved.emit();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.word = { word: '', definition: '' };
  }
}
