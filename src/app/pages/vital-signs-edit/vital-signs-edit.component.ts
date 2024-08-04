import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignService } from '../../services/sign.service';
import { Sign } from '../../model/sign';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-vital-signs-edit',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './vital-signs-edit.component.html',
  styleUrl: './vital-signs-edit.component.css'
})
export class VitalSignsEditComponent implements OnInit {
  id: number;
  form: FormGroup;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signService: SignService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      idSign: new FormControl(0),
      patient: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      temperature: new FormControl('', Validators.required),
      pulse: new FormControl('', Validators.required),
      respiratoryRhythm: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.isEdit) {
      this.signService.findById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idSign: new FormControl(data.idSign),
          patient: new FormControl(data.patient, Validators.required),
          date: new FormControl(data.patient, Validators.required),
          temperature: new FormControl(data.temperature, Validators.required),
          pulse: new FormControl(data.pulse, Validators.required),
          respiratoryRhythm: new FormControl(data.respiratoryRhythm, Validators.required),
        });
      });
    }
  }

  operate() {
    if(this.form.invalid){ return; }

    const sign = new Sign();
    sign.idSign = this.form.value['idSign'];
    sign.patient = this.form.value['patient'];
    sign.date = this.form.value['date'];
    sign.temperature = this.form.value['temperature'];
    sign.pulse = this.form.value['pulse'];
    sign.respiratoryRhythm = this.form.value['respiratoryRhythm'];

    if (this.isEdit) {
      //UPDATE
      //PRACTICA COMUN - NO IDEAL
      this.signService.update(this.id, sign).subscribe(() => {
        this.signService.findAll().subscribe((data) => {
          this.signService.setSignChange(data);
          this.signService.setMessageChange('UPDATED!');
        });
      });
    } else {
      //INSERT
      //PRACTICA IDEAL
      this.signService
        .save(sign)
        .pipe(switchMap(() => this.signService.findAll()))
        .subscribe((data) => {
          this.signService.setSignChange(data);
          this.signService.setMessageChange('CREATED!');
        });
    }
    this.router.navigate(['/account/vital-signs']);
  }

  get f(){
    return this.form.controls;
  }

}
