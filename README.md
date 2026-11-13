# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Responsive media queries (`@media`)
- Vanilla JavaScript (ES6+)

### What I learned

Building this project helped me connect HTML structure, CSS state classes, and JavaScript DOM manipulation into a complete user flow. Some key concepts I practiced include:

- **Custom File Dropzones & Image Previews:** Using a hidden native `<input type="file">` linked to a `<label>` container, validating file size in bytes (`500 * 1024`), and generating temporary preview URLs with `URL.createObjectURL()`. I also learned how `e.stopPropagation()` prevents nested action buttons ("Remove image" / "Change image") from re-triggering the parent label's file picker.
- **CSS Filter & State Classes:** Toggling `.hidden` and `.active-error` utility classes from JavaScript to reveal validation messages and dynamically recolor external SVG info icons using CSS `filter`.
- **Client-Side Form Validation & Single-Page View Swapping:** Checking all inputs simultaneously on `submit` with a boolean flag (`isFormValid`), validating email formatting with Regular Expressions (`RegExp`), and swapping `#form-section` for `#ticket-section` once all checks pass.
- **Responsive SVG Ticket Scaling:** Preserving the exact proportions of `pattern-ticket.svg` across mobile and desktop screens using `aspect-ratio: 600 / 280` and `writing-mode: vertical-rl` for the ticket stub ID.

Here are a few snippets I'm proud of from this project:

```css
/* Turning external SVG info icons red alongside error text */
.error-message.active-error p {
  color: hsl(7, 71%, 60%);
}

.error-message.active-error .info {
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(333deg) brightness(98%) contrast(92%);
}

/* Maintaining ticket card proportions across screen sizes */
.ticket-card {
  background: url('images/pattern-ticket.svg') no-repeat center / 100% 100%;
  aspect-ratio: 600 / 280;
}
```

```js
// Preventing nested dropzone buttons from triggering the parent label
removeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  resetDropzone();
});
```

### Continued development

In future projects, I want to continue practicing:

- Adding full drag-and-drop file event listeners (`dragover`, `dragleave`, and `drop`) to custom upload zones.
- Enhancing accessibility with `aria-live` regions and `aria-describedby` attributes so screen readers announce validation errors immediately.
- Refactoring form validation logic into smaller, reusable helper functions to keep event listeners clean and modular.

### Useful resources

- [MDN Web Docs - URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static) - Helped me understand how to display local user-selected images in the browser without uploading them to a server first.
- [MDN Web Docs - Event.stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) - Clarified event bubbling and how to keep button clicks inside a `<label>` from opening the file dialog twice.
- [MDN Web Docs - CSS aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) - Useful for keeping the SVG ticket card layout aligned across mobile and desktop viewports.

### AI Collaboration

I used Gemini as a coding mentor throughout this build to break down the mental models behind DOM manipulation, event bubbling, regex validation, and responsive CSS layout. Rather than copying solutions blindly, I used AI guidance to debug layout alignment issues on mobile, understand why state classes like `.hidden` and `.active-error` cleanly separate JS logic from CSS styling, and verify my validation flow step by step.

## Author

- Frontend Mentor - [@Danny17bobd](https://www.frontendmentor.io/profile/Danny17bobd)