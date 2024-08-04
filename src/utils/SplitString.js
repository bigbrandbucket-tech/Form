export const splitString = (str, maxLength) => {
    const words = str.split(' ');
    let result = '';
    let line = '';
  
    words.forEach(word => {
      if ((line + word).length > maxLength) {
        result += line.trim() + '\n';
        line = word + ' ';
      } else {
        line += word + ' ';
      }
    });
  
    result += line.trim();
    return result;
  };