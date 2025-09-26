import { parse } from 'node-html-parser'
import fs from 'node:fs';

const url = '<url goes here>'

async function getPageSource(url) {
  try {
    const response = await fetch(url)
    const data = await response.text()
    return data
  } catch (error) {
    console.log(error)
  }
}

function writeToFile(content, filename) {
  fs.writeFile(`${filename}.txt`, content, err => {
    if (err) {
      console.log(err)
    } else {
      console.log('File written successfully')
    }
  })
}

// extract name from url
function getName(url) {
  const hostname = new URL(url).hostname
  return hostname.split('.')[1]
}

// parse page with node-html-parser
function textParser(html) {
  const root = parse(html)
  // remove script and style tags from the DOM
  root.querySelectorAll('script,style,iframe').forEach(el => el.remove());
  // parse innerText and trim whitespace
  let text = root.innerText.trim();
  // remove empty lines
  text = text.split('\n').filter(line => line.trim() !== '').join('\n');
  // return text
  return text
}

const html = await getPageSource(url)
const sourceText = textParser(html)
writeToFile(sourceText, getName(url))

