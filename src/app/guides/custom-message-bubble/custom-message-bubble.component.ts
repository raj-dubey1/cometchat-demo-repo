import { Component, Input, OnInit } from '@angular/core';
import { CometChatMessageTemplate, MessageOption, MessageTypes } from 'uikit-library-ang';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'custom-message-bubble',
  templateUrl: './custom-message-bubble.component.html',
  styleUrls: ['./custom-message-bubble.component.scss']
})
export class CustomMessageBubbleComponent implements OnInit {
  @Input() customTextView!:any;

  public user!:CometChat.User;
  sentMessageInputData = {
    thumbnail: false,
    title: false,
    time: true,
    readReceipt: true,
  };
  receivedMessageInputData = {
    thumbnail: true,
    title: true,
    time: true,
    readReceipt: false,
  };
  messageTypes:any = []
  constructor() { }

  ngOnInit(): void {
    console.log(this.customTextView)
    this.messageTypes = [
      new CometChatMessageTemplate({
        type: MessageTypes.text,
        customView: this.customTextView,
        category:"text",
        
    
      })
    ]
    CometChat.getUser("superhero2").then((user:CometChat.User)=>{
      this.user = user

    })
  }
}
