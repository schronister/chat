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


  sendChat(){
    console.log(this.state.message)
    let mentions = [];
    let emoticons = [];
    let links = [];
    let message = this.state.message;
    //parse mentions
    for (var i = 0; i < message.length; i++){
      if(message.charAt(i) === "@"){
        mentions.push(message.substring(i+1).split(" ")[0])
      } else if (message.charAt(i) === "("){
        //find the end parenthesis, make sure it's not more than 15 chars
        if (message.indexOf(")",i+1) > 0 && message.indexOf(")", i+1) < i+17){
          emoticons.push(message.substring(i+1,message.indexOf(")",i+1)))
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
            console.log('got this', response)
            pageTitle = response.data;
            links.push({url:url,title:pageTitle});
            let current = this.state.parsedMessage;
            current.links = links;
            this.setState({parsedMessage:current})

          }.bind(this))
       

      }
    }
    this.setState({parsedMessage:{mentions:mentions, emoticons:emoticons, links:links}})
  }


  handleChange(event) {
    this.setState({message: event.target.value});
  }



  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="renderWindow">
          {this.state.parsedMessage &&
            <div>
            <h3>Message details:</h3>
            {JSON.stringify(this.state.parsedMessage)}
            </div>
          }
          </div>

          <div className="chatBox">
            <div className="inputBoxContainer">
            <input id="inputBox"  onChange={this.handleChange}  type="text" placeholder="Enter your message here..."/>
            </div>
            <button className="submitButton"value={this.state.message} onClick={this.sendChat}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

