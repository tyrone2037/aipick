const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\components\\CardNav.css";
let c = fs.readFileSync(filepath, "utf8");

// Add logo-text style
c = c.replace(
  ".logo { height: 28px; }",
  ".logo { height: 28px; }\n.logo-text {\n  font-size: 20px;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  color: #111;\n}"
);

fs.writeFileSync(filepath, c, "utf8");
console.log("CardNav.css updated");
