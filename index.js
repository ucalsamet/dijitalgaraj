import axios from "axios";
import md5 from "blueimp-md5";

var email;
var hash;
const guid = { GUID: "429c2edf-601d-4e85-96fe-6d21ed4a1f83" };

await axios
  .put("http://career.dijitalgaraj.com/hash/samet-ucal-79817", guid)
  .then((response) => {
    email = response.data.email;
    hash = response.data.hash;
  });

var hashArray = [];
for (var i = 0; i < hash.length; i += 32) {
  hashArray.push(hash.substring(i, i + 32));
}

var characters = [];
for (var i = 33; i < 127; i++) {
  characters.push(String.fromCharCode(i));
}

var temp = "";
var randomCharacters = "";
var hashCount = 0;
var randomMd5;
for (var i = 0; i < characters.length; i++) {
  for (var j = 0; j < characters.length; j++) {
    randomCharacters = characters[i] + characters[j];
    randomCharacters = temp + randomCharacters;
    randomMd5 = md5(md5(email) + randomCharacters + md5(randomCharacters));
    if (randomMd5 == hashArray[hashCount]) {
      temp = randomCharacters;
      i = 0;
      hashCount++;
    }
  }
}

console.log("Bulunan Mail: " + temp);
