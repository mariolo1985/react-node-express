export const getDefaultPageTemplate = (reactDom) => {
  const page = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Test</title>
      <link href="css/master.min.css" rel="stylesheet">
    </head>
    <body>
      <div class="content">
         <div id="app" class="wrap-inner">
            <!--- magic happens here --> 
            ${reactDom}
         </div>
      </div>
        <script src='js/index.min.js'></script>
    </body>
    </html>
    `;

  return page;
};
