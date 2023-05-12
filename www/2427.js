"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2427],{2427:(J,f,r)=>{r.r(f),r.d(f,{ProfilePageModule:()=>q});var g=r(6895),l=r(4719),i=r(8779),p=r(655),m=r(1278),h=r(9115),u=r(2340),v=r(5226),d=r.n(v),e=r(4650);function P(n,a){if(1&n&&(e.TgZ(0,"span",11),e._uU(1),e.qZA()),2&n){const o=e.oxw();e.xp6(1),e.hij(" ",o.env.errorNameRequired," ")}}function Z(n,a){if(1&n&&(e.TgZ(0,"span",11),e._uU(1),e.qZA()),2&n){const o=e.oxw();e.xp6(1),e.hij(" ",o.env.errorNameLength," ")}}function C(n,a){if(1&n&&(e.TgZ(0,"span",11),e._uU(1),e.qZA()),2&n){const o=e.oxw();e.xp6(1),e.hij(" ",o.env.errorEmailRequired," ")}}function M(n,a){if(1&n&&(e.TgZ(0,"span",11),e._uU(1),e.qZA()),2&n){const o=e.oxw();e.xp6(1),e.hij(" ",o.env.errorEmailFormat," ")}}function y(n,a){if(1&n&&(e.TgZ(0,"ion-select-option"),e._uU(1),e.qZA()),2&n){const o=a.$implicit;e.xp6(1),e.Oqu(o)}}function _(n,a){if(1&n&&(e.TgZ(0,"ion-select-option",12),e._uU(1),e.qZA()),2&n){const o=a.$implicit;e.Q6J("value",o),e.xp6(1),e.Oqu(o)}}let A=(()=>{class n{constructor(o,t,c,s){this.sportCenterDataService=o,this.loadingCtrl=t,this.trackDataService=c,this.formBuilder=s,this.env=u.N,this.name="SportExample",this.email="correo@servidor.com",this.city="",this.sport="",this.citys=[],this.sports=[],this.isSubmitted=!1,this.profileForm=this.formBuilder.group({name:["",[l.kI.required,l.kI.minLength(2)]],email:["",[l.kI.required,l.kI.pattern("^([a-zA-Z0-9_\\-\\,]+)@([a-zA-Z0-9_\\-\\,]{2,}).([a-zA-Z]{2,})$")]],city:["",[l.kI.required]],sport:["",[l.kI.required]]})}ngOnInit(){this.getData()}getData(){return(0,p.mG)(this,void 0,void 0,function*(){yield this.presentLoading(u.N.textLoading),this.loading.present(),yield this.sportCenterDataService.getSportCenters().toPromise().then(o=>{for(let t of o)this.citys.includes(t.city)||this.citys.push(t.city);this.city=this.citys[0]}).catch(o=>{console.log("TERMINADO ERROR: "+o)}),yield this.trackDataService.getTracks().toPromise().then(o=>{for(let t of o)t.sport.split("-").forEach(s=>{this.sports.includes(s)||this.sports.push(s)});this.sport=this.sports[0]}),yield this.getDataLocal(),this.loading.dismiss()})}get errorControl(){return this.profileForm.controls}presentLoading(o){return(0,p.mG)(this,void 0,void 0,function*(){this.loading=yield this.loadingCtrl.create({message:o,duration:100})})}saveData(){if(!this.profileForm.valid)return d().fire({title:this.env.titleSaveProfileError,text:this.env.errorSaveProfile,icon:"error",heightAuto:!1}),!1;localStorage.setItem("profile",JSON.stringify({name:this.name,email:this.email,city:this.city,sport:this.sport})),d().fire({title:this.env.titleSaveProfile,text:this.env.textSaveProfile,icon:"success",heightAuto:!1})}getDataLocal(){return(0,p.mG)(this,void 0,void 0,function*(){let o=yield JSON.parse(localStorage.getItem("profile"));null!=o&&(this.name=o.name,this.email=o.email,this.city=o.city,this.sport=o.sport)})}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(m.x),e.Y36(i.HT),e.Y36(h.l),e.Y36(l.qu))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-profile"]],decls:46,vars:28,consts:[["novalidate","",3,"formGroup","ngSubmit"],["position","stacked"],["type","text","name","name","formControlName","name",3,"ngModel","ngModelChange"],["class","error ion-padding",4,"ngIf"],["type","email","name","email","formControlName","email","pattern","^([a-zA-Z0-9_\\-\\,]+)@([a-zA-Z0-9_\\-\\,]{2,})\\.([a-zA-Z]{2,})",3,"ngModel","ngModelChange"],["interface","popover","formControlName","city",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],["interface","popover","formControlName","sport",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["id","buttonSave","expand","full","type","submit"],["id","version"],[1,"error","ion-padding"],[3,"value"]],template:function(o,t){1&o&&(e.TgZ(0,"ion-content")(1,"ion-card")(2,"ion-card-header")(3,"ion-card-title"),e._uU(4),e.ALo(5,"titlecase"),e.qZA()(),e.TgZ(6,"ion-card-content")(7,"form",0),e.NdJ("ngSubmit",function(){return t.saveData()}),e.TgZ(8,"ion-list")(9,"ion-item")(10,"ion-label",1)(11,"h2"),e._uU(12),e.ALo(13,"titlecase"),e.qZA()(),e.TgZ(14,"ion-input",2),e.NdJ("ngModelChange",function(s){return t.name=s}),e.qZA(),e.YNc(15,P,2,1,"span",3),e.YNc(16,Z,2,1,"span",3),e.qZA(),e.TgZ(17,"ion-item")(18,"ion-label",1)(19,"h2"),e._uU(20),e.ALo(21,"titlecase"),e.qZA()(),e.TgZ(22,"ion-input",4),e.NdJ("ngModelChange",function(s){return t.email=s}),e.qZA(),e.YNc(23,C,2,1,"span",3),e.YNc(24,M,2,1,"span",3),e.qZA(),e.TgZ(25,"ion-item")(26,"ion-label",1)(27,"h2"),e._uU(28),e.ALo(29,"titlecase"),e.qZA()(),e.TgZ(30,"ion-select",5),e.NdJ("ngModelChange",function(s){return t.city=s}),e.YNc(31,y,2,1,"ion-select-option",6),e.qZA()(),e.TgZ(32,"ion-item")(33,"ion-label",1)(34,"h2"),e._uU(35),e.ALo(36,"titlecase"),e.qZA()(),e.TgZ(37,"ion-select",7),e.NdJ("ngModelChange",function(s){return t.sport=s}),e.YNc(38,_,2,2,"ion-select-option",8),e.qZA()()(),e.TgZ(39,"ion-button",9)(40,"p"),e._uU(41),e.qZA()()(),e.TgZ(42,"p"),e._uU(43),e.qZA()()(),e.TgZ(44,"p",10),e._uU(45,"V.1.0"),e.qZA()()),2&o&&(e.xp6(4),e.Oqu(e.lcZ(5,18,t.env.titleMyProfile)),e.xp6(3),e.Q6J("formGroup",t.profileForm),e.xp6(5),e.Oqu(e.lcZ(13,20,t.env.titleProfile)),e.xp6(2),e.Q6J("ngModel",t.name),e.xp6(1),e.Q6J("ngIf",null==t.errorControl.name.errors?null:t.errorControl.name.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.errorControl.name.errors?null:t.errorControl.name.errors.minlength),e.xp6(4),e.Oqu(e.lcZ(21,22,t.env.titleEmail)),e.xp6(2),e.Q6J("ngModel",t.email),e.xp6(1),e.Q6J("ngIf",null==t.errorControl.email.errors?null:t.errorControl.email.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.errorControl.email.errors?null:t.errorControl.email.errors.pattern),e.xp6(4),e.Oqu(e.lcZ(29,24,t.env.titleUbication)),e.xp6(2),e.Q6J("ngModel",t.city),e.xp6(1),e.Q6J("ngForOf",t.citys),e.xp6(4),e.Oqu(e.lcZ(36,26,t.env.titleSport)),e.xp6(2),e.Q6J("ngModel",t.sport),e.xp6(1),e.Q6J("ngForOf",t.sports),e.xp6(3),e.Oqu(t.env.save),e.xp6(2),e.hij(" ",t.env.titleProfileDescription," "))},dependencies:[i.YG,i.PM,i.FN,i.Zi,i.Dq,i.W2,i.pK,i.Ie,i.Q$,i.q_,i.t9,i.n0,i.QI,i.j9,g.sg,g.O5,l._Y,l.JJ,l.JL,l.c5,l.sg,l.u,g.rS],styles:["ion-content[_ngcontent-%COMP%]{--overflow: hidden;--ion-background-color: var(--ion-color-primary)}ion-card[_ngcontent-%COMP%]{background-color:var(--ion-color-secondary);padding:10px}ion-card-title[_ngcontent-%COMP%]{color:#fff;text-align:center}ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--ion-color-tertiary)}ion-list[_ngcontent-%COMP%]{--ion-background-color: var(--ion-color-secondary)}ion-label[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:x-large;color:var(--ion-color-tertiary)}ion-input[_ngcontent-%COMP%], ion-select[_ngcontent-%COMP%]{color:#fff}ion-button[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}#version[_ngcontent-%COMP%]{bottom:0;position:absolute;right:5px;margin:0}.error[_ngcontent-%COMP%]{color:#ff2424;padding:0 6px;background-color:#07070730;border-radius:5px}"]}),n})();var T=r(4541),O=r(8425),x=r(5642);let q=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[i.Pc,g.ez,l.u5,l.UX,T.e,x.K,O.Bz.forChild([{path:"",component:A}])]}),n})()}}]);