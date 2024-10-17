document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("addModal");
    const deleteModal = document.getElementById("deleteModal"); 
    const addButton = document.getElementById("addButton");
    const deleteButton = document.getElementById("deleteButton"); 
    const closeButton = document.querySelector(".close");
    const closeDeleteButton = deleteModal.querySelector(".close"); 
    const airdropForm = document.getElementById("airdropForm");
    const deleteForm = document.getElementById("deleteForm");

    addButton.addEventListener("click", function() {
        modal.style.display = "block";
    });

    deleteButton.addEventListener("click", function() {
        console.log("Tombol hapus diklik");
        deleteModal.style.display = "block"; 
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    closeDeleteButton.addEventListener("click", function() {
        deleteModal.style.display = "none"; 
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (event.target === deleteModal) {
            deleteModal.style.display = "none"; 
        }
    });

    airdropForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const link1 = document.getElementById("link1").value;
        const link2 = document.getElementById("link2").value;
        const description = document.getElementById("description").value;
        const categories = Array.from(document.querySelectorAll('input[name="category[]"]:checked'))
                                .map(el => el.value);
        const data = { name, link1, link2, description, categories };

        fetch('/add_airdrop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.message);
            modal.style.display = "none";
            location.reload();  
        })
        .catch(error => console.error('Error:', error));
    });

    deleteForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const selectedAirdrop = document.getElementById("airdropSelect").value;
        console.log("Menghapus airdrop dengan ID:", selectedAirdrop); 

        fetch('/delete_airdrop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ airdrop: selectedAirdrop })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.message);
            deleteModal.style.display = "none"; 
            location.reload();  
        })
        .catch(error => console.error('Error:', error));
    });

    // Fungsi untuk mengecek apakah sudah 24 jam sejak status terakhir berubah
    function checkStatusExpiration(projectId) {
        const lastChange = localStorage.getItem(`statusChangeTime-${projectId}`);
        if (lastChange) {
            const lastChangeTime = new Date(lastChange);
            const currentTime = new Date();
            const diffTime = Math.abs(currentTime - lastChangeTime);
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); // Konversi ke jam

            const statusElement = document.getElementById(`status-${projectId}`);
            if (diffHours >= 24) {
                // Reset status jika lebih dari 24 jam
                statusElement.innerHTML = `<span class="material-icons status-icon status-belum">cancel</span>`;
                localStorage.removeItem(`statusChangeTime-${projectId}`); // Reset waktu
            } else {
                // Jika belum lebih dari 24 jam, tampilkan status selesai
                statusElement.innerHTML = `<span class="fa-solid fa-circle-check status-icon status-selesai"></span>`;
            }
        }
    }

    // Tambahkan logika untuk status link
    const links = document.querySelectorAll('.link-start');

    links.forEach(link => {
        const projectId = link.dataset.id; // Ambil ID proyek
        checkStatusExpiration(projectId); // Cek apakah status harus direset

        link.addEventListener('click', function (event) {
            // Mencegah navigasi sementara
            event.preventDefault();

            const statusElement = document.getElementById(`status-${projectId}`);
            statusElement.innerHTML = `<span class="fa-solid fa-circle-check status-icon status-selesai"></span>`;

            // Simpan waktu saat status berubah
            const currentTime = new Date();
            localStorage.setItem(`statusChangeTime-${projectId}`, currentTime.toISOString());

            // Buka link tanpa penundaan
            const url = this.href;
            window.open(url, '_blank'); // Buka link segera
        });
    });
});

// Mencegah klik kanan
document.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Mencegah klik kanan
});

// Mencegah Ctrl + C, Ctrl + X, Ctrl + V (copy, cut, paste)
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && (event.key === 'c' || event.key === 'x' || event.key === 'v')) {
        event.preventDefault(); // Mencegah copy, cut, dan paste
    }
});

// Fungsi untuk membuka side menu
function openNav() {
    document.getElementById("sideNav").style.width = "200px"; // Atur lebar side nav
    document.getElementById("overlay").style.display = "block"; // Tampilkan overlay
}

// Fungsi untuk menutup side menu
function closeNav() {
    document.getElementById("sideNav").style.width = "0"; // Sembunyikan side nav
    document.getElementById("overlay").style.display = "none"; // Sembunyikan overlay
}

// Event untuk menutup side nav dan overlay saat mengklik overlay
document.getElementById("overlay").onclick = function() {
    closeNav(); // Tutup side nav dan overlay
};