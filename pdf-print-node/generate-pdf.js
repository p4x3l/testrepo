const puppeteer = require('puppeteer');

async function generatePdfFromHtml(htmlContent, outputPdfPath) {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content
  await page.setContent(htmlContent);

  const pdfOptions = {
    path: outputPdfPath, // Output file path
    format: 'A4',         // Paper size (A4 in this example)
    printBackground: true, // Include background graphics
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '30mm',   // Added extra space for page number at the bottom
      left: '15mm'
    },
    displayHeaderFooter: true, // Display header and footer
    headerTemplate: `
      <div style=\"overflow: auto; margin: 10px; font-size: 10px;\">
        <span style=\"display:inline-block; color: #B4F678;\">Förhandsgranskning</span>
        <span style=\"display:inline-block; float:right; color: #909090\"><span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `,
    footerTemplate: '', // Footer template for page numbers
    pageRanges: '1-', // Include all pages (or specify ranges)
  };

  // Generate the PDF
  await page.pdf(pdfOptions);

  // Close the browser
  await browser.close();
}

// Example usage
const htmlContent = `
  <html>
    <head>
      <style>
        .page-break { 
          page-break-before: always; /* Force a page break before this element */
          margin-top: 20mm;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 12pt;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to the PDF Example with Page Breaks!</h1>
      <p>This is an example PDF where we have multiple pages and page numbers displayed at the bottom of each page.</p>
      
      <!-- First Page Content -->
      <p>This content will fit on the first page.</p>
      
      <!-- Page Break -->
      <div class="page-break"></div>
      
      <!-- Second Page Content -->
      <h2>Second Page Content</h2>
      <p>This is the second page, after a page break.</p>
      <p>More content on the second page...</p>
      
      <!-- Another Page Break -->
      <div class="page-break"></div>

      <h2>Third Page Content</h2>
      <p>This is the third page, with content following the second page break.</p>
    </body>
  </html>
`;

generatePdfFromHtml(htmlContent, 'output.pdf')
  .then(() => console.log('PDF generated successfully'))
  .catch(err => console.error('Error generating PDF:', err));
