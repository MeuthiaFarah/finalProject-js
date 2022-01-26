(function(){"use strict";var e=require("crypto"),n=require("base64url"),i=require("fs"),r=Date.now(),t=n(e.randomBytes(64));i.appendFile("./config/app.js","\n//UNIX="+r+"\n//APP_KEY="+t,function(e){if(e)throw e}),i.appendFile(".env","\n#UNIX="+r+"\n#APP_KEY="+t,function(e){if(e)throw e;process.exit(0)})}).call(this);

//UNIX=1643032109794
//APP_KEY=lnb6y4DJ2RrDrblkW6s58JsxwIjWOX1K7bnIBHOlT3EFJ9wH8GIvHMxjqpDxc8iz4nKw9DwbaXAnaCl_CLvovQ