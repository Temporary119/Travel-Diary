let selectedImages = [];
let allMemories = [];
let currentCarouselIndex = 0;
let currentViewingIndex = -1; // Track which memory is currently being viewed

const form = document.getElementById('memoryForm');
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const viewerSection = document.getElementById('viewerSection');
const memoryListSection = document.getElementById('memoryListSection');
const formSection = document.getElementById('formSection');
const carousel = document.getElementById('vCarousel');
const memoryList = document.getElementById('memoryList');

const fcarousel = document.querySelector('.fcarousel-container');
const fcards = document.querySelectorAll('.fcard');

function slideFront(direction) {
  const cardWidth = fcards[0].offsetWidth + 16;
  fcarousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('factive', entry.isIntersecting);
  });
}, { root: fcarousel, threshold: 0.6 });

fcards.forEach(card => observer.observe(card));

imageInput.addEventListener('change', function () {
  const files = Array.from(this.files);
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        selectedImages.push(e.target.result);
        displayImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
  this.value = '';
});

function displayImagePreview(imageSrc) {
  const img = document.createElement('img');
  img.src = imageSrc;
  img.addEventListener('click', () => removeImage(imageSrc));
  img.title = 'Click to remove';
  img.style.cursor = 'pointer';
  previewContainer.appendChild(img);
}

function removeImage(imageSrc) {
  const index = selectedImages.indexOf(imageSrc);
  if (index > -1) {
    selectedImages.splice(index, 1);
    updatePreviewContainer();
  }
}

function updatePreviewContainer() {
  previewContainer.innerHTML = '';
  selectedImages.forEach(src => displayImagePreview(src));
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (selectedImages.length === 0) {
    alert('Please add at least one image.');
    return;
  }

  const formData = new FormData(form);
  const memory = {
    id: Date.now(),
    title: formData.get('title'),
    destination: formData.get('destination'),
    date: formData.get('date'),
    description: formData.get('description'),
    quote: formData.get('quote'),
    tags: formData.get('tags'),
    images: [...selectedImages],
    createdAt: new Date().toISOString()
  };

  allMemories.unshift(memory);
  saveMemoriesToStorage();
  resetForm();
  showSuccessMessage();

  // Hide form, show memory list
  formSection.classList.add('hidden');
  memoryListSection.classList.remove('hidden');
  viewerSection.classList.add('hidden');
  renderMemoryList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function resetForm() {
  form.reset();
  selectedImages = [];
  previewContainer.innerHTML = '';
}

function showSuccessMessage() {
  const message = document.createElement('div');
  message.textContent = 'Memory saved!';
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    z-index: 1000;
  `;
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 3000);
}

function renderMemoryList() {
  memoryList.innerHTML = '';
  if (allMemories.length === 0) {
    memoryList.innerHTML = `<div style="text-align: center;">No memories yet</div>`;
    return;
  }

  allMemories.forEach((memory, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.innerHTML = `
      <button class="delete-btn" onclick="deleteMemory(${index})" title="Delete Memory">×</button>
      <img src="${memory.images[0]}" />
      <div class="memory-card-content">
        <h4>${memory.title}</h4>
        <p>${memory.destination}</p>
        <small>${formatDate(memory.date)}</small>
      </div>
    `;
    card.addEventListener('click', (e) => {
      // Don't show detailed view if delete button was clicked
      if (!e.target.classList.contains('delete-btn')) {
        showDetailedView(index);
      }
    });
    memoryList.appendChild(card);
  });
}

function deleteMemory(index) {
  if (confirm('Are you sure you want to delete this memory?')) {
    allMemories.splice(index, 1);
    saveMemoriesToStorage();
    renderMemoryList();
    
    // Show success message
    const message = document.createElement('div');
    message.textContent = 'Memory deleted!';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4757;
      color: white;
      padding: 1rem 2rem;
      border-radius: 5px;
      z-index: 1000;
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
  }
}

function deleteCurrentMemory() {
  if (currentViewingIndex >= 0 && confirm('Are you sure you want to delete this memory?')) {
    allMemories.splice(currentViewingIndex, 1);
    saveMemoriesToStorage();
    goBackToList();
    
    // Show success message
    const message = document.createElement('div');
    message.textContent = 'Memory deleted!';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4757;
      color: white;
      padding: 1rem 2rem;
      border-radius: 5px;
      z-index: 1000;
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function showDetailedView(index) {
  currentViewingIndex = index; // Store which memory we're viewing
  const memory = allMemories[index];
  document.getElementById('vTitle').textContent = memory.title;
  document.getElementById('vDestination').textContent = memory.destination;
  document.getElementById('vDate').textContent = formatDate(memory.date);
  document.getElementById('vDescription').textContent = memory.description || 'No description';
  document.getElementById('vQuote').textContent = memory.quote || 'No quote';
  document.getElementById('vTags').textContent = memory.tags || 'No tags';

  carousel.innerHTML = '';
  memory.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    carousel.appendChild(img);
  });

  currentCarouselIndex = 0;
  carousel.scrollTo({ left: 0, behavior: 'smooth' });

  memoryListSection.classList.add('hidden');
  viewerSection.classList.remove('hidden');
  formSection.classList.add('hidden');
}

function slide(direction) {
  const scrollAmount = 320;
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function navigateTo(pageId) {
// Hide all main pages
document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('visible');
    if (p.id === 'landing') {
    p.style.display = 'none'; // Explicitly hide landing
    }
});

// Show the target page
const target = document.getElementById(pageId);
if (target) {
    if (pageId === 'landing') {
    target.style.display = 'flex'; // Restore landing layout
    }
    target.classList.add('visible');
}
}

function showFormOnly() {
  // Hide the landing section completely
  document.getElementById('landing').style.display = 'none';

  // Show the about page
  document.getElementById('aboutp').classList.add('visible');

  // Show the form section only
  document.getElementById('formSection').classList.remove('hidden');

  // Hide other sections inside about page
  document.getElementById('memoryListSection').classList.add('hidden');
  document.getElementById('viewerSection').classList.add('hidden');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startNewMemory() {
  resetForm();
  memoryListSection.classList.add('hidden');
  viewerSection.classList.add('hidden');
  formSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBackToList() {
// Hide all main pages first
document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));

// Show the About (Memory Management) page
const aboutPage = document.getElementById('aboutp');
aboutPage.classList.add('visible');

// Show the memory list box (with cards and buttons)
memoryListSection.classList.remove('hidden');

// Hide the form and viewer
viewerSection.classList.add('hidden');
formSection.classList.add('hidden');

// Re-render memory cards
renderMemoryList();

// Scroll to top for clean view
window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveMemoriesToStorage() {
  localStorage.setItem('travelMemories', JSON.stringify(allMemories));
}

function loadMemoriesFromStorage() {
  const stored = localStorage.getItem('travelMemories');
  if (stored) allMemories = JSON.parse(stored);
}

document.addEventListener('DOMContentLoaded', () => {
  loadMemoriesFromStorage();
  if (allMemories.length === 0) addSampleMemories();
});

function addSampleMemories() {
  allMemories = [{
    id: 1,
    title: "Sample Trip",
    destination: "Goa",
    date: "2025-01-01",
    description: "It was amazing!",
    quote: "Travel is the only thing you buy that makes you richer.",
    tags: "beach, fun",
    images: [
      "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    createdAt: new Date().toISOString()
  }];
  saveMemoriesToStorage();
}