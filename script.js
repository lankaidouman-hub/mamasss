
        // Global Variables
        let isLoggedIn = false;
        let isDarkMode = false;
        
        // Ensure login form is always shown on page load
        function initializePageState() {
            isLoggedIn = false;
            document.getElementById('loginSection').classList.remove('hidden');
            document.getElementById('mainContent').classList.add('hidden');
        }
        let currentChart = null;
        let currentChartType = 'bar';
        
        // Data Variables for SMA Negeri 19 Palembang
        let jumlahPohon = 80;
        let jumlahSampah = 70;
        let jumlahKegiatan = 60;
        let skorLingkungan = 90;
        

        
        // Gallery Configuration - Ubah URL foto di sini untuk mengganti gambar
        const galleryImages = [
            {
                id: 1,
                title: 'Random',
                url: 'https://sman1seyegan.sch.id/wp-content/uploads/2025/02/logo-adiwiyata.jpg',
                description: '1'
            },
            {
                id: 2,
                title: 'Random',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcNmXOzU5PNCwOE-lRcYAYHBQxwlhCtHM5T5KTzsM1QQ&s=10',
                description: '2'
            },
            {
                id: 3,
                title: 'Random',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4jtLFK24E4ASzI7MakvNDQqAyjdidu86V5uNCKdv99I25PMFJTr9me-D&s=10',
                description: '3'
            },
            {
                id: 4,
                title: 'Random',
               url: 'https://disdikbud.kukarkab.go.id/v2/wp-content/uploads/2024/04/kontenThumbnail-1699098277.jpg',
                description: '4'
            },
            {
                id: 5,
                title: 'Random',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDvd33AIu-ZM-CDFgVu5zJ2sbJuD1451ZCepcpYpXeSf0jTXDeNNv63OQ&s=10',
                description: '5'
            },
            {
                id: 6,
                title: 'Random',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBtzFimtNGVAHzcFF2nrs6sRGLdrbk-dzVn15cNxY4j0npcel_oQkCkw&s=10',
                description: '6'
            }
        ];

        // Calendar State Management
        let currentCalendarDate = new Date();

        // Login System
        function handleLoginForm(event) {
            event.preventDefault();
            login();
            return false;
        }

        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === '1234') {
                isLoggedIn = true;
                document.getElementById('loginSection').classList.add('hidden');
                document.getElementById('mainContent').classList.remove('hidden');
                showNotification('Selamat datang di Dashboard Adiwiyata SMA Negeri 19 Palembang!', 'success');
                initializeApp();
            } else {
                showNotification('Username atau password salah! Gunakan: admin / 1234', 'error');
            }
        }

        function logout() {
            isLoggedIn = false;
            document.getElementById('mainContent').classList.add('hidden');
            document.getElementById('loginSection').classList.remove('hidden');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            showNotification('Logout berhasil. Terima kasih!', 'success');
            
            // Reset focus to username field for next login - dipercepat untuk logout yang lebih cepat
            setTimeout(() => {
                document.getElementById('username').focus();
            }, 50);
        }

        // Render Gallery from Configuration
        function renderGallery() {
            const galleryGrid = document.getElementById('galleryGrid');
            if (!galleryGrid) {
                console.log("[v0] galleryGrid element tidak ditemukan");
                return;
            }
            
            console.log("[v0] Rendering gallery dengan", galleryImages.length, "gambar");
            galleryGrid.innerHTML = '';
            
            galleryImages.forEach((image, index) => {
                console.log("[v0] Menambahkan gambar", index + 1, ":", image.title, "URL:", image.url);
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.style.cursor = 'pointer';
                galleryItem.onclick = () => openImageModal(image.url, image.title);
                galleryItem.innerHTML = `
                    <img src="${image.url}" alt="${image.description}" style="width: 100%; height: 100%; object-fit: cover;">
                    <div class="gallery-overlay">
                        <div class="gallery-text">
                            <i class="fas fa-search-plus" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                            <div class="font-semibold">${image.title}</div>
                        </div>
                    </div>
                `;
                galleryGrid.appendChild(galleryItem);
            });
            console.log("[v0] Gallery rendering selesai");
        }

        // Initialize App
        function initializeApp() {
            console.log("[v0] Memulai inisialisasi aplikasi dashboard");
            initChart();
            initDashboardChart();
            renderCalendar();
            updateStats();
            console.log("[v0] Memanggil renderGallery saat inisialisasi");
            renderGallery();
            console.log("[v0] Inisialisasi aplikasi selesai");
        }

        // Notification System
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notificationText');
            
            notificationText.textContent = message;
            notification.className = `notification ${type} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 1500);
        }

        // Theme Toggle
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode');
            
            const themeIcon = document.getElementById('themeIcon');
            themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
            
            showNotification(`Mode ${isDarkMode ? 'gelap' : 'terang'} diaktifkan`, 'success');
        }

        // Tab Management
        function showTab(tabName) {
            // Hide all tabs
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));

            // Remove active class from all triggers
            const triggers = document.querySelectorAll('.tab-trigger');
            triggers.forEach(trigger => trigger.classList.remove('active'));

            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
            
            // Render gallery jika tab galeri ditampilkan
            if (tabName === 'galeri') {
                console.log("[v0] Tab galeri ditampilkan, memanggil renderGallery()");
                renderGallery();
            }
            
            // Render kalender langsung jika tab kalender ditampilkan
            if (tabName === 'calendar') {
                console.log("[v0] Tab kalender ditampilkan, memanggil renderCalendar()");
                renderCalendar();
            }
        }

        // Data Management
        function tambahPohon() {
            jumlahPohon++;
            updateDataDisplay();
            updateChart();
            updateStats();
            showNotification('Pohon berhasil ditambahkan ke data SMA Negeri 19!', 'success');
        }

        function kurangPohon() {
            if (jumlahPohon > 0) {
                jumlahPohon--;
                updateDataDisplay();
                updateChart();
                updateStats();
                showNotification('Data pohon dikurangi', 'warning');
            }
        }

        function tambahSampah() {
            jumlahSampah++;
            updateDataDisplay();
            updateChart();
            updateStats();
            showNotification('Data sampah daur ulang bertambah!', 'success');
        }

        function kurangSampah() {
            if (jumlahSampah > 0) {
                jumlahSampah--;
                updateDataDisplay();
                updateChart();
                updateStats();
                showNotification('Data sampah dikurangi', 'warning');
            }
        }

        function tambahKegiatan() {
            jumlahKegiatan++;
            updateDataDisplay();
            updateChart();
            updateStats();
            showNotification('Kegiatan bersih-bersih berhasil ditambahkan!', 'success');
        }

        function kurangKegiatan() {
            if (jumlahKegiatan > 0) {
                jumlahKegiatan--;
                updateDataDisplay();
                updateChart();
                updateStats();
                showNotification('Data kegiatan dikurangi', 'warning');
            }
        }

        function updateDataDisplay() {
            document.getElementById('jumlahPohon').textContent = jumlahPohon;
            document.getElementById('jumlahSampah').textContent = jumlahSampah;
            document.getElementById('jumlahKegiatan').textContent = jumlahKegiatan;
        }

        function updateStats() {
            document.getElementById('statPohon').textContent = jumlahPohon;
            document.getElementById('statSampah').textContent = jumlahSampah;
            document.getElementById('statKegiatan').textContent = jumlahKegiatan;
            document.getElementById('statSkor').textContent = skorLingkungan;
            
            // Update progress bars
            updateProgressBars();
        }

        function updateProgressBars() {
            const treeProgress = Math.min((jumlahPohon / 200) * 100, 100);
            const recycleProgress = Math.min((jumlahSampah / 100) * 100, 100);
            const cleanProgress = Math.min((jumlahKegiatan / 30) * 100, 100);
            
            document.getElementById('treeProgressBar').style.width = treeProgress + '%';
            document.getElementById('recycleProgressBar').style.width = recycleProgress + '%';
            document.getElementById('cleanProgressBar').style.width = cleanProgress + '%';
            
            document.getElementById('treeProgress').textContent = jumlahPohon;
            document.getElementById('recycleProgress').textContent = jumlahSampah;
            document.getElementById('cleanProgress').textContent = jumlahKegiatan;
        }

        // Chart Management
        function initChart() {
            const ctx = document.getElementById('myChart').getContext('2d');
            currentChart = new Chart(ctx, {
                type: currentChartType,
                data: getChartData(),
                options: getChartOptions()
            });
        }

        function initDashboardChart() {
            const ctx = document.getElementById('dashboardChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                    datasets: [
                        {
                            label: 'Pohon Ditanam',
                            data: [8, 15, 22, 35, 48, 62, 75, 88, 95, 105, 115, 100],
                            borderColor: 'var(--primary-green)',
                            backgroundColor: 'rgba(5, 150, 105, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Sampah Daur Ulang (kg)',
                            data: [5, 12, 18, 25, 32, 38, 45, 52, 58, 62, 65, 68],
                            borderColor: 'var(--primary-orange)',
                            backgroundColor: 'rgba(249, 115, 22, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Kegiatan Bersih',
                            data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
                            borderColor: 'var(--primary-blue)',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Progress Tahunan SMA Negeri 19 Palembang',
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        },
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        function getChartData() {
            return {
                labels: ['Pohon Ditanam', 'Sampah Daur Ulang (kg)', 'Kegiatan Bersih-bersih'],
                datasets: [{
                    label: 'Jumlah',
                    data: [jumlahPohon, jumlahSampah, jumlahKegiatan],
                    backgroundColor: [
                        '#10b981',
                        '#f97316', 
                        '#3b82f6'
                    ],
                    borderColor: [
                        '#059669',
                        '#ea580c',
                        '#0284c7'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            };
        }

        function getChartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Data Adiwiyata SMA Negeri 19 Palembang',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: currentChartType !== 'doughnut'
                    }
                },
                scales: currentChartType === 'doughnut' ? {} : {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            };
        }

        function changeChartType(type) {
            currentChartType = type;
            if (currentChart) {
                currentChart.destroy();
            }
            initChart();
            showNotification(`Chart berubah ke ${type} chart`, 'success');
        }

        function updateChart() {
            if (currentChart) {
                currentChart.data = getChartData();
                currentChart.update();
            }
        }

        function exportData() {
            // Data yang akan diekspor
            const data = {
                sekolah: "SMA Negeri 19 Palembang",
                pohon: jumlahPohon,
                sampah: jumlahSampah,
                kegiatan: jumlahKegiatan,
                skor: skorLingkungan,
                tanggal_export: new Date().toISOString(),
                status: "Adiwiyata"
            };
            
            // Buat HTML content untuk PDF
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="id">
                <head>
                    <meta charset="UTF-8">
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            font-family: 'Arial', sans-serif;
                            color: #333;
                            line-height: 1.6;
                        }
                        .pdf-container {
                            padding: 40px;
                            background: #fff;
                        }
                        .pdf-header {
                            text-align: center;
                            border-bottom: 3px solid #10b981;
                            padding-bottom: 20px;
                            margin-bottom: 30px;
                        }
                        .pdf-header h1 {
                            color: #10b981;
                            font-size: 28px;
                            margin-bottom: 5px;
                        }
                        .pdf-header p {
                            color: #666;
                            font-size: 14px;
                        }
                        .pdf-section {
                            margin-bottom: 30px;
                            page-break-inside: avoid;
                        }
                        .pdf-section h2 {
                            color: #10b981;
                            font-size: 18px;
                            margin-bottom: 15px;
                            border-left: 4px solid #10b981;
                            padding-left: 15px;
                        }
                        .data-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 20px;
                        }
                        .data-item {
                            background: #f0fdf4;
                            padding: 15px;
                            border-radius: 8px;
                            border-left: 4px solid #10b981;
                        }
                        .data-label {
                            font-size: 12px;
                            color: #666;
                            text-transform: uppercase;
                            margin-bottom: 8px;
                        }
                        .data-value {
                            font-size: 24px;
                            font-weight: bold;
                            color: #10b981;
                        }
                        .summary-text {
                            background: #ecfdf5;
                            padding: 15px;
                            border-radius: 8px;
                            font-size: 14px;
                            line-height: 1.6;
                            margin-top: 15px;
                        }
                        .footer {
                            margin-top: 40px;
                            padding-top: 20px;
                            border-top: 1px solid #ddd;
                            font-size: 12px;
                            color: #999;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="pdf-container">
                        <div class="pdf-header">
                            <h1>📊 LAPORAN DATA ADIWIYATA</h1>
                            <p>SMA Negeri 19 Palembang</p>
                        </div>
                        
                        <div class="pdf-section">
                            <h2>📈 Statistik Data Lingkungan</h2>
                            <div class="data-grid">
                                <div class="data-item">
                                    <div class="data-label">🌱 Pohon Ditanam</div>
                                    <div class="data-value">${jumlahPohon}</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-label">♻️ Sampah Daur Ulang (kg)</div>
                                    <div class="data-value">${jumlahSampah}</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-label">🌍 Kegiatan Bersih-Bersih</div>
                                    <div class="data-value">${jumlahKegiatan}</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-label">⭐ Skor Lingkungan</div>
                                    <div class="data-value">${skorLingkungan}</div>
                                </div>
                            </div>
                        </div>

                        <div class="pdf-section">
                            <h2>✅ Status Program</h2>
                            <div class="summary-text">
                                <p><strong>Sekolah:</strong> ${data.sekolah}</p>
                                <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✓ ${data.status}</span></p>
                                <p><strong>Tanggal Export:</strong> ${new Date(data.tanggal_export).toLocaleDateString('id-ID', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
                            </div>
                        </div>

                        <div class="pdf-section">
                            <h2>📝 Ringkasan</h2>
                            <div class="summary-text">
                                <p>Program Adiwiyata SMA Negeri 19 Palembang telah berhasil mencapai target-target lingkungan yang telah ditetapkan. Data menunjukkan komitmen sekolah terhadap keberlanjutan lingkungan dengan:</p>
                                <ul style="margin-left: 20px; margin-top: 10px;">
                                    <li>Penanaman pohon sebanyak ${jumlahPohon} pohon</li>
                                    <li>Pengumpulan sampah daur ulang sebanyak ${jumlahSampah} kg</li>
                                    <li>Pelaksanaan ${jumlahKegiatan} kegiatan bersih-bersih</li>
                                    <li>Pencapaian skor lingkungan ${skorLingkungan}/100</li>
                                </ul>
                            </div>
                        </div>

                        <div class="footer">
                            <p>Laporan ini dihasilkan secara otomatis oleh Sistem Manajemen Program Adiwiyata</p>
                            <p>Generated: ${new Date().toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            // Generate PDF dari HTML
            const element = document.createElement('div');
            element.innerHTML = htmlContent;
            
            const opt = {
                margin: 10,
                filename: 'Data-Adiwiyata-SMA-Negeri-19-' + new Date().toISOString().split('T')[0] + '.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };
            
            // Gunakan html2pdf untuk membuat PDF
            html2pdf().set(opt).from(htmlContent).save();
            
            showNotification('✓ PDF Data Adiwiyata berhasil diunduh!', 'success');
        }

        // Gallery Management
        function openImageModal(src, title) {
            document.getElementById('modalImage').src = src;
            document.getElementById('modalImageTitle').textContent = title;
            document.getElementById('imageModal').classList.add('show');
        }

        function closeImageModal() {
            document.getElementById('imageModal').classList.remove('show');
        }

        function downloadImage() {
            const img = document.getElementById('modalImage');
            const link = document.createElement('a');
            link.href = img.src;
            link.download = document.getElementById('modalImageTitle').textContent;
            link.click();
            showNotification('Gambar berhasil didownload!', 'success');
        }

        function shareImage() {
            if (navigator.share) {
                navigator.share({
                    title: document.getElementById('modalImageTitle').textContent,
                    text: 'Kegiatan Adiwiyata SMA Negeri 19 Palembang',
                    url: document.getElementById('modalImage').src
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(document.getElementById('modalImage').src);
                showNotification('Link gambar disalin ke clipboard!', 'success');
            }
        }

        // Achievement System
        function showAchievement(type) {
            const achievements = {
                'tree-master': {
                    icon: 'fas fa-tree',
                    title: 'Tree Master SMA Negeri 19',
                    description: 'Selamat! SMA Negeri 19 Palembang telah menanam lebih dari 100 pohon! Kontribusi luar biasa untuk lingkungan Palembang.'
                },
                'eco-champion': {
                    icon: 'fas fa-recycle',
                    title: 'Eco Champion Palembang',
                    description: 'Hebat! Sekolah telah mendaur ulang lebih dari 68kg sampah! Terus jaga lingkungan Sumatera Selatan.'
                },
                'green-school': {
                    icon: 'fas fa-school',
                    title: 'Green School',
                    description: 'SMA Negeri 19 Palembang telah meraih status Adiwiyata! Sekolah percontohan lingkungan.'
                },
                'eco-legend': {
                    icon: 'fas fa-crown',
                    title: 'Eco Legend',
                    description: 'Raih skor Adiwiyata 100 dan selesaikan 50 kegiatan untuk membuka pencapaian legendaris ini.'
                }
            };
            
            const achievement = achievements[type];
            document.getElementById('achievementIcon').className = achievement.icon;
            document.getElementById('achievementTitle').textContent = achievement.title;
            document.getElementById('achievementDescription').textContent = achievement.description;
            document.getElementById('achievementModal').classList.add('show');
        }

        function closeAchievementModal() {
            document.getElementById('achievementModal').classList.remove('show');
        }

        // Calendar System
        function renderCalendar() {
            const now = new Date();
            const calendarMonth = currentCalendarDate.getMonth();
            const calendarYear = currentCalendarDate.getFullYear();
            
            // Update header dengan bulan dan tahun yang sedang ditampilkan
            const monthElement = document.getElementById('currentMonth');
            if (monthElement) {
                monthElement.textContent = 
                    new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(currentCalendarDate);
            }
            
            const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
            const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
            
            const calendarGrid = document.getElementById('calendarDays');
            if (!calendarGrid) {
                console.log("[v0] calendarDays element tidak ditemukan");
                return;
            }
            
            // Hapus hanya elemen hari, preserve header
            const headerElements = calendarGrid.querySelectorAll('.calendar-day-header');
            const allDays = calendarGrid.querySelectorAll('.calendar-day, [data-calendar-day]');
            allDays.forEach(el => el.remove());
            
            // Empty cells for days before month starts
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                emptyDay.setAttribute('data-calendar-day', 'empty');
                emptyDay.style.visibility = 'hidden';
                calendarGrid.appendChild(emptyDay);
            }
            
            // Days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.setAttribute('data-calendar-day', day);
                dayElement.textContent = day;
                dayElement.style.cursor = 'pointer';
                dayElement.style.transition = 'all 0.2s ease';
                
                // Mark today (hanya untuk bulan saat ini)
                if (day === now.getDate() && calendarMonth === now.getMonth() && calendarYear === now.getFullYear()) {
                    dayElement.classList.add('today');
                }
                
                // Mark event days for SMA Negeri 19
                if ([15, 18, 22, 25].includes(day)) {
                    dayElement.classList.add('event');
                }
                
                // Add click handler untuk melihat detail hari
                dayElement.addEventListener('click', function() {
                    const selectedDate = new Date(calendarYear, calendarMonth, day);
                    const dateStr = new Intl.DateTimeFormat('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(selectedDate);
                    showNotification(`Tanggal dipilih: ${dateStr}`, 'success');
                });
                
                // Hover effect
                dayElement.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                });
                
                dayElement.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
                
                calendarGrid.appendChild(dayElement);
            }
        }

        function changeMonth(direction) {
            // Ubah bulan
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
            
            // Re-render kalender dengan bulan baru
            renderCalendar();
            
            // Tampilkan notifikasi
            const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(currentCalendarDate);
            showNotification(`Kalender berubah ke ${monthName}`, 'success');
        }

        function addEvent() {
            showNotification('Fitur tambah kegiatan baru akan segera tersedia!', 'success');
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize page state - ensure login form is shown
            initializePageState();
            
            // Drag and Drop for Upload
            const uploadArea = document.querySelector('.upload-area');
            
            if (uploadArea) {
                uploadArea.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('dragover');
                });
                
                uploadArea.addEventListener('dragleave', function(e) {
                    e.preventDefault();
                    this.classList.remove('dragover');
                });
                
                uploadArea.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.classList.remove('dragover');
                    
                    const files = e.dataTransfer.files;
                    document.getElementById('fileInput').files = files;
                    handleFileUpload({ target: { files } });
                });
            }
            
            // Enter key support for login
            document.getElementById('username').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') login();
            });
            
            document.getElementById('password').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') login();
            });
            

        });

        // Close modals when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('show');
            }
        });

        // Auto-update weather (simulation)
        setInterval(function() {
            const temps = [30, 31, 32, 33, 29, 28];
            const weathers = ['Cerah', 'Berawan', 'Cerah Berawan'];
            const icons = ['fa-sun', 'fa-cloud-sun', 'fa-cloud'];
            
            const randomTemp = temps[Math.floor(Math.random() * temps.length)];
            const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            
            const weatherWidget = document.querySelector('.weather-widget');
            if (weatherWidget) {
                weatherWidget.innerHTML = `
                    <i class="fas ${randomIcon} weather-icon"></i>
                    <div>
                        <div class="font-bold">${randomTemp}°C</div>
                        <div class="text-sm">${randomWeather}</div>
                    </div>
                `;
            }
        }, 30000); // Update every 30 seconds

        // Initialize default data on page load
        window.addEventListener('load', function() {
            updateDataDisplay();
            updateStats();
        });
    
