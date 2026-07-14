const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\components\\CardNav.tsx";
let c = fs.readFileSync(filepath, "utf8");

// Replace the logo section to show AIPick text when no logo
c = c.replace(
  "{logo && <img src={logo} alt={logoAlt} className=\"logo\" />}",
  "{logo ? <img src={logo} alt={logoAlt} className=\"logo\" /> : <span className=\"logo-text\">{logoAlt}</span>"
);

// Add .logo-text style - we will add it to CSS
fs.writeFileSync(filepath, c, "utf8");
console.log("CardNav.tsx updated");
