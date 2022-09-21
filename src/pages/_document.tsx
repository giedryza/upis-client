import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />

        <body>
          <Main />

          <div id="alerts" />
          <div id="progress-bar" />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
