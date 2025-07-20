## 🏗️ HTML Structure (DOM Overview)

```txt
index.html
└── <body>
    ├── <nav>
    │   ├── <div class="logo">
    │   └── <ul class="nav-links">
    │       ├── <li><a onclick="navigateTo('landing')">Home</a>
    │       ├── <li><a onclick="navigateTo('about')">About</a>
    │       ├── <li><a onclick="navigateTo('contact')">Contact</a>
    │       └── <li><a onclick="navigateTo('login')">Login</a>
    │
    └── <main>
        ├── <div id="landing" class="page">
        │   ├── <div class="one">
        │   │   ├── <div class="left-text">
        │   │   └── <div class="fslider-section">
        │   │       ├── <div class="fcarousel-container"> [img cards]
        │   │       └── <div class="fcontrols"> [←, → buttons]
        │
        ├── <div id="about" class="page">
        │   └── <div class="about-content">
        │       └── <div class="about-text"> [h2, h3, p...]
        │
        ├── <div id="contact" class="page">
        │   └── <div class="contact-info">
        │       ├── <div class="contact-details"> [Email, Phone, etc.]
        │       └── <div class="contact-form"> [form inputs]
        │
        ├── <div id="login" class="page">
        │   └── <div class="login-form"> [email, password, remember me]
        │
        └── <div id="aboutp" class="page">
            ├── <div id="memoryListSection"> [Memory list + create button]
            ├── <div id="viewerSection"> [Carousel + memory detail]
            └── <div id="formSection"> [Memory creation form]
```
## 🎨 CSS Overview (TravelDiary.css)

```txt
TravelDiary.css
├── Global Reset
│   ├── * { box-sizing, margin, padding }
│   └── body { font-family, background-image, overlay layer }

├── Navigation Bar
│   ├── nav { flex layout, spacing }
│   ├── .logo { gradient text }
│   └── .nav-links li a { styled buttons with hover effects }

├── Main Content
│   └── main, .page, .visible { layout switching }

├── Landing Page
│   ├── #landing, .one { flex layout }
│   ├── .left-text { H1, p, button styles }
│   └── .fslider-section
│       ├── .fcarousel-container { scroll-snap carousel }
│       ├── .fcard { image card with hover }
│       └── .fcontrols { left/right buttons }

├── Memory Management Page (#aboutp)
│   ├── .container, .box { card layout with blur }
│   └── .nav-btn { gradient back button }

├── About Page
│   ├── .about-content { centered section }
│   └── .about-features, .feature-card

├── Contact Page
│   ├── .contact-content, .contact-info
│   ├── .contact-item { sections: Email, Phone, Address, Social }
│   └── .contact-form { styled form with button }

├── Login Page
│   ├── .login-form, .form-group
│   └── .login-button, .login-links

├── Memory Form
│   ├── #formSection, #memoryForm { labels, inputs, textarea }
│   ├── #previewContainer { image preview grid }
│   └── .form-buttons { Save / Back buttons }

├── Memory Viewer Section
│   ├── #viewerSection
│   ├── .carousel-wrapper, .carousel { horizontal scrollable images }
│   ├── .arrow-btn { slide arrows }
│   └── .memory-detail

├── Memory List Section
│   ├── #memoryListSection
│   ├── #mbtn { navigation buttons }
│   └── .memory-card { styled memory previews }

├── Delete Button
│   └── .delete-btn { appears on hover }

├── Responsive Design
│   ├── @media (max-width: 768px)
│   └── @media (max-width: 480px)
```
## ⚙️ JavaScript Structure (TravelDiary.js)

```txt
TravelDiary.js
├── Variables
│   ├── selectedImages[]          ← stores uploaded images
│   ├── allMemories[]             ← stores all memory objects
│   ├── currentCarouselIndex      ← index for image carousel
│   ├── currentViewingIndex       ← currently viewed memory index
│   └── DOM elements (form, input, previewContainer, etc.)

├── Carousel Slider
│   ├── slideFront(direction)             ← scrolls landing page image cards
│   ├── IntersectionObserver              ← highlights visible cards

├── Image Upload & Preview
│   ├── imageInput.onchange               ← file reader + preview
│   ├── displayImagePreview()             ← adds preview thumbnail
│   ├── removeImage() + updatePreviewContainer()

├── Memory Submission & Form
│   ├── form.onsubmit                     ← validates, builds memory object
│   ├── resetForm()                       ← resets input fields
│   ├── showSuccessMessage()             ← toast message

├── Memory Rendering
│   ├── renderMemoryList()                ← renders memory cards
│   ├── deleteMemory(index)               ← deletes memory from list
│   └── deleteCurrentMemory()             ← from detailed view

├── Memory Viewer
│   ├── showDetailedView(index)           ← displays selected memory
│   ├── formatDate(date)                  ← formats date
│   └── slide(direction)                  ← carousel navigation

├── Navigation
│   ├── navigateTo(pageId)                ← SPA-style page toggle
│   ├── showFormOnly()                    ← opens memory form only
│   ├── startNewMemory()                  ← resets + shows empty form
│   └── goBackToList()                    ← exits detailed view

├── Local Storage
│   ├── saveMemoriesToStorage()           ← saves to localStorage
│   ├── loadMemoriesFromStorage()         ← loads from localStorage
│   └── addSampleMemories()               ← default memory if none

```
