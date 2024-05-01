module.exports = {
  presets: [
    ["@babel/preset-env", { targets: "node 14" }], // Tailor the targets as needed
    "@babel/preset-react"
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        runtime: "automatic",
      },
    ],
  ],
};
