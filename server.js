const url = require('url')
const path = require('path')
const fs = require('fs')

const defaultObject = '/index.html'
const port = process.env.PORT || 3000

require('http').createServer((req, res) => {
	const Response = {
		200(file, filename) {
			const header = {
				'Access-Control-Allow-Origin': '*',
				Pragma: 'no-cache',
				'Cache-Control': 'no-cache'
			}
			if (/.+\.svg/.test(filename)) {
				header['Content-Type'] = 'image/svg+xml'
			}
			if (/.+\.html/.test(filename)) {
				header['Content-Type'] = 'text/html'
			}
			if (/.+\.css/.test(filename)) {
				header['Content-Type'] = 'text/css'
			}
			if (/.+\.js/.test(filename)) {
				header['Content-Type'] = 'application/javascript'
			}
			if (/.+\.json/.test(filename)) {
				header['Content-Type'] = 'application/json'
			}
			res.writeHead(200, header)
			res.write(file, 'binary')
			res.end()
		},
		404() {
			res.writeHead(404, {'Content-Type': 'text/plain'})
			res.write('404 Not Found\n')
			res.end()
		},
		500(err) {
			res.writeHead(500, {'Content-Type': 'text/plain'})
			res.write(err + '\n')
			res.end()
		}
	}
	const fileExists = filename => {
		fs.exists(filename, exists => {
			if (!exists) {
				fileExists(process.cwd() + defaultObject)
				return
			}
			if (fs.statSync(filename).isDirectory()) {
				filename += defaultObject
			}

			fs.readFile(filename, 'binary', (err, file) => {
				if (err) {
					Response['500'](err)
					return
				}
				Response['200'](file, filename)
			})
		})
	}

	const uri = url.parse(req.url).pathname
	const filename = path.join(process.cwd(), uri)

	fileExists(filename)
}).listen(port)

console.log('Server running at http://localhost:' + port)
