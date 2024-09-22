document.getElementById("generateTweet").addEventListener("click", function() {
    const interest = document.getElementById("interest").value;
    const personality = document.getElementById("personality").value;

    console.log("Sending message to background script:", { interest, personality });

    // Send interest and personality to background script
    chrome.runtime.sendMessage({ interest, personality });

    // Query the active tab and send the message only if the content script is running
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        console.log("Active tab URL:", activeTab.url);
        if (activeTab.url && activeTab.url.includes("https://www.x.com/")) {
            chrome.tabs.sendMessage(activeTab.id, { action: "fillTweet" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message:", chrome.runtime.lastError.message);
                } else {
                    console.log("Message sent successfully to content script.");
                }
            });
        } else {
            console.log("Content script not running on this page.");
        }
    });
});
