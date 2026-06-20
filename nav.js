function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.getElementById('mainNav');

menuBtn?.addEventListener('click', () => {
  mainNav.classList.toggle('mobile-open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('mobile-open');
  });
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn?.addEventListener('click', () => {
  const query = prompt('Search for a vehicle:');
  if (query) {
    window.location.href = `index.html?search=${encodeURIComponent(query)}`;
  }
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you shortly.');
  contactForm.reset();
});

// Prefill contact subject from query string
const subjectInput = document.getElementById('subject');
const subjectQuery = getQueryParam('subject');
if (subjectInput && subjectQuery) {
  subjectInput.value = subjectQuery;
}

// Detail page button actions
const bookTestDriveBtn = document.getElementById('bookTestDriveBtn');
const downloadBrochureBtn = document.getElementById('downloadBrochureBtn');

bookTestDriveBtn?.addEventListener('click', () => {
  const vehicleName = document.getElementById('detailName')?.textContent || 'this vehicle';
  const query = new URLSearchParams({ subject: `Test Drive Request: ${vehicleName}` }).toString();
  window.location.href = `contact.html?${query}`;
});

downloadBrochureBtn?.addEventListener('click', () => {
  const vehicleName = document.getElementById('detailName')?.textContent || 'Luxury Vehicle';
  const vehicleCategory = document.getElementById('detailCategory')?.textContent || '';
  const vehiclePrice = document.getElementById('detailPrice')?.textContent || '';
  const vehicleYear = document.getElementById('detailYear')?.textContent || '';
  const bodyText = [
    `Vehicle: ${vehicleName}`,
    `Category: ${vehicleCategory}`,
    `Price: ${vehiclePrice}`,
    `Year: ${vehicleYear}`,
    '',
    'For more information or to request a personal consultation, visit our showroom or contact us at info@luxurymotors.com.'
  ];

  if (window.jspdf && window.jspdf.jsPDF) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    doc.setFontSize(20);
    doc.text('Luxury Motors Brochure', 40, 60);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 40, 90);
    doc.setFontSize(14);
    doc.text(bodyText, 40, 130);
    const fileName = `${vehicleName.replace(/\s+/g, '_')}_Brochure.pdf`;
    doc.save(fileName);
  } else {
    const brochureText = `Luxury Motors Brochure\n\n${bodyText.join('\n')}`;
    const blob = new Blob([brochureText], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${vehicleName.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  }
});
