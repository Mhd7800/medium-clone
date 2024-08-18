import React from "react";

const  ReadTime = (text)=> {
   
    const wordsPerMinute = 200;
    
    // Count the number of words in the text
    const wordCount = text.split(/\s+/).length;
  
    // Calculate the read time in minutes
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
    // Format the read time as a string
    const readTimeString = `${readTimeMinutes}`;
  
    return readTimeString;
  }
  
  export default ReadTime;