# Simple Obfuscate Text from Robots
Inspired by Facebook splitting up the "Sponsored" text to try bypass adblockers:
![Facebook Sponsored](images/facebook.jpg "Facebook Sponsored")

Instead of adblockers, this is actually a decent way of making it a little bit harder for basic scrapers to obtain emails and phone numbers a website. Without converting them to images and still allowing the user to copy the content.

# Usage

```
npm install react-obfuscate-text --save
```

```
import ObfuscateText from "react-obfuscate-text";

const MyComp = () => {
  return <ObfuscateText text="this@is.email" />;
}
```
