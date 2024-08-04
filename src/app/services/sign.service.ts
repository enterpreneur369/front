import { Injectable } from '@angular/core';
import { Sign } from '../model/sign';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignService extends GenericService<Sign>{
  private signChange: Subject<Sign[]> = new Subject<Sign[]>;
  private messageChange: Subject<string> = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/signs`);
   }

   setSignChange(data: Sign[]){
     this.signChange.next(data);
   }

   getSignChange(){
     return this.signChange.asObservable();
   }

   setMessageChange(data: string){
      this.messageChange.next(data);
    }

    getMessageChange(){
      return this.messageChange.asObservable();
    }
}
