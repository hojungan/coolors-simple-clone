// on document ready
document.addEventListener("DOMContentLoaded", (event) => {
  generateColors()

  // on clicking hex code
  document.querySelectorAll(".hex").forEach((span) => {
    span.addEventListener("click", (e) => {
      e.preventDefault()
      copyToClipboard(e)
    })
  })

  // on clicking rgb code
  document.querySelectorAll(".rgb").forEach((span) => {
    span.addEventListener("click", (e) => {
      e.preventDefault()
      copyToClipboard(e)
    })
  })
})

// press space to change color
document.addEventListener("keypress", (e) => {
  if (e.code == "Space") {
    generateColors()
  }
})

// loop through .rand-color and apply the color
generateColors = () => {
  document.querySelectorAll(".rand-color").forEach((div) => {
    let hexSpan = div.querySelector(".hex")
    let rgbSpan = div.querySelector(".rgb")

    // generate hex code and convert hex to rgb
    // source: https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
    let colorHex = "#" + ((Math.random() * 0xffffff) << 0).toString(16)
    let colorRGB = colorHex.substr(1)
    let r = (`0x${colorRGB}` >> 16) & 255
    let g = (`0x${colorRGB}` >> 8) & 255
    let b = `0x${colorRGB}` & 255

    // change font color based on the contrast ratio
    if (contrast([r, g, b], [0, 0, 0]) < 4.7) {
      console.log("contrast is less than 4.7")

      hexSpan.style.color = "#fff"
      rgbSpan.style.color = "#fff"
    } else {
      console.log("contrast is greater than 4.7")

      hexSpan.style.color = "#131313"
      rgbSpan.style.color = "#131313"
    }

    div.style.backgroundColor = colorHex
    hexSpan.innerText = colorHex.toUpperCase()
    rgbSpan.innerText = `RGB(${r}, ${g}, ${b})`
  })
}

// copy color code to clipboard on click
copyToClipboard = (e) => {
  const el = document.createElement("textarea")
  el.value = e.target.innerText
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)

  alert(`Copied ${e.target.innerText} to clipboard`)
}

// get color luminance
// code source: https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

// get color contrast ratio
// code source: https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
function contrast(rgb1, rgb2) {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2])
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2])
  var brightest = Math.max(lum1, lum2)
  var darkest = Math.min(lum1, lum2)

  return ((brightest + 0.05) / (darkest + 0.05)).toFixed(1)
}
