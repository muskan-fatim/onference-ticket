document.addEventListener('DOMContentLoaded', function() {
    const uploadBox = document.getElementById('uploadBox');
    const avatarUpload = document.getElementById('avatarUpload');
    const generateBtn = document.getElementById('generateBtn');
    
    // Handle avatar upload
    uploadBox.addEventListener('click', function() {
        avatarUpload.click();
    });
    
    avatarUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            
            // Check file type and size
            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                alert('Please upload a JPG or PNG file.');
                return;
            }
            
            if (file.size > 500 * 1024) {
                alert('File size must be less than 500KB.');
                return;
            }
            
            // Preview the image
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadBox.innerHTML = '';
                const img = document.createElement('img');
                img.src = event.target.result;
                img.style.maxWidth = '100%';
                img.style.borderRadius = '5px';
                uploadBox.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle drag and drop
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--orange-500)';
        this.style.backgroundColor = 'rgba(245, 124, 95, 0.2)';
    });
    
    uploadBox.addEventListener('dragleave', function() {
        this.style.borderColor = 'var(--neutral-500)';
        this.style.backgroundColor = 'transparent';
    });
    
    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--neutral-500)';
        this.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length > 0) {
            avatarUpload.files = e.dataTransfer.files;
            const event = new Event('change');
            avatarUpload.dispatchEvent(event);
        }
    });
    
    // Generate ticket functionality
    generateBtn.addEventListener('click', function() {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const github = document.getElementById('github').value.trim();
        
        if (!fullName || !email || !github) {
            alert('Please fill in all fields.');
            return;
            
        }
        
        // In a real app, you would generate and display the ticket here
        alert('Ticket generated successfully! Check your email for confirmation.');
        
        // For demo purposes, we'll just log the data
        console.log({
            fullName,
            email,
            github,
            avatar: avatarUpload.files.length > 0 ? avatarUpload.files[0].name : 'No avatar uploaded'
        });
    });
});