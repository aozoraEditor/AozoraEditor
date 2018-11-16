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
        await page.goto('file://' + __dirname + "/preview.html");
        await page.evaluateHandle('document.fonts.ready');
        await page.pdf(
            {
                path: "output.pdf",
                format: "A4",
                landscape: isVertical,
                margin: {
                    top: "1cm",
                    bottom: "1.5cm",
                    right: "3cm",
                    left: "3cm"
                },
                preferCssPageSize: true
            });
        await browser.close();
    })();

}
