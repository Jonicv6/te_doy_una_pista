"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7851],{7851:(m,d,r)=>{r.r(d),r.d(d,{SearchPageModule:()=>A});var i=r(8779),u=r(8425),p=r(6895),h=r(4719),s=r(655),_=r(1278),a=r(9115),f=r(2340),t=r(4650);function v(n,c){if(1&n&&(t.TgZ(0,"ion-select-option"),t._uU(1),t.qZA()),2&n){const e=c.$implicit;t.xp6(1),t.Oqu(e)}}function C(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"ion-select",3),t.NdJ("ngModelChange",function(g){t.CHM(e);const l=t.oxw();return t.KtG(l.city=g)}),t.YNc(1,v,2,1,"ion-select-option",10),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("ngModel",e.city),t.xp6(1),t.Q6J("ngForOf",e.citys)}}function P(n,c){if(1&n&&(t.TgZ(0,"ion-select-option",11),t._uU(1),t.qZA()),2&n){const e=c.$implicit;t.Q6J("value",e),t.xp6(1),t.Oqu(e)}}function y(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"ion-card",12),t.NdJ("click",function(){const l=t.CHM(e).$implicit,N=t.oxw();return t.KtG(N.openPage(l))}),t.TgZ(1,"ion-card-title"),t._uU(2),t.qZA(),t.TgZ(3,"p"),t._uU(4),t.qZA()()}if(2&n){const e=c.$implicit;t.xp6(2),t.hij(" ",e.name," "),t.xp6(2),t.AsE("",e.street," - ",e.city,"")}}function S(n,c){if(1&n&&(t.TgZ(0,"ion-label"),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.hij(" ",e.env.selectCitySport,"")}}function M(n,c){if(1&n&&(t.TgZ(0,"ion-label"),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.hij(" ",e.env.emptySearch," ")}}function O(n,c){if(1&n&&(t.TgZ(0,"div",13),t.YNc(1,S,2,1,"ion-label",14),t.YNc(2,M,2,1,"ion-label",14),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.init),t.xp6(1),t.Q6J("ngIf",e.empty)}}let x=(()=>{class n{constructor(e,o,g,l){this.navCtrl=e,this.sportCenterDataService=o,this.loadingCtrl=g,this.trackDataService=l,this.citys=[],this.sports=[],this.sportCenters=[],this.sportCenterData=[],this.init=!0,this.empty=!1,this.env=f.N}ngOnInit(){this.getData(),this.localData()}getData(){return(0,s.mG)(this,void 0,void 0,function*(){yield this.presentLoading(f.N.textLoading),this.loading.present(),yield this.sportCenterDataService.getSportCenters().toPromise().then(e=>{for(let o of e)this.citys.includes(o.city)||this.citys.push(o.city);this.city=this.citys[0]}).catch(e=>{console.log("TERMINADO ERROR: "+e)}),yield this.trackDataService.getTracks().toPromise().then(e=>{for(let o of e)o.sport.split("-").forEach(l=>{this.sports.includes(l)||this.sports.push(l)});this.sport=this.sports[0]})})}search(e,o){return(0,s.mG)(this,void 0,void 0,function*(){this.sportCenters=[],this.sportAux=o,this.init=!1,yield this.sportCenterDataService.getSportCentersCityAndSport(e,o).toPromise().then(g=>{this.sportCenters=g,this.empty=0==this.sportCenters.length,this.loading.dismiss()})})}presentLoading(e){return(0,s.mG)(this,void 0,void 0,function*(){this.loading=yield this.loadingCtrl.create({message:e,duration:1e3})})}localData(){return(0,s.mG)(this,void 0,void 0,function*(){setTimeout(()=>(0,s.mG)(this,void 0,void 0,function*(){if(null!=localStorage.getItem("profile")){let e=yield JSON.parse(localStorage.getItem("profile"));this.sport=e.sport,this.city=e.city}this.search(this.city,this.sport)}),1e3)})}openPage(e){this.navCtrl.navigateForward("tabs/search/forms/"+e.idSportCenter+"/"+this.sportAux)}initResult(){}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(i.SH),t.Y36(_.x),t.Y36(i.HT),t.Y36(a.l))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-search"]],decls:21,vars:12,consts:[["id","menu-search"],[1,"select"],["interface","popover",3,"ngModel","ngModelChange",4,"ngIf"],["interface","popover",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["id","buttonSearch","expand","full",3,"click"],["id","contentList"],["id","result-search"],[3,"click",4,"ngFor","ngForOf"],["class","message",4,"ngIf"],[4,"ngFor","ngForOf"],[3,"value"],[3,"click"],[1,"message"],[4,"ngIf"]],template:function(e,o){1&e&&(t.TgZ(0,"ion-content")(1,"div",0)(2,"div")(3,"div",1)(4,"ion-label"),t._uU(5),t.ALo(6,"titlecase"),t.qZA(),t.YNc(7,C,2,2,"ion-select",2),t.qZA(),t.TgZ(8,"div",1)(9,"ion-label"),t._uU(10),t.ALo(11,"titlecase"),t.qZA(),t.TgZ(12,"ion-select",3),t.NdJ("ngModelChange",function(l){return o.sport=l}),t.YNc(13,P,2,2,"ion-select-option",4),t.qZA()()(),t.TgZ(14,"ion-button",5),t.NdJ("click",function(){return o.search(o.city,o.sport)}),t.TgZ(15,"p"),t._uU(16),t.qZA()()(),t.TgZ(17,"div",6)(18,"ion-virtual-scroll",7),t.YNc(19,y,5,3,"ion-card",8),t.YNc(20,O,3,2,"div",9),t.qZA()()()),2&e&&(t.xp6(5),t.Oqu(t.lcZ(6,8,o.env.city)),t.xp6(2),t.Q6J("ngIf",o.citys),t.xp6(3),t.Oqu(t.lcZ(11,10,o.env.sport)),t.xp6(2),t.Q6J("ngModel",o.sport),t.xp6(1),t.Q6J("ngForOf",o.sports),t.xp6(3),t.Oqu(o.env.search),t.xp6(3),t.Q6J("ngForOf",o.sportCenters),t.xp6(1),t.Q6J("ngIf",o.init||o.empty))},dependencies:[i.YG,i.PM,i.Dq,i.W2,i.Q$,i.t9,i.n0,i.QI,i.aJ,p.sg,p.O5,h.JJ,h.On,p.rS],styles:["ion-content[_ngcontent-%COMP%]{--overflow:hidden;--ion-background-color: var(--ion-color-secondary)}ion-toolbar[_ngcontent-%COMP%]{--ion-background-color: #222428}#menu-search[_ngcontent-%COMP%]{display:flex;flex-direction:column}#menu-search[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin:5px}.select[_ngcontent-%COMP%]{width:50%;float:left}.select[_ngcontent-%COMP%] > ion-label[_ngcontent-%COMP%]{color:var(--ion-color-tertiary)}.select[_ngcontent-%COMP%] > ion-select[_ngcontent-%COMP%]{color:#fff;margin-right:5px}#buttonSearch[_ngcontent-%COMP%]{float:none;width:100%;margin:0;--background: var(--ion-color-primary-shade) !important}#buttonSearch[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{color:var(--ion-color-tertiary);margin-bottom:0}#contentList[_ngcontent-%COMP%]{background-color:var(--ion-color-primary)!important;display:flex;flex-direction:column;height:100%}#result-search[_ngcontent-%COMP%]{background-color:var(--ion-color-primary)!important;overflow:auto;margin-top:auto;margin-bottom:17%;height:100%!important}ion-card[_ngcontent-%COMP%]{background-color:var(--ion-color-secondary);padding:10px}ion-card-title[_ngcontent-%COMP%]{color:#fff}ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--ion-color-tertiary)}.message[_ngcontent-%COMP%]{background-color:#fff;opacity:50%;padding:5px;margin:50% 15px;border-radius:5px;text-align:center}.message[_ngcontent-%COMP%] > ion-label[_ngcontent-%COMP%]{color:gray}"]}),n})();var T=r(4541),Z=r(5642);let A=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[i.Pc,p.ez,h.u5,T.e,Z.K,u.Bz.forChild([{path:"",component:x}])]}),n})()},1278:(m,d,r)=>{r.d(d,{x:()=>h});var i=r(2340),u=r(4650),p=r(529);let h=(()=>{class s{constructor(a){this.httpClient=a}setSportCenters(a){this.sportCenters=a}getSportCenters(){return this.httpClient.get(i.N.endPoint+i.N.sporcenterPoint)}setSportCenter(a){this._sportCenter=a}getSportCenter(a){return this.httpClient.get(i.N.endPoint+i.N.sporcenterPoint+a)}getSportCentersCityAndSport(a,f){return this.httpClient.get(i.N.endPoint+i.N.sporcenterPoint+a+"/"+f)}}return s.\u0275fac=function(a){return new(a||s)(u.LFG(p.eN))},s.\u0275prov=u.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);