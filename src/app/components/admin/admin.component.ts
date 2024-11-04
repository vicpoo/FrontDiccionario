import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWordComponent } from '../add-word/add-word.component';
import { WordListComponent } from '../word-list/word-list.component';
import { LogoComponent } from '../logo/logo.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AddWordComponent, WordListComponent, LogoComponent, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  selectedWord: any = null;

  onEditWord(word: any) {
    this.selectedWord = word;
  }

  clearSelectedWord() {
    this.selectedWord = null;
  }
}
