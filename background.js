chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { interest, personality } = request;

    // Generate a tweet suggestion based on interest and personality
    let tweet = generateTweet(interest, personality);

    console.log("hellom 1235", request, tweet)

    // Save the tweet in storage
    chrome.storage.local.set({ tweet });
});

function generateTweet(interest, personality) {
    // Example logic to generate a tweet
    if (interest === 'tech' && personality === 'professional') {
        return "Stay ahead with the latest in tech! #innovation #technews";
    } else if (interest === 'fashion' && personality === 'casual') {
        return "Rock that style! What's your fashion pick today? #OOTD #fashion";
    }
    // Add more combinations as needed
}


chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
  });