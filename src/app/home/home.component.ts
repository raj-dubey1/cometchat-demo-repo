import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatTheme, fontHelper, localize } from '@cometchat-pro/angular-ui-kit';
import { CometChatServices } from '../app.service';
@Component({
  selector: 'cometchat-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger("FadeInFadeOut", [
      state(
        "normal",
        style({
          left: "0%",
        })
      ),
      state(
        "animated",
        style({
          left: "-100%",
          zIndex: "0",
        })
      ),
      transition("normal<=>animated", animate(300)),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  public theme = new CometChatTheme({})
  public logoutIconURL:string="assets/power-off.png";
  public themeIconURL:string="assets/switch-mode.png";
  public rightconURL:string="assets/right-arrow.png";
  public navigateconURL:string="assets/right-arrow-2.png";
  public pageName:string = ""
  public localize:any = localize
  public showMainScreen:boolean=false;
  // To display image in full screen
  fullScreenViewImage: boolean = false;
  imageView = {};
  groupToUpdate = {};
  groupToDelete = {};
  groupMessage: any;
  public isMobileView:boolean=false;
  checkAnimatedState: any;
  checkIfAnimated: boolean = false;
  innerWidth: any;
  outgoingCall = null;
  incomingCall = null;
  callMessage: object = {};
  messageToMarkRead: any;
  constructor(private router: Router,private route: ActivatedRoute,private cometchatService:CometChatServices) {
    if(this.cometchatService.theme){
      this.theme = this.cometchatService.theme
    }
  }
  ngOnInit() {
    this.checkUserLogIn()
    try {
      this.onResize();
    } catch (error) {
    }
  }
  ngAfterContentInit(){
    this.changePage("chats-module");
    this.showMainScreen = false;
  }
  changeTheme = ()=>{
    if(this.theme.palette.mode == "dark"){
      this.theme.palette.setMode("light")
      this.cometchatService.theme = this.theme;
    }
    else{
      this.theme.palette.setMode("dark")
      this.cometchatService.theme = this.theme;
    }
  }
  goBack(){
    this.showMainScreen=false;
  }
  checkUserLogIn() {
    CometChat.getLoggedinUser().then(
      (user) => {
        if (!user) {
          this.router.navigate(['/login'])
        }
      }, error => {
        console.log("Some Error Occured", { error });
      }
    );
  }
  logout = ()=>{
        CometChat.logout().then(
          (user) => {
            console.log("Logout successfull:");
            this.router.navigate(["/login"]);
          },
          (error) => {
            console.log("Logout failed", { error });
          }
        );
  }
  changePage = (name:string)=>{
    
    if(name){
      this.showMainScreen = true;
      this.pageName = name;
    }
  }
  /**
   * Checks when window size is changed in realtime
   */
  @HostListener("window:resize", [])
  onResize(): boolean {
    try {
      this.innerWidth = window.innerWidth;
      if (
        this.innerWidth >= 300 &&
        this.innerWidth <= 767
      ) {
        this.isMobileView = true;
        if (this.checkIfAnimated === true) {
          return false;
        }
        this.checkAnimatedState = "normal";
        this.checkIfAnimated = true;
      } else {
        this.isMobileView = false
        this.checkAnimatedState = null;
        this.checkIfAnimated = false;
      }
    } catch (error) {
    }
    return true;
  }
// styles
style:any={
  sidebarStyle:()=>{
    return{
      // background:this.theme.palette.getSecondary()
      background:this.theme.palette.getBackground(),
      border: `1px solid ${this.theme.palette.getAccent200()}`
    }
  },
  headerTitleStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.heading),
      color:this.theme.palette.getAccent()
    }
  },
  mainscreenStyle:()=>{
    return{
      background:this.theme.palette.getBackground(),
      border: `1px solid ${this.theme.palette.getAccent200()}`,
      zIndex: this.showMainScreen && this.isMobileView ? "10" : "1"
    }
  },
  cardTitleStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.title1),
      color:this.theme.palette.getAccent()
    }
  },
  cardStyle:()=>{
    return{
     background:this.theme.palette.getBackground(),
     boxShadow: `${this.theme.palette.getAccent400()} 0px 0px 5px`
    }
  },
  cardDescriptionStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.subtitle2),
      color:this.theme.palette.getAccent600()
    }
  },
  rootPageStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.subtitle1),
      color:this.theme.palette.getAccent600()
    }
  },
  currentPageStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.subtitle2),
      color:this.theme.palette.getAccent400(),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  },
  pointerStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.subtitle1),
      color:this.theme.palette.getAccent200()
    }
  },
  footerStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.subtitle2),
      color:this.theme.palette.getAccent500()
    }
  },
  iconStyle:()=>{
    return{
      WebkitMask: `url(${this.rightconURL}) center center no-repeat`,
      background: this.theme.palette.getAccent600(),
      height:"24px",
      width:"24px"
    }
  },
  navigateIconURL:()=>{
    return{
      WebkitMask: `url(${this.navigateconURL}) center center no-repeat`,
      background: this.theme.palette.getAccent600(),
      height: "19px",
      width: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  },
  logoutIoncStyle:()=>{
    return{
      WebkitMask: `url(${this.logoutIconURL}) center center no-repeat`,
      background: this.theme.palette.getAccent(),
      height:"24px",
      width:"24px"
    }
  },
  themeModeIoncStyle:()=>{
    return{
      WebkitMask: `url(${this.themeIconURL}) center center no-repeat`,
      background: this.theme.palette.getAccent(),
      height:"24px",
      width:"24px"
    }
  }
}
}
