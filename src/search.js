import fs from 'fs'
import path from 'path'
import readline from 'readline'
import Syncano from 'syncano-server'

export default (ctx) => {
  const {response} = Syncano(ctx)

  const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

  // Parsing counties file
  const countiesFile = fs.readFileSync(path.join(__dirname, 'counties.csv'), {encoding: 'utf-8'})
  const counties = {}
  countiesFile.split('\n').forEach(line => {
    const splittedLine = line.replace(/"/g, '').split(';')
    if (splittedLine.length > 3) {
      const countyCode = splittedLine[0]
      const countyName = splittedLine[3]
      counties[countyCode] = countyName
    }
  })

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path.join(__dirname, 'codes.txt'), {encoding: 'utf-8'})
    const lineReader = readline.createInterface({
      input: readStream,
      output: null
    })

    let result = null
    lineReader.on('line', (line) => {
      const [postCode, city, municipalityId, municipality, category] = line.split('\t')

      if (postCode === ctx.args.post_code) {
        result = {
          city: toTitleCase(city),
          municipality: toTitleCase(municipality),
          county: counties[municipalityId.slice(0, 2)],
          category
        }
      }
    })

    lineReader.on('close', () => {
      if (result) {
        response.success(result)
      } else {
        response.notFound({'message': 'Post code not found!'})
      }
      resolve()
    })
  })
}
