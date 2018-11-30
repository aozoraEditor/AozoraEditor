const fs = require('fs');
const puppeteer = require('puppeteer');

function previewHTML(html, isVertical = false) {
    htmltext = html.replace(/<(.+?)id=\"(editor|btn)\"(()|(.+?))>(()|(.+?))<\/(.+?)>/g, '');
    htmltext = htmltext.replace(/<script(()|(.+?))>((.|\0|\n)+?)<\/script>/g, '');
    fs.writeFile('preview.html', "<html>" + htmltext + "</html>", (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log(err, "save preview.html");
        }
    });

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        //await page.setContent(htmltext);
        //        await page.goto("data:text/html;charset=UTF-8, <html>" + htmltext + "</html>", { waitUntil: 'networkidle2', timeout: 100000 });
        const session = await page.target().createCDPSession();
        await page.goto('file://' + __dirname + "/preview.html", { waitUntil: ['networkidle0'] });
        await session.send('DOM.enable');
        await session.send('CSS.enable');
        session.on('CSS.fontsUpdated', () => {
            console.log("udpate fonts");
        });
        await page.evaluateHandle('document.fonts.ready');
        await page.pdf(
            {
                path: "output.pdf",
                format: "A4",
                landscape: isVertical,
                margin: {
                    top: "1cm",
                    bottom: "1.5cm",
                },
                // preferCssPageSize: true
            });
        await browser.close();
    })();

}
