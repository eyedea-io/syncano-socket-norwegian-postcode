import fs from 'fs'
import path from 'path'
import readline from 'readline'
import Syncano from 'syncano-server'

export default (ctx) => {
  const {response} = Syncano(ctx)

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path.join(__dirname, 'codes.txt'), {encoding: 'utf-8'})
    const lineReader = readline.createInterface({
      input: readStream,
      output: null
    })

    lineReader.on('line', (line) => {
      const [postCode, city, municipalityId, municipality, category] = line.split('\t')

      if (postCode === ctx.args.post_code) {
        response.json({
          city: city,
          municipality_id: municipalityId,
          municipality,
          category
        })
        resolve()
      }
    })

    lineReader.on('close', () => {
      response.json({'message': 'Post code not found!'}, 404)
      resolve()
    })
  })
}
