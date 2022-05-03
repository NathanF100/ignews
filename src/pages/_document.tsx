import Document, { Html, Head, Main, NextScript } from "next/document";

// Simula o index.html de um app create-react-app
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* Main é a div com id #root */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
