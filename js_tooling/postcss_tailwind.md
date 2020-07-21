# Using postcss 

## with tailwind

```
tailwindcss autoprefixer postcss-cli
```

```
// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')({

  // Specify the paths to all of the template files in your project 
  content: [
    './src/**/*.js',
    './public/index.html',
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}
```

```
// tailwind.config.js
module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
}
```

```
/* src/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```
// package.json
{
  //...
  "scripts": {
    //... place these after the four scripts created by CRA
    "build:styles": "postcss src/tailwind.css -o src/styles.css", 
    "prebuild": "yarn build:styles",
    "prestart": "yarn build:styles"
  }
}
```

```
npm install @fullhuman/postcss-purgecss
```