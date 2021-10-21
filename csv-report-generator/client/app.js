// document.getElementById('submitBtn').addEventListener('click', (event) => {
//   let value = document.getElementById('textarea').value;
//   axios.post('/upload_json', JSON.parse(value))
//     .then((res) => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     })
// })

// prevent default submit
// clear the input field

$('form').on('submit', (event) => {
  event.preventDefault();
  let value = $('#textarea').val();
  $('#textarea').val('Enter JSON here...');

  axios.post('/upload_json', JSON.parse(value))
    .then((res) => {
      console.log('got it');
      console.log(res.data);
      var href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(res.data);
      $('#downloadBtn').wrap(`<a href=${href} download='report.csv'></a>`);
    })
    .catch(err => {
      console.error(err);
    })
});