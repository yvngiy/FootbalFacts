const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;

const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    envLines.forEach((line) => {
        const [name, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        if (name && value && !name.startsWith('#')) {
            process.env[name.trim()] = value;
        }
    });
}

const port = Number(process.env.PORT || 5500);
const apiKey = process.env.THESPORTSDB_API_KEY || '3';
const apiUrl = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnextleague.php?id=4328`;

const contentTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
};

function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(data));
}

async function handleMatches(response) {
    try {
        const apiResponse = await fetch(apiUrl);
        if (!apiResponse.ok) {
            throw new Error(`TheSportsDB returned ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        sendJson(response, 200, data);
    } catch (error) {
        console.error('Błąd API meczów:', error.message);
        sendJson(response, 502, { error: 'Nie udało się pobrać terminarza.' });
    }
}

function serveFile(requestPath, response) {
    const cleanPath = requestPath === '/' ? '/index.html' : requestPath;
    const filePath = path.resolve(root, `.${cleanPath}`);

    if (!filePath.startsWith(root)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, file) => {
        if (error) {
            response.writeHead(error.code === 'ENOENT' ? 404 : 500);
            response.end('Not found');
            return;
        }

        const extension = path.extname(filePath);
        response.writeHead(200, {
            'Content-Type': contentTypes[extension] || 'application/octet-stream',
        });
        response.end(file);
    });
}

const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);

    if (requestUrl.pathname === '/api/matches') {
        handleMatches(response);
        return;
    }

    serveFile(requestUrl.pathname, response);
});

server.listen(port, () => {
    console.log(`FootballFacts działa na http://localhost:${port}`);
});