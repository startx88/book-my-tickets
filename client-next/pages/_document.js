import Documdent, { Head, Main, NextScript } from 'next/document'

class MyDocument extends Documdent {
    render() {
        return (
            <html>
                <Head>
                    <title>Book my tickets</title>
                    <meta name="description" content="A ticket booking site" />
                    <meta charSet="utf-8" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet" />
                </Head>
                <body>

                    <Main />

                    <NextScript />
                </body>
            </html>
        );
    }
}

export default MyDocument;