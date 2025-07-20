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
