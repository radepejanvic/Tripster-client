import { Component, OnInit } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
	formModel:any;
	
	ngOnInit(): void {
		this.formModel = new window.bootstrap.Model(
			document.getElementById("myModal")
		);
	}
	openModel(){
		this.formModel.show();
	}

	doSomething(){
		this.formModel.hide();
	}
} 
