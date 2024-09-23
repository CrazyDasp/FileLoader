document.getElementById('file').addEventListener('change', function(event) {
    const fileInput = event.target;
    const fileNameSpan = document.querySelector('.input__wrapper-desc');
    
    if (fileInput.files.length > 0) {
        fileNameSpan.textContent = fileInput.files[0].name;
    } else {
        fileNameSpan.textContent = 'Имя файла...';
    }
});

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const form = event.target;
    const fileInput = document.getElementById('file').files[0];
    const progressBar = document.getElementById('progress');
    
    const formData = new FormData();
    formData.append('file', fileInput);
    
    const xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentComplete = event.loaded / event.total;
            progressBar.value = percentComplete;
        }
    };

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Файл успешно загружен');
        } else {
            console.error('Ошибка загрузки файла');
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети');
    };

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);
    xhr.send(formData);
});
