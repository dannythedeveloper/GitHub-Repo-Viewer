const baseUrl = 'https://api.github.com';

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i=0; i < responseJson.length; i++) {
        $('#results-list').append(
        `<li><h3>${responseJson[i].name}</h3>
        <p><a href="${responseJson[i].html_url}">Repo Link</a></p>
        </li>`);
    };
    $('#searchResults').removeClass('hidden');
}

function getSearchResults(userInput) {
    const url = `${baseUrl}/users/${userInput}/repos`;
    console.log(url);
    fetch(url) 
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson));
}

function watchForm() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        const userInput = $('#searchInput').val();
        console.log(userInput);
        getSearchResults(userInput);
    });
};

$(watchForm);