# Firestore Adapter

When using the Google APIs `googleapis` to get data from Firestore, the data comes back in a typed format instead of what you would expect to receive.

## Installation

Add the package with `npm`:

```
npm i --save firestore-adapter
```

## Functionality

When using some Google APIs to get data from Firestore, the response data comes back typed and is not compatible with other Firebase APIs. The values returned from the database look like this, for example:

```js
[ 
  { 
    city: { stringValue: 'WASHINGTON' },
    has_subseccd: { booleanValue: true },
    have_extracts: { nullValue: null },
    score: { doubleValue: 523.3892 },
    have_pdfs: { nullValue: null },
    subseccd: { integerValue: '3' },
  },
]
```

This package converts the data into a format that you'd expect. Namely: 

```js
[
  { city: 'WASHINGTON',
    has_subscribed: true 
    ...
  }
]
```

## Usage 

