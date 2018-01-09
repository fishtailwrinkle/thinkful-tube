const YOUTUBE_V3_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
	const query = {
		q: `${searchTerm}`,
		part: "snippet",
		maxResults: '25',
		key: "AIzaSyD6FHlcO9xpjSXFyQMsp5DyiuylLVeyJck"
	}
	$.getJSON(YOUTUBE_V3_SEARCH_URL, query, callback);

}

function renderResult(result) {
	console.log(`${result.channelId}`);
	//	<p>Next Page Token: ${result.etag}</p>


	if (`${result.id.kind}` === "youtube#channel") {
		return `
			<div class="rowContainer ">
				<div class="thumbnails">
					<a href="https://www.youtube.com/channel/${result.id.channelId}"><img alt="Youtube channel thumbnail" src=${result.snippet.thumbnails.medium.url}></a>
				</div>
				<div class="description">
					<span>${result.snippet.description}</span>
				</div>
			</div>
		`;
	} else if (`${result.id.kind}` === "youtube#video") {
		return `
			<div class="rowContainer">
				<div class="thumbnails">
					<a href="https://www.youtube.com/watch?v=${result.id.videoId}"><img alt="Youtube video thumbnail for ${result.snippet.title}" src=${result.snippet.thumbnails.medium.url}></a>
				</div>	
				<div class="description">
					<span><h4>${result.snippet.title}</h4></span>
					<span>${result.snippet.description}</span>
				</div>
			</div>
		`;
	}
}

function displayYoutubeSearchData(data) {

	const results = data.items.map((item, index) => renderResult(item));
	
	$('.js-search-results').html(results);
}

function watchSubmit() {
	console.log(`watchSubmit running~`);

	$('.js-search-form').submit(event => {
		console.log(`Submit clicked!`);
		event.preventDefault();
		const queryTarget = $(this).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getDataFromApi(query, displayYoutubeSearchData);
	});



}

$(watchSubmit);