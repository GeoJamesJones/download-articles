const fs = require('fs');
const request = require('sync-request');
const extractor = require('unfluff');
const path = require('path')


const get = async (options) => {
    return new Promise((resolve, reject) => {
      request.get(options, (error, response, body) => {
        if (error) return reject(error)
  
        return resolve({ body, response })
      })
    })
  };

const get_articles = async () => {
    try {  
        let datas = fs.readFileSync('links.txt', 'utf8')
            .toString()
            .split('\n')
            .forEach(line => {
                try {
                    let split_line = line.split(',')
                    let link = split_line[0]
                    let document = split_line[1].split(".")[0] + '.json'
    
                    let res = request('GET', link)
                    let body = res.getBody()
    
                    let data = extractor(body, 'en');
    
                    out_file = path.join('./articles', document)
                    console.log(out_file)
    
                    fs.writeFileSync(out_file, JSON.stringify(data), { mode: 0o755 });

                } catch (err) {
                    console.log(err)
                }

        });;
          
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

get_articles()