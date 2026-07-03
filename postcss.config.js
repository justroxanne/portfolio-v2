export const plugins = {
  "@csstools/postcss-global-data": {
    files: ["./app/media-queries.css"],
  },
  "postcss-preset-env": {
    stage: 0,
    features: {
      "color-functional-notation": false,
      "custom-properties": false,
      "double-position-gradients": false,
      "focus-visible-pseudo-class": false,
      "focus-within-pseudo-class": false,
      "gap-properties": false,
      "hexadecimal-alpha-notation": false,
      "is-pseudo-class": false,
      "nested-calc": false,
      "not-pseudo-class": false,
      "overflow-wrap-property": false,
      "place-properties": false,
      "system-ui-font-family": false,
      "unset-value": false,
    },
  },
};
