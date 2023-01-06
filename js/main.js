document.addEventListener('DOMContentLoaded', function() {

  var table = document.querySelector('#table > tbody');

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText);
      var hiddenKeys = ['_id', 'phone', 'email'];

      var button = document.getElementById('button');

      button.addEventListener('click', addRow);

      for (var i = 0; i < data.length; i++) {
        // console.log(data[i]);
        var tr = document.createElement('tr');
        var checkboxTD = document.createElement('td');
        var checkbox = document.createElement('input');

        tr.setAttribute('id', data[i]['_id']);

        checkbox.setAttribute('type', 'checkbox');
        checkboxTD.appendChild(checkbox);
        tr.appendChild(checkboxTD);

        for (let key in data[i]) {
          // if (key === '_id' || key === 'phone' || key === 'email') {
          if (hiddenKeys.indexOf(key) !== -1) {
            continue;
          }
          var td = document.createElement('td');
          td.innerText = data[i][key];
          tr.appendChild(td);
        }

        var edit = document.createElement('a');
        var hrefDel = document.createElement('a');
        var td = document.createElement('td');

        edit.className = 'icon-inner';
        edit.innerHTML = '<ion-icon name="create"></ion-icon>';

        hrefDel.className = 'icon-inner';
        hrefDel.innerHTML = '<ion-icon name="close-circle"></ion-icon>';

        edit.setAttribute('href', '#');
        hrefDel.setAttribute('href', '#');

        // modal
        var modal = document.getElementById('myButton');
        var span = document.getElementsByClassName('close')[0];

        edit.onclick = function() {
          event.preventDefault();
          console.log('Hi');
          modal.style.display = 'flex';
        };
        span.onclick = function() {
          modal.style.display = 'none';
        };
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = 'none';
          }
        };

        const dataUnit = data[i];

        hrefDel.addEventListener('click', function(event) {
          deleteRow(event, dataUnit['_id']);
        });

        // hrefDel.setAttribute('onclick', "function (event) { deleteRow(event, '" + data[i]._id + "'); }");
        td.appendChild(edit);
        td.appendChild(hrefDel);
        tr.appendChild(td);
        table.appendChild(tr);
      }
    }
  };

  xmlhttp.open('GET', 'data.json');

  xmlhttp.send();
});

function generateId() {
  return (+new Date).toString(16);
}

function addRow() {
  /*var newTxt = document.querySelector('.logo');
  console.log(newTxt);
  newTxt.innerHTML = 'New TEXT';*/
  // console.log('addRow');

  var company = document.getElementById('company').value;
  var contact = document.getElementById('contact').value;
  var address = document.getElementById('address').value;

  if (company === '' || contact === '' || address === '') {
    alert('Введите что нибудь');
    return;
  }

  let table = document.querySelector('#table > tbody');
  let tr = document.createElement('tr');
  let td0 = document.createElement('td');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let input = document.createElement('input');

  input.setAttribute('type', 'checkbox');
  var edit = document.createElement('a');
  var hrefDel = document.createElement('a');
  var td = document.createElement('td');

  edit.className = 'icon-inner';
  edit.innerHTML = '<ion-icon name="create"></ion-icon>';

  hrefDel.className = 'icon-inner';
  hrefDel.innerHTML = '<ion-icon name="close-circle"></ion-icon>';

  let gId = generateId();
  hrefDel.addEventListener('click', function(event) {
    deleteRow(event, gId);
  });

  edit.setAttribute('href', '#');
  var modal = document.getElementById('myButton');
  var span = document.getElementsByClassName('close')[0];

  edit.onclick = function() {
    event.preventDefault();
    console.log('Hi');
    modal.style.display = 'flex';
  };
  span.onclick = function() {
    modal.style.display = 'none';
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  hrefDel.setAttribute('href', '#');
  td.append(edit);
  td.append(hrefDel);

  td0.append(input);
  td1.append(company);
  td2.append(contact);
  td3.append(address);

  tr.append(td0);
  tr.append(td1);
  tr.append(td2);
  tr.append(td3);
  tr.append(document.createElement('td'));
  tr.append(document.createElement('td'));
  tr.append(td);
  tr.setAttribute('id', gId);
  table.prepend(tr);
}

function deleteRow(event, id) {
  event.preventDefault();
  var row = document.getElementById(id);
  var table = document.querySelector('#table > tbody');

  table.removeChild(row);
}


