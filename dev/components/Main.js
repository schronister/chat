import React, { Component } from 'react';
import cheerio from 'cheerio';
import axios from 'axios';
import request from 'request';

export default class Main extends Component {
   constructor(props) {
    super(props);
    this.sendChat = this.sendChat.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {message:"", parsedMessage:null}
  }

  componentDidMount(){
    //allow return key to send chat
    document.getElementById('inputBox').onkeydown = function(e){
     if(e.keyCode == 13){
       this.sendChat();
     }
    }.bind(this);
  }

  sendChat(){
    let mentions = [];
    let emoticons = [];
    let links = [];
    let message = this.state.message;
    //parse mentions
    for (var i = 0; i < message.length; i++){
      if(message.charAt(i) === "@"){
        //don't get empty @
        if (message.substring(i+1).split(/\b/)[0].length >0){
            //split on the non-word character, grab first index
            mentions.push(message.substring(i+1).split(/\b/)[0])
        }
      } else if (message.charAt(i) === "("){
        //find the end parenthesis, make sure it's not more than 15 chars
        if (message.indexOf(")",i+1) > 0 && message.indexOf(")", i+1) < i+17){
            //make sure all alphanumeric in substring
            if (message.substring(i+1,message.indexOf(")",i+1)).match(/^[a-zA-Z0-9]*$/)){
                emoticons.push(message.substring(i+1,message.indexOf(")",i+1)))
            }
        }
      } else if (message.substring(i, i+4) === "http"){
        let url = message.substring(i).split(" ")[0];
        let pageTitle = ""
        //get the page data for the title
        axios({
            method: "GET",
            url: "/scrape",
            params: {
              url: url
            },
          }).then(function(response){
            pageTitle = response.data;
            links.push({url:url,title:pageTitle});
            let current = this.state.parsedMessage;
            current.links = links;
            this.setState({parsedMessage:current, message:""})
          }.bind(this))
      }
    }
    this.setState({parsedMessage:{mentions:mentions, emoticons:emoticons, links:links}, message:""})
  }


  handleChange(event) {
    this.setState({message: event.target.value});
  }



  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="renderWindow">
          {this.state.parsedMessage?
            <div style={{textAlign:'center', marginTop:'50px'}}>
            <h4>Message details:</h4>
            {JSON.stringify(this.state.parsedMessage)}
            </div>
            :
            <div style={{textAlign:'center', marginTop:'50px'}}>
            <h4>Welcome to HippieChat*</h4>
            <p style={{fontSize:'0.6em'}}>*No hippies were harmed in the creation of this app</p>
            </div>
          }
          </div>

          <div className="chatBox">
            <div className="inputBoxContainer">
            <input id="inputBox" value={this.state.message}  onChange={this.handleChange}  type="text" placeholder="Enter your message here..."/>
            </div>
            <button className="submitButton waves-effect waves-light btn" onClick={this.sendChat}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

