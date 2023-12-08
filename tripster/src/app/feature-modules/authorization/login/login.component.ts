import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,NgForm } from '@angular/forms';
import { Login } from '../model/login.model';
import { AuthResponse } from '../model/auth-resposne.model';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

	constructor(private authService: AuthorizationService,
		private router:Router){}
	ngOnInit(): void {
		this.router.navigate(['home'])
		document.getElementById("login")?.click()
	}

	loginForm = new FormGroup({
		username: new FormControl('',[Validators.email,Validators.required]),
		password: new FormControl('',Validators.required)
	})

	public errorText: string = '';

	login(): void{
		if(this.loginForm.valid){

			const login: Login = {
				email: this.loginForm.value.username || "",
				password: this.loginForm.value.password || ""
			}

			this.authService.login(login).subscribe({

				next: (response: AuthResponse) => {
					localStorage.setItem('user',response.token);
					this.authService.setRole()
					this.router.navigate(['home'])
					this.claerForm()
					document.getElementById("close")?.click()
				}
			})
		}else{
			this.errorText = "Bad data."
		}
	}

	claerForm():void{
		this.loginForm.reset();
	}
} 
