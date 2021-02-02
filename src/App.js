import './App.scss';
import React from "react";
import $ from 'jquery';

function App() {
  return (
    <div className="App">
      <Quote/>
    </div>
  );
}

export default App;

class Quote extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      quote: '',
      author: '',
      tweetLink: ''
    }
    
    this.getQuote = this.getQuote.bind(this);
    this.getQuote();
  }

  getQuote(){
  
    $.ajax({
      headers: {
        Accept:'application/json'
      },
      url: 'https://goquotes-api.herokuapp.com/api/v1/random?count=1',
      success: (jsonQuotes) => {
        if(jsonQuotes.status === 200 && jsonQuotes.count === 1){
  
          let newQuote = {
            quote: jsonQuotes.quotes[0].text,
            author: jsonQuotes.quotes[0].author
          };
          
          this.setState(() => ({
            quote: newQuote.quote,
            author: newQuote.author,
            tweetLink: 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + 
            encodeURIComponent('"' + newQuote.quote + '" ' + newQuote.author)          
          }));
          
        }
      }
    });
    
  };

  render(){
    return(
      <div id="quote-box">
        <div id="text"><i className="fa fa-quote-right"></i><span>{this.state.quote}</span><i className="fa fa-quote-left"></i></div>
        <div id="author">{this.state.author}</div>
        <div id="btn-container">
          <button id="new-quote" onClick={this.getQuote}>New quote</button>
          <a id="tweet-quote" title="Tweet quote" target="_top" href={this.state.tweetLink}><i className="fa fa-twitter"></i></a>
        </div>
      </div>
    );
  }
}
