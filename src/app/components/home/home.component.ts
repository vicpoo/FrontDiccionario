// home.component.ts
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { DictionaryService } from '../../services/dictionary.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    LogoComponent,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm: string = '';
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  results$: Observable<any> | null = null;

  constructor(
    private dictionaryService: DictionaryService, 
    private router: Router
  ) {}

  search() {
    this.results$ = this.dictionaryService.searchWord(this.searchTerm);
  }

  searchByLetter(letter: string) {
    this.results$ = this.dictionaryService.searchWordsByInitial(letter);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
