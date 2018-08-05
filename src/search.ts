import * as S from '@eyedea/syncano'
import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

interface Args {
  postCode: string
}

class Endpoint extends S.Endpoint<Args> {
  counties: object
  async run(
    {logger}: S.Core,
    {args}: S.Context<Args>
  ) {
    const {info} = logger('search')

    info('getCountries')
    this.getCountries()
    info('search')
    await this.search(args.postCode)
  }

  getCountries () {
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
    this.counties = counties
  }

  async search (postCodeToSearch: string) {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(path.join(__dirname, 'codes.txt'), {encoding: 'utf-8'})
      const lineReader = readline.createInterface({
        input: readStream,
        output: null,
      })

      let result = null
      lineReader.on('line', (line) => {
        const [postCode, city, municipalityId, municipality, category] = line.split('\t')
        if (postCode === postCodeToSearch) {
          result = {
            city: this.toTitleCase(city),
            municipality: this.toTitleCase(municipality),
            county: this.counties[municipalityId.slice(0, 2)],
            category,
          }
        }
      })

      lineReader.on('close', () => {
        if (result) {
          this.syncano.response.success(result)
        } else {
          this.syncano.response.notFound({'message': 'Post code not found!'})
          reject()
        }
        resolve()
      })
    })
  }

  toTitleCase (str: string) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  }
}

export default ctx => new Endpoint(ctx)
