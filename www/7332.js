"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7332],{7332:(P,f,r)=>{r.r(f),r.d(f,{MapsPageModule:()=>E});var a=r(8779),m=r(8425),v=r(6895),u=r(4719),c=r(655),o=r(4650),l=r(1278),C=r(5419),O=r(6498),M=function(s){function i(){return null!==s&&s.apply(this,arguments)||this}return(0,c.ZT)(i,s),i.prototype.getCurrentPosition=function(t){return(0,C.DM)(this,"getCurrentPosition",{callbackOrder:"reverse"},arguments)},i.prototype.watchPosition=function(t){return new O.y(function(e){var n=navigator.geolocation.watchPosition(e.next.bind(e),e.next.bind(e),t);return function(){return navigator.geolocation.clearWatch(n)}})},i.pluginName="Geolocation",i.plugin="cordova-plugin-geolocation",i.pluginRef="navigator.geolocation",i.repo="https://github.com/apache/cordova-plugin-geolocation",i.install='ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"',i.installVariables=["GEOLOCATION_USAGE_DESCRIPTION"],i.platforms=["Amazon Fire OS","Android","Browser","iOS","Windows"],i.\u0275fac=function(){var t;return function(n){return(t||(t=o.n5z(i)))(n||i)}}(),i.\u0275prov=o.Yz7({token:i,factory:function(t){return i.\u0275fac(t)}}),i}(C.KY),d=r(2340),y=r(9115);const w=["mapElement"];function N(s,i){if(1&s&&(o.TgZ(0,"ion-select-option",5),o._uU(1),o.qZA()),2&s){const t=i.$implicit;o.Q6J("value",t),o.xp6(1),o.Oqu(t)}}let T=(()=>{class s{constructor(t,e,n,g){this.geolocation=t,this.sportCenterDataService=e,this.loadingCtrl=n,this.trackDataService=g,this.infoWindows=[],this.sportCenters=[],this.sports=[],this.init=!0,this.sport=null,this.env=d.N,this.trackDataService.getTracks().subscribe(p=>{for(let h of p)h.sport.split("-").forEach(S=>{this.sports.includes(S)||this.sports.push(S)})})}ngAfterContentInit(){}ionViewDidEnter(){}ngOnInit(){this.getDataLocal()}presentLoading(t){return(0,c.mG)(this,void 0,void 0,function*(){this.loading=yield this.loadingCtrl.create({message:t}),yield this.loading.present()})}getDataLocal(){return(0,c.mG)(this,void 0,void 0,function*(){this.presentLoading(d.N.textWait),setTimeout(()=>(0,c.mG)(this,void 0,void 0,function*(){if(null!=localStorage.getItem("profile")){let t=yield JSON.parse(localStorage.getItem("profile"));this.sport=t.sport}null==this.sport&&this.showMap(),this.loading.dismiss()}),4e3)})}changeSport(t){this.sportCenters=[],this.presentLoading(d.N.textLoading),setTimeout(()=>{this.sportCenterDataService.getSportCenters().subscribe(e=>{this.trackDataService.getTracks().subscribe(n=>{n.filter(g=>{let p=g.sport.split("-");for(let h of e)-1!=p.indexOf(t)&&h.idSportCenter===g.sportCenter&&-1==this.sportCenters.indexOf(h)&&this.sportCenters.push(h)}),this.showMap()})}),this.loading.dismiss()},1500)}showMap(){this.geolocation.getCurrentPosition().then(t=>{this.latitude_ubication=t.coords.latitude,this.longitude_ubication=t.coords.longitude;const e={lat:this.latitude_ubication,lng:this.longitude_ubication};this.map=new google.maps.Map(this.mapElement.nativeElement,{center:e,zoom:8,streetViewControl:!1});const n={url:d.N.iconMapURL,scaledSize:new google.maps.Size(50,50)};new google.maps.Marker({position:e,title:"You are here",latitude:this.latitude_ubication,longitude:this.longitude_ubication,icon:n}).setMap(this.map);const p=new google.maps.InfoWindow;p.setPosition(e),p.setContent(d.N.textHere),p.open(this.map),this.map.setCenter(e),0!=this.sportCenters.length&&this.addMarkersToMap(this.sportCenters)}).catch(t=>{console.log(d.N.errorLocation,t)}),0==this.sportCenters.length&&null!=this.sport?alert(d.N.emptySportCenter):null==this.sport&&alert(d.N.selectSportMap)}addMarkersToMap(t){const e={url:d.N.iconSportCenterURL,scaledSize:new google.maps.Size(70,70)};for(let n of t){let g=new google.maps.LatLng(n.latitude,n.longitude),p=new google.maps.Marker({position:g,title:n.name,content:n.street+", "+n.city+" ("+n.province+")",latitude:n.latitude,longitude:n.longitude,icon:e});p.setMap(this.map),this.addInfoWindowToMarker(p)}}addInfoWindowToMarker(t){let n=new google.maps.InfoWindow({content:'<div id="content"><h3 id="firstHeaading" class="firstHeading">'+t.title+"</h3><p>"+t.content+"</p>"});t.addListener("click",()=>{this.closeAllInfoWindows(),n.open(this.map,t)}),this.infoWindows.push(n)}closeAllInfoWindows(){for(let t of this.infoWindows)t.close()}}return s.\u0275fac=function(t){return new(t||s)(o.Y36(M),o.Y36(l.x),o.Y36(a.HT),o.Y36(y.l))},s.\u0275cmp=o.Xpm({type:s,selectors:[["app-maps"]],viewQuery:function(t,e){if(1&t&&o.Gf(w,5,o.SBq),2&t){let n;o.iGM(n=o.CRH())&&(e.mapElement=n.first)}},decls:5,vars:4,consts:[["color","primary",3,"fullscreen"],["id","selectSport","interface","popover",3,"ngModel","placeholder","ionChange","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[1,"map"],["mapElement",""],[3,"value"]],template:function(t,e){1&t&&(o.TgZ(0,"ion-content",0)(1,"ion-select",1),o.NdJ("ionChange",function(){return e.changeSport(e.sport)})("ngModelChange",function(g){return e.sport=g}),o.YNc(2,N,2,2,"ion-select-option",2),o.qZA(),o._UZ(3,"div",3,4),o.qZA()),2&t&&(o.Q6J("fullscreen",!0),o.xp6(1),o.s9C("placeholder",e.env.selectSport),o.Q6J("ngModel",e.sport),o.xp6(1),o.Q6J("ngForOf",e.sports))},dependencies:[a.W2,a.t9,a.n0,a.QI,v.sg,u.JJ,u.On],styles:["ion-content[_ngcontent-%COMP%]{display:grid}ion-content[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{background-color:var(--ion-color-secondary)!important}ion-select[_ngcontent-%COMP%]{--overflow:hidden;color:#fff;background-color:var(--ion-color-secondary)!important;height:10%}.map[_ngcontent-%COMP%]{width:100%;height:90%;background-color:var(--ion-color-secondary)!important}*[_ngcontent-%COMP%]{color:#000}"]}),s})();var I=r(4541),D=r(5642);let E=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({providers:[M],imports:[a.Pc,v.ez,u.u5,I.e,D.K,m.Bz.forChild([{path:"",component:T}])]}),s})()},1278:(P,f,r)=>{r.d(f,{x:()=>u});var a=r(2340),m=r(4650),v=r(529);let u=(()=>{class c{constructor(l){this.httpClient=l}setSportCenters(l){this.sportCenters=l}getSportCenters(){return this.httpClient.get(a.N.endPoint+a.N.sporcenterPoint)}setSportCenter(l){this._sportCenter=l}getSportCenter(l){return this.httpClient.get(a.N.endPoint+a.N.sporcenterPoint+l)}getSportCentersCityAndSport(l,C){return this.httpClient.get(a.N.endPoint+a.N.sporcenterPoint+l+"/"+C)}}return c.\u0275fac=function(l){return new(l||c)(m.LFG(v.eN))},c.\u0275prov=m.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()}}]);