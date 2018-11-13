// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

document.addEventListener('DOMContentLoaded', function() {
  const domains = document.querySelector('.domains');
  
  program.init(domains);
});


const program = (() => {
  let domains;

  function displaydoma(domainsList){
    if (domainsList.length == 0) {
      displayError('Fann ekki domain');
      return;
    }

    const [{
      domain,
      registrantname,
      address,
      country,
      email,
      registered,
      expires,
      lastChange
    }] = domainsList;

    const dl = document.createElement('dl');
/////////////////////
    const len = document.createElement('dt');
    len.appendChild(document.createTextNode('lén'));
    dl.appendChild(len);

    const factoryvalueelement = document.createElement('dd');
    factoryvalueelement.appendChild(document.createTextNode(domain));
    dl.appendChild(factoryElement);
/////////////////////
    const len = document.createElement('dt');
    len.appendChild(document.createTextNode('Nafn Eiganda'));
    dl.appendChild(len);

    const factoryvalueelement = document.createElement('dd');
    factoryvalueelement.appendChild(document.createTextNode(registrantname));
    dl.appendChild(factoryElement);
/////////////////////
    const len = document.createElement('dt');
    len.appendChild(document.createTextNode('Heimilsfang'));
    dl.appendChild(len);

    const factoryvalueelement = document.createElement('dd');
    factoryvalueelement.appendChild(document.createTextNode(address));
    dl.appendChild(factoryElement);

/////////////////////
    const len = document.createElement('dt');
    len.appendChild(document.createTextNode('Lamd'));
    dl.appendChild(len);

    const factoryvalueelement = document.createElement('dd');
    factoryvalueelement.appendChild(document.createTextNode(country));
    dl.appendChild(factoryElement);
/////////////////////
    const len = document.createElement('dt');
    len.appendChild(document.createTextNode('E-mail'));
    dl.appendChild(len);

    const factoryvalueelement = document.createElement('dd');
    factoryvalueelement.appendChild(document.createTextNode(email));
    dl.appendChild(factoryElement);
    
/////////////////////
    const len = document.createElement('dt');
    len.appendChild(document.createTextNode('Skráningar dagur'));
    dl.appendChild(len);

    const factoryvalueelement = document.createElement('dd');
    factoryvalueelement.appendChild(document.createTextNode(registered));
    dl.appendChild(factoryElement);
/////////////////////
    const len = document.createElement('dt');
    len.appendChild(document.createTextNode('Rennur út'));
    dl.appendChild(len);

    const factoryvalueelement = document.createElement('dd');
    factoryvalueelement.appendChild(document.createTextNode(expires));
    dl.appendChild(factoryElement);
/////////////////////
    const len = document.createElement('dt');
    len.appendChild(document.createTextNode('Seinsta breyting'));
    dl.appendChild(len);

    const factoryvalueelement = document.createElement('dd');
    factoryvalueelement.appendChild(document.createTextNode(lastChange));
    dl.appendChild(factoryElement);

    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(dl);

  }

  function displayError(error){
    const container = domains.querySelector('.results');

    while(container.firstChild){
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));

  }

  function fetchData(link) {
    fetch(`${API_URL}${link}`)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } 

      throw new Error('Villa kom upp');
        })

        .then((data) => {
          displaydoma(data.results);
        })


    .catch((error) => {
      //Todo villumeðh
      displayError('villa')
      console.error(error);
    })

  }


  function onSubmit(e){
    e.preventDefault();
    const input = e.target.querySelector('input');
    
    //TODO höndla tómanstreng

    fetchData(input.value);
  }


  function init(_domains) {
    domains = _domains;

    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();


