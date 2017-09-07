const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const defaultObject = '/index.html'
const port = process.argv[2] || 3000

const server = http.createServer()
server.on('request', (request, response) => {
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
			response.writeHead(200, header)
			response.write(file, 'binary')
			response.end()
		},
		404() {
			response.writeHead(404, {'Content-Type': 'text/plain'})
			response.write('404 Not Found\n')
			response.end()
		},
		500(err) {
			response.writeHead(500, {'Content-Type': 'text/plain'})
			response.write(err + '\n')
			response.end()
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

	const uri = url.parse(request.url).pathname
	const filename = path.join(process.cwd(), uri)

	fileExists(filename)
})

server.listen(parseInt(port, 10))
console.log('Server running at http://localhost:' + port)
