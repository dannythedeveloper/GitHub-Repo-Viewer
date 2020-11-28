const baseUrl = 'https://api.github.com';

function displayResults(responseJson) {
    console.log(responseJson);    
    $('#error-message').empty();
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
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
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(reponse.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#error-message').text(`Something went wrong: ${error.message}`)
        });
};

function watchForm() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        const userInput = $('#searchInput').val();
        console.log(userInput);
        getSearchResults(userInput);
    });
};

$(watchForm);