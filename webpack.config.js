module.exports = {

  // This is the entry point or start of our react applicaton
  entry: "./dev/app/app.js",

  // The plain compiled Javascript will be output into this file
  output: {
    filename: "public/bundle.js"
  },

  // This section desribes the transformations we will perform
  module: {
    loaders: [
      {
        // Only working with files that in in a .js or .jsx extension
        test: /\.js?$/,
        loader: "babel-loader",
        //only include files in the dev folder
        include: /dev/,
        query: {
          // These are the specific transformations we'll be using.
          presets: ["es2015","react"]
        }
      }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "eval-source-map"
};
