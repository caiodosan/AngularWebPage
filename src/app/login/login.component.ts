import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email: String='';
  password: String='';
  isLoadingResults = false;

  constructor(private router: Router,private api: ApiService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null,Validators.required],
      'password': [null,Validators.required]
    });
  }

  addLogin(form : NgForm) {
    this.isLoadingResults = true;
    this.api.Login(form)
    .subscribe(res => { 
    localStorage.setItem("jwt", res.token);
    this.isLoadingResults = false;
    this.router.navigate(['/categorias']);
    },(err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
