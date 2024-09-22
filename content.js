// Add a DOMContentLoaded event listener to ensure the script runs after the page's content is fully loaded
console.log('content.js file ruunig 123');

function fillTweetBox() {
  //   const tweetBox = document.querySelector(
  //     'div[aria-label="Post text"][role="textbox"]'
  //   );

  //   if (tweetBox) {
  //     tweetBox.focus(); // Ensure the tweet box is focused
  //     document.execCommand('insertText', false, 'Hi, my name is Vikram');
  //   }

    const tweetBox = document.querySelector('br[data-text="true"]')
    console.log(tweetBox)
  // console.log({tweetBox}, "line 6")

  // if (tweetBox && tweetBox.innerText === "") {
  //   tweetBox.innerText = "Hi, my name is Vikram";
  // }

//   const tweetBox = document.querySelector(
//     'div[aria-label="Post text"][role="textbox"]'
//   );

  if (tweetBox) {
    // tweetBox.focus(); // Ensure the tweet box is focused

    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
      data: 'Hi, my name is Vikram',
    });

    tweetBox.textContent = 'Hi, my name is Vikram';
    tweetBox.dispatchEvent(inputEvent);
  }

//   tweetBox.innerText = 'Hi, my name is Vikram';
}

const observer = new MutationObserver(() => {
  fillTweetBox();
});

observer.observe(document.body, { childList: true, subtree: true });

// Attempt to fill the tweet box immediately in case it's already available
fillTweetBox();

document.addEventListener('DOMContentLoaded', function () {
  console.log('Content script is running after DOM content loaded.');

  // Listen for messages from the background or popup scripts
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Content script is running');
    if (request.action === 'fillTweet') {
      console.log('Received message in content script:', request);

      // Insert your tweet into the input box
      chrome.storage.local.get('tweet', (data) => {
        let tweetInput = document.querySelector('div[data-offset-key]');
        console.log({ tweetInput });
        if (tweetInput) {
          tweetInput.innerHTML = ''; // Clear existing text
          let spanElement = document.createElement('span');
          spanElement.setAttribute(
            'data-offset-key',
            tweetInput.getAttribute('data-offset-key')
          );

          let innerSpan = document.createElement('span');
          innerSpan.setAttribute('data-text', 'true');
          innerSpan.textContent = data.tweet || 'Generated tweet text here';

          spanElement.appendChild(innerSpan);
          tweetInput.appendChild(spanElement);

          console.log('Tweet input filled with:', data.tweet);
        } else {
          console.error('Tweet input element not found.');
        }
      });
    }
  });
});
