import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/selectors';
import { loadFiles } from '../../store/actions';  
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css','../../sharedCSS/row.css']
})
export class FileListComponent implements OnInit {
  files$: Observable<string[]>;

  constructor(private router: Router, private store: Store<{ files: string[] }>) {
    this.files$ = this.store.select(fromRoot.selectFiles);
  }

  ngOnInit() {
    this.store.dispatch(loadFiles());
  }

  onFileSelected(file: string) {
    this.router.navigate(['/files', file]);
  }
}

