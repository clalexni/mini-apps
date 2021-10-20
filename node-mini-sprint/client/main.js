$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  function getQuote(successCB){
    //YOUR CODE HERE, Add a GET request
    $.ajax({
      url: 'http://127.0.0.1:3000/quote',
      method: 'GET',
      ContentType: 'application/json',
      success: successCB || function(res) {
        console.log(res);
      },
      error: function(res) {
        console.log('Error getting things: ', res);
      }
    });
  }

  function addQuote(quote, successCB, errorCB){
    //YOUR CODE HERE, Add a POST request
    $.ajax({
      url: 'http://127.0.0.1:3000/quote',
      method: 'POST',
      data: JSON.stringify({quote: quote}),
      ContentType: 'application/json',
      success: successCB || function(res) {
        console.log('successful post', res);
      },
      error: errorCB || function(data) {
        console.log('failed to post', data);
      }
    }
    );
  }
});
