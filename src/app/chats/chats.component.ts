import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CometChatLocalize, CometChatTheme, fontHelper, localize } from '@cometchat-pro/angular-ui-kit';
import { CometChatServices } from '../app.service';
@Component({
  selector: 'cometchat-conversations-wrapper',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  @Input() theme = new CometChatTheme({})
  public localize:any = localize
  public logoutIconURL:string="assets/logout.svg";
  public sidebarIconURL:string="assets/sidebar.png";
  public listwrapperIconURL:string="assets/listwrapper.png";
  public listIconURL:string="assets/list.png";
  public conversationIconURL:string="assets/conversation.png";

  constructor(private router: Router,private route: ActivatedRoute,private cometchatService:CometChatServices) { 
    if(this.cometchatService.theme){
      this.theme = this.cometchatService.theme;

    }

  }
  ngOnInit(): void {
  
  } 
  
  redirect(name:string){
    this.cometchatService.theme = this.theme
    this.router.navigate([name]);
//     this.cometchatService.theme = this.theme
//       let navigationExtras: NavigationExtras = {
//       state: {pageName:name}
// };
//   this.router.navigate(['/chats-demo'],navigationExtras);
  }
  // styles
style:any={
  sidebarStyle:()=>{
    return{
      background:this.theme.palette.getSecondary()
    }
  },
  headerTitleStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.heading),
      color:this.theme.palette.getAccent()
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
  footerStyle:()=>{
    return{
      font: fontHelper(this.theme.typography.subtitle2),
      color:this.theme.palette.getAccent500()
    }
  },
  iconStyle:(icon:string)=>{
    return{
      WebkitMask: `url(${icon}) center center no-repeat`,
      background: this.theme.palette.getAccent() ,
      height:"28px",
      width:"fit-content"
    }
  },
  logoutIoncStyle:()=>{
    return{
      WebkitMask: `url(${this.logoutIconURL}) center center no-repeat`,
      background:"black",
      height:"24px",
      width:"24px"
    }
  },
}
}
