const popupsData = [
  {
    id: "popup0",
    title: "Welcome",
    h2: "About me",
    h3: "Sub line",
    content: "Wat rotzooi over mezelf",
    imageUrl: "./images/pf.jpg" // Add your image path here
  },
  {
    id: "popup1",
    title: "NieR: Automata promotie website",
    h2: "NieR: Automata promotie website",
    h3: "Sub line",
    content: "Tijdens de Minor Visual Interface Design kreeg ik de opdracht om alles wat ik geleerd had nog één laatste keer toe te passen tijdens de 'Meesterproef'. Mijn focus lag hierbij op het ontwikkelen van een website die de essentie van NieR: Automata - een intrigerende videogame - weerspiegelt. Mijn benadering was gericht op het implementeren van game design principes om de website een speelse en interactieve dimensie te geven die nauw aansluit bij het thema van de game.",
    imageUrl: "./images/bg.jpg" // Add your image path here
  },
  {
    id: "popup2",
    title: "Popup 2 Title",
    h2: "Another Project Title",
    h3: "Another Sub line",
    content: "This is the content for popup 2.",
    imageUrl: "./images/bg.jpg" // Add your image path here
  }
];

function showPopup(popupId, startX = '24px', startY = '64px') {
  const popup = document.getElementById(popupId);
  popup.style.left = startX;
  popup.style.top = startY;
  popup.style.transform = 'none';
  popup.style.display = 'flex';
  popup.style.zIndex = getMaxZIndex() + 1;
}

function hidePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = 'none';
}

function openPopup(index, startX, startY) {
  const data = popupsData[index];
  document.getElementById(`${data.id}-title`).textContent = data.title;
  document.getElementById(`${data.id}-h2`).textContent = data.h2;
  document.getElementById(`${data.id}-h3`).textContent = data.h3;
  document.getElementById(`${data.id}-content`).textContent = data.content;
  
  // Set the image source
  document.getElementById(`${data.id}-image`).style.backgroundImage = `url(${data.imageUrl})`;

  showPopup(data.id, startX, startY);
}

function getMaxZIndex() {
  let maxZ = 0;
  document.querySelectorAll('.popup-container').forEach(popup => {
    const zIndex = parseInt(window.getComputedStyle(popup).zIndex);
    if (zIndex > maxZ) maxZ = zIndex;
  });
  return maxZ;
}

// Show popup0 as soon as the page loads
window.addEventListener('DOMContentLoaded', function () {
  openPopup(0, '64px', '128px');
});

document.getElementById('icon0').addEventListener('click', function () {
  openPopup(0, '64px', '128px');
});

document.getElementById('icon1').addEventListener('click', function () {
  openPopup(1, '24px', '64px');
});

document.getElementById('icon2').addEventListener('click', function () {
  openPopup(2, '200px', '150px');
});

document.querySelectorAll('.close').forEach(closeButton => {
  closeButton.addEventListener('click', function () {
    hidePopup(this.getAttribute('data-popup-id'));
  });
});

function makeResizableAndDraggable(popupContainer) {
  const resizers = popupContainer.querySelectorAll('.resize-handle');
  const header = popupContainer.querySelector('.popup-header');
  const maximizeButton = popupContainer.querySelector('.maximize');
  let isMaximized = false, preMaximizeState = {};
  const minWidth = 400, minHeight = 300;
  const headerElement = document.querySelector('header');

  function bringToFront(popup) {
    popup.style.zIndex = getMaxZIndex() + 1;
  }

  header.onmousedown = function (e) {
    e.preventDefault();
    bringToFront(popupContainer);
    const originalX = popupContainer.offsetLeft, originalY = popupContainer.offsetTop;
    const originalMouseX = e.clientX, originalMouseY = e.clientY;

    window.onmousemove = function (e) {
      popupContainer.style.top = `${Math.max(headerElement.getBoundingClientRect().bottom, originalY + (e.clientY - originalMouseY))}px`;
      popupContainer.style.left = `${originalX + (e.clientX - originalMouseX)}px`;
    };
    window.onmouseup = () => window.onmousemove = window.onmouseup = null;
  };

  maximizeButton.onclick = function () {
    if (isMaximized) {
      Object.assign(popupContainer.style, preMaximizeState);
      isMaximized = false;
    } else {
      preMaximizeState = { width: popupContainer.style.width, height: popupContainer.style.height, left: popupContainer.style.left, top: popupContainer.style.top };
      popupContainer.style.width = '100%';
      popupContainer.style.height = `${window.innerHeight - headerElement.getBoundingClientRect().bottom}px`;
      popupContainer.style.left = '0';
      popupContainer.style.top = `${headerElement.getBoundingClientRect().bottom}px`;
      isMaximized = true;
    }
  };

  resizers.forEach(resizer => resizer.addEventListener('mousedown', function (e) {
    e.preventDefault();
    bringToFront(popupContainer);
    const originalWidth = popupContainer.offsetWidth, originalHeight = popupContainer.offsetHeight;
    const originalX = popupContainer.offsetLeft, originalY = popupContainer.offsetTop;
    const originalMouseX = e.clientX, originalMouseY = e.clientY;

    window.onmousemove = function (e) {
      let newWidth = originalWidth, newHeight = originalHeight, newTop = originalY, newLeft = originalX;

      if (resizer.classList.contains('right')) newWidth = originalWidth + (e.clientX - originalMouseX);
      if (resizer.classList.contains('bottom')) newHeight = originalHeight + (e.clientY - originalMouseY);
      if (resizer.classList.contains('left')) {
        newWidth = originalWidth - (e.clientX - originalMouseX);
        newLeft = originalX + (e.clientX - originalMouseX);
      }
      if (resizer.classList.contains('top')) {
        newHeight = originalHeight - (e.clientY - originalMouseY);
        newTop = originalY + (e.clientY - originalMouseY);
      }

      // Corner resizers
      if (resizer.classList.contains('bottom-right')) {
        newWidth = originalWidth + (e.clientX - originalMouseX);
        newHeight = originalHeight + (e.clientY - originalMouseY);
      } else if (resizer.classList.contains('bottom-left')) {
        newWidth = originalWidth - (e.clientX - originalMouseX);
        newHeight = originalHeight + (e.clientY - originalMouseY);
        newLeft = originalX + (e.clientX - originalMouseX);
      } else if (resizer.classList.contains('top-right')) {
        newWidth = originalWidth + (e.clientX - originalMouseX);
        newHeight = originalHeight - (e.clientY - originalMouseY);
        newTop = originalY + (e.clientY - originalMouseY);
      } else if (resizer.classList.contains('top-left')) {
        newWidth = originalWidth - (e.clientX - originalMouseX);
        newHeight = originalHeight - (e.clientY - originalMouseY);
        newLeft = originalX + (e.clientX - originalMouseX);
        newTop = originalY + (e.clientY - originalMouseY);
      }

      if (newWidth > minWidth) popupContainer.style.width = `${newWidth}px`;
      if (newHeight > minHeight && newTop >= headerElement.getBoundingClientRect().bottom && (newTop + newHeight) <= window.innerHeight) {
        popupContainer.style.height = `${newHeight}px`;
        popupContainer.style.top = `${newTop}px`;
      }
      if (resizer.classList.contains('left') || resizer.classList.contains('top-left') || resizer.classList.contains('bottom-left')) {
        popupContainer.style.left = `${newLeft}px`;
      }
    };

    window.onmouseup = () => window.onmousemove = window.onmouseup = null;
  }));
}

document.querySelectorAll('.popup-container').forEach(makeResizableAndDraggable);






// Function to toggle the dock
function toggleDock() {
  const dock = document.getElementById('dock');
  dock.classList.toggle('hidden');
}

// Add click event listener to header-icon1 to toggle the dock
document.getElementById('header-icon1').addEventListener('click', toggleDock);

function updateClock() {
  const now = new Date();

  // Format date as DD/MM/YYYY
  const date = now.toLocaleDateString('en-GB'); 

  // Format time as HH:MM:SS in 24-hour format
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  document.getElementById('current-date').textContent = date;
  document.getElementById('current-time').textContent = time;
}

// Initial call to set the clock immediately
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);






/* background change */

document.getElementById('header-icon3').addEventListener('click', function () {
  const popup = document.getElementById('background-popup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.bg-option').forEach(img => {
  img.addEventListener('click', function () {
    const bgUrl = img.getAttribute('data-bg');
    document.body.style.backgroundImage = `url(${bgUrl})`;
    document.getElementById('background-popup').style.display = 'none'; // Hide the popup after selection
  });
});

// Close the popup if clicked outside
document.addEventListener('click', function (e) {
  const popup = document.getElementById('background-popup');
  const icon = document.getElementById('header-icon3');

  if (!popup.contains(e.target) && !icon.contains(e.target)) {
    popup.style.display = 'none';
  }
});


/* toggle dark / light mode */

document.getElementById('theme-toggle-icon').addEventListener('click', function () {
  const body = document.body;
  body.classList.toggle('light-mode');

  // Toggle the icon between moon and sun
  this.textContent = body.classList.contains('light-mode') ? '🌞' : '🌙';
});



/* setting icons */

document.getElementById('header-icon2').addEventListener('click', function (e) {
  e.stopPropagation(); // Prevents the click from propagating to the document
  const dropdown = document.getElementById('settings-dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Hide the dropdown when clicking outside of it
document.addEventListener('click', function (e) {
  const dropdown = document.getElementById('settings-dropdown');
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  }
});

// Example functions linked to the settings options
function openPopup0() {
  openPopup(0, '64px', '128px');
}

function openPopup1() {
  openPopup(1, '24px', '64px');
}

function toggleDock() {
  const dock = document.getElementById('dock');
  dock.classList.toggle('hidden');
}

function changeTheme() {
  document.body.classList.toggle('light-mode');
}




/* tooltip zichtbaar na klik */

// Handle click events on header icons to toggle tooltip visibility
document.querySelectorAll('.header-tooltip-container').forEach(container => {
  const icon = container.querySelector('i');
  icon.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevents click event from closing the tooltip immediately
    container.classList.toggle('active');

    // Close other tooltips when one is clicked
    document.querySelectorAll('.header-tooltip-container').forEach(otherContainer => {
      if (otherContainer !== container) {
        otherContainer.classList.remove('active');
      }
    });
  });
});

// Hide the tooltips when clicking outside of the icons
document.addEventListener('click', function () {
  document.querySelectorAll('.header-tooltip-container').forEach(container => {
    container.classList.remove('active');
  });
});