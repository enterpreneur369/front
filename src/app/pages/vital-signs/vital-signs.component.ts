import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Sign } from '../../model/sign';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignService } from '../../services/sign.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-vital-signs',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './vital-signs.component.html',
  styleUrl: './vital-signs.component.css'
})
export class VitalSignsComponent implements OnInit {
  dataSource: MatTableDataSource<Sign>;
  columnDefinitions = [
    { def: 'idSign', label: 'idSign', hide: true},
    { def: 'patient', label: 'patient', hide: false},
    { def: 'date', label: 'date', hide: false},
    { def: 'temperature', label: 'temperature', hide: false},
    { def: 'pulse', label: 'pulse', hide: false},
    { def: 'respiratoryRhythm', label: 'respiratoryRhythm', hide: false},
    { def: 'actions', label: 'actions', hide: false}
  ]

  constructor(
    private signService: SignService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.signService.getSignChange().subscribe(data => {
      this.createTable(data);
    });

    this.signService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    });
  }

  getDisplayedColumns(){
    return this.columnDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  createTable(data: Sign[]){
    this.dataSource = new MatTableDataSource<Sign>(data);
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  delete(idSign: number) {
    this.signService.delete(idSign)
    .pipe(switchMap( () => this.signService.findAll()  ))
    .subscribe(data => {
      this.signService.setSignChange(data);
      this.signService.setMessageChange('DELETED!');
    });
  }
}
