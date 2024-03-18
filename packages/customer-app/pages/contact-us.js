import * as React from "react";

export default function ContactUs() {
  //TODO try to write this code in pure reactjs
  let body = `<body>
  <style type="text/css">
    html {
      overflow: auto;
    }

    html,
    body,
    div,
    iframe {
      margin: 0px;
      padding: 0px;
      height: 100%;
      border: none;
    }

    iframe {
      display: block;
      width: 100%;
      border: none;
      overflow-y: auto;
      overflow-x: hidden;
    }
  </style>
  <!-- This seems to work. Open the mobile view and then open this page -->
  <iframe src="https://blog.myava.in/hidden-contact-us/" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="100%"
    scrolling="auto">
  </iframe>
</body>`;
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
