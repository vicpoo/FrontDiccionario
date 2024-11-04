import { Component, Output, EventEmitter } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent {
  words: any[] = [];
  displayedWords: any[] = [];
  currentIndex: number = 0;
  pageSize: number = 10;

  @Output() editWordEvent = new EventEmitter<any>();

  constructor(private dictionaryService: DictionaryService) {
    this.fetchWords();
  }

  fetchWords() {
    this.dictionaryService.getWords().subscribe((data: any[]) => {
      this.words = data;
      this.loadMoreWords();
    });
  }

  loadMoreWords() {
    const nextIndex = this.currentIndex + this.pageSize;
    this.displayedWords = [...this.displayedWords, ...this.words.slice(this.currentIndex, nextIndex)];
    this.currentIndex = nextIndex;
  }

  deleteWord(word_id: number) {
    this.dictionaryService.deleteWord(word_id).subscribe(() => {
      alert('Palabra eliminada');
      this.words = this.words.filter(word => word.word_id !== word_id);
      this.currentIndex = 0;
      this.displayedWords = [];
      this.loadMoreWords();
    });
  }

  editWord(word: any) {
    this.editWordEvent.emit(word);
  }
}
