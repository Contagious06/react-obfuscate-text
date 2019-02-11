# Simple Obfuscate Text from Robots
Inspired by Facebook splitting the "Sponsored" text try bypass adblockers:
![Facebook Sponsored](images/facebook.jpg "Facebook Sponsored")

Instead of adblockers, I figured it could be a good way to make it a little bit harder for basic scrapers to obtain emails, and phone numbers on my website (without converting them to images).

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
