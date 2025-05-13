import type { Template } from "@/types/template"

export function generateEmailHtml(template: Template): string {
  const { elements } = template

  const styles = `
  :root {
    --background: #ffffff;
    --foreground: #000000;
    --border: #e5e7eb;
  }
  
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    color: var(--foreground);
  }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: var(--background);
  }
  .content {
    padding: 20px;
  }
  ${false // Assuming responsive and customCss are not defined, setting to false to avoid errors..
      ? `
  @media only screen and (max-width: 480px) {
    .email-container {
      width: 100% !important;
    }
    .content {
      padding: 10px !important;
    }
  }
  `
      : ""
    }
  ${""}
`

  const elementsHtml = elements
    .map((element) => {
      const { type, content, styles } = element
      const styleString = Object.entries(styles)
        .map(([key, value]) => `${key}: ${value};`)
        .join(" ")

      switch (type) {
        case "header":
          return `<h${content.level} style="${styleString}">${content.text}</h${content.level}>`
        case "sub-header":
          return `<h3 style="${styleString}">${content.text}</h3>`
        case "paragraph":
          return `<p style="${styleString}">${content.text}</p>`
        case "button":
          return `<a href="${content.url}" style="${styleString}; display: inline-block; text-decoration: none; padding: ${styles.padding || "10px 20px"}; background-color: ${styles.backgroundColor || "#3b82f6"}; color: ${styles.color || "#ffffff"}; border-radius: ${styles.borderRadius || "4px"}; font-weight: ${styles.fontWeight || "500"}; text-align: center;">${content.text}</a>`
        case "image":
          return `<img src="${content.src}" alt="${content.alt}" style="${styleString}" />`
        case "divider":
          return `<hr style="${styleString}" />`
        case "spacer":
          return `<div style="height: ${content.height}px; ${styleString}"></div>`
        case "footer":
          const socialLinksHtml = content.socialLinks
            .map((link: any) => {
              return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; display: inline-block; margin: 0 8px;">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,0.05);">
                <!-- Icon would be here -->
              </span>
            </a>`
            })
            .join("")

          return `<footer style="${styleString}">
            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: bold; margin: 0 0 8px 0;">${content.companyName}</h3>
              ${content.tagline ? `<p style="margin: 0;">${content.tagline}</p>` : ""}
            </div>
            ${content.socialLinks.length > 0 ? `<div style="margin-bottom: 16px;">${socialLinksHtml}</div>` : ""}
            <div style="font-size: 12px; opacity: 0.8;">
              © ${new Date().getFullYear()} ${content.companyName}. All rights reserved.
            </div>
          </footer>`
        case "logo":
          const logoHtml = `<img src="${content.src}" alt="${content.alt}" style="${styleString}; max-width: ${content.maxWidth}px; height: auto;" />`

          if (content.link) {
            return `<a href="${content.link}" target="_blank" rel="noopener noreferrer" style="display: inline-block;">${logoHtml}</a>`
          }

          return logoHtml
        default:
          return ""
      }
    })
    .join("\n")

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <style>
    ${styles}
  </style>
</head>
<body>
  <div class="email-container">
    <div class="content">
      ${elementsHtml}
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function exportTemplateToJson(template: Template): string {
  return JSON.stringify(template, null, 2)
}
