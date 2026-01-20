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
        let jumlahPohon = 125;
        let jumlahSampah = 68;
        let jumlahKegiatan = 24;
        let skorLingkungan = 92;
        let hematEnergi = 15;
        
        // Task Management
        let tasks = [
            { id: 1, text: 'Menyiram tanaman di taman SMA Negeri 19', completed: false, priority: 'high', date: '2026-12-15' },
            { id: 2, text: 'Mengumpulkan sampah plastik untuk bank sampah', completed: true, priority: 'medium', date: '2026-12-10' },
            { id: 3, text: 'Membuat kompos dari sampah organik kantin', completed: false, priority: 'low', date: '2026-12-20' },
            { id: 4, text: 'Membersihkan area parkir dan halaman sekolah', completed: false, priority: 'high', date: '2026-12-18' },
            { id: 5, text: 'Sosialisasi hemat energi ke kelas X', completed: true, priority: 'medium', date: '2026-12-12' }
        ];
        
        // Gallery Configuration - Ubah URL foto di sini untuk mengganti gambar
        const galleryImages = [
            {
                id: 1,
                title: 'Penanaman Pohon Siswa SMA Negeri 19',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrahHeeWoz2PT0VcJlLR_HnLzCirSbnfa5P5pp6PuOocg6WWKlpJ4LfKY&s=10',
                description: 'Penanaman Pohon Siswa SMA Negeri 19'
            },
            {
                id: 2,
                title: 'Program Bank Sampah Sekolah',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHbatmpt39hV1fcXaz3t3UD-sBOfEFMzVaTSpcJMCAmQ&s=10',
                description: 'Program Bank Sampah Sekolah'
            },
            {
                id: 3,
                title: 'Kegiatan Bersih-Bersih Lingkungan',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyaha0xcQ_sIYL4bCHnTbaq6OMQ2DfjhExl03wH4D59aQHbxVyizrN9jCW&s=10',
                description: 'Kegiatan Bersih-Bersih Lingkungan'
            },
            {
                id: 4,
                title: 'Taman Sekolah SMA Negeri 19',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7jH8E2mKq4BkuNEB-INEE0HlxP8PxL0UNERc5eTOZSw&s=10',
                description: 'Taman Sekolah SMA Negeri 19'
            },
            {
                id: 5,
                title: 'Pembuatan Kompos Organik',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Si6s40zn1j91_Ko2pDjnGLzkstexLNlbi1jm5hc2bw&s=10',
                description: 'Pembuatan Kompos Organik'
            },
            {
                id: 6,
                title: 'Workshop Edukasi Lingkungan',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBtzFimtNGVAHzcFF2nrs6sRGLdrbk-dzVn15cNxY4j0npcel_oQkCkw&s=10',
                description: 'Workshop Edukasi Lingkungan'
            }
        ];

        // Calendar State Management
        let currentCalendarDate = new Date();

        // Quiz Data for SMA Negeri 19
        let quizQuestions = [
            {
                question: "Apa yang dimaksud dengan program Adiwiyata?",
                options: [
                    "Program untuk meningkatkan prestasi akademik siswa",
                    "Program sekolah peduli dan berbudaya lingkungan",
                    "Program peningkatan fasilitas sekolah",
                    "Program beasiswa untuk siswa berprestasi"
                ],
                correct: 1
            },
            {
                question: "Berapa pilar utama dalam program Adiwiyata?",
                options: ["2 pilar", "3 pilar", "4 pilar", "5 pilar"],
                correct: 2
            },
            {
                question: "Apa manfaat utama dari program bank sampah di sekolah?",
                options: [
                    "Mengurangi biaya operasional sekolah",
                    "Mengurangi pencemaran lingkungan dan menghasilkan income",
                    "Meningkatkan prestasi siswa",
                    "Mempercantik tampilan sekolah"
                ],
                correct: 1
            },
            {
                question: "SMA Negeri 19 Palembang telah meraih status Adiwiyata pada tingkat apa?",
                options: [
                    "Adiwiyata Sekolah",
                    "Adiwiyata Kota",
                    "Adiwiyata Provinsi", 
                    "Adiwiyata Mandiri"
                ],
                correct: 3
            },
            {
                question: "Apa tujuan utama dari penanaman pohon di lingkungan sekolah?",
                options: [
                    "Mempercantik halaman sekolah saja",
                    "Menyediakan oksigen, mengurangi polusi, dan menciptakan iklim mikro",
                    "Menghemat biaya listrik",
                    "Menarik perhatian pengunjung"
                ],
                correct: 1
            }
        ];
        
        let currentQuestionIndex = 0;
        let quizScore = 0;
        let selectedAnswer = -1;

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
            
            // Reset focus to username field for next login
            setTimeout(() => {
                document.getElementById('username').focus();
            }, 500);
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
            renderTasks();
            renderCalendar();
            updateStats();
            console.log("[v0] Memanggil renderGallery saat inisialisasi");
            renderGallery();
            loadQuiz();
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
            const energyProgress = Math.min((hematEnergi / 20) * 100, 100);
            
            document.getElementById('treeProgressBar').style.width = treeProgress + '%';
            document.getElementById('recycleProgressBar').style.width = recycleProgress + '%';
            document.getElementById('cleanProgressBar').style.width = cleanProgress + '%';
            document.getElementById('energyProgressBar').style.width = energyProgress + '%';
            
            document.getElementById('treeProgress').textContent = jumlahPohon;
            document.getElementById('recycleProgress').textContent = jumlahSampah;
            document.getElementById('cleanProgress').textContent = jumlahKegiatan;
            document.getElementById('energyProgress').textContent = hematEnergi;
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
                            data: [8, 15, 22, 35, 48, 62, 75, 88, 95, 105, 115, 125],
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
            const data = {
                sekolah: "SMA Negeri 19 Palembang",
                pohon: jumlahPohon,
                sampah: jumlahSampah,
                kegiatan: jumlahKegiatan,
                skor: skorLingkungan,
                hemat_energi: hematEnergi,
                tanggal_export: new Date().toISOString(),
                status: "Adiwiyata Mandiri"
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data-adiwiyata-19-palembang.json';
            link.click();
            
            showNotification('Data SMA Negeri 19 berhasil diexport!', 'success');
        }

        // Task Management
        function addTask() {
            const taskInput = document.getElementById('newTaskInput');
            const taskPriority = document.getElementById('taskPriority');
            
            if (taskInput.value.trim() === '') {
                showNotification('Mohon masukkan tugas yang valid', 'error');
                return;
            }
            
            const newTask = {
                id: Date.now(),
                text: taskInput.value.trim(),
                completed: false,
                priority: taskPriority.value,
                date: new Date().toISOString().split('T')[0]
            };
            
            tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
            showNotification('Tugas Adiwiyata berhasil ditambahkan!', 'success');
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
                showNotification(task.completed ? 'Tugas selesai! 🎉' : 'Tugas dibatalkan', 'success');
            }
        }

        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
            showNotification('Tugas dihapus', 'warning');
        }

        function filterTasks(filter) {
            // Update filter buttons
            document.querySelectorAll('.task-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            renderTasks(filter);
        }

        function renderTasks(filter = 'all') {
            const taskList = document.getElementById('taskList');
            let filteredTasks = tasks;
            
            switch(filter) {
                case 'pending':
                    filteredTasks = tasks.filter(t => !t.completed);
                    break;
                case 'completed':
                    filteredTasks = tasks.filter(t => t.completed);
                    break;
                case 'high':
                    filteredTasks = tasks.filter(t => t.priority === 'high');
                    break;
            }
            
            if (filteredTasks.length === 0) {
                taskList.innerHTML = `
                    <div style="text-align: center; padding: 3rem; color: var(--gray-600);">
                        <i class="fas fa-tasks" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                        <p>Tidak ada tugas untuk filter ini</p>
                    </div>
                `;
                return;
            }
            
            taskList.innerHTML = filteredTasks.map(task => `
                <div class="task-item">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})">
                        ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span class="task-priority priority-${task.priority}">
                            ${getPriorityText(task.priority)}
                        </span>
                        <button onclick="deleteTask(${task.id})" class="btn btn-red" style="padding: 0.5rem;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function getPriorityText(priority) {
            switch(priority) {
                case 'high': return 'Tinggi';
                case 'medium': return 'Sedang';
                case 'low': return 'Rendah';
                default: return 'Normal';
            }
        }

        // Quiz System
        function loadQuiz() {
            currentQuestionIndex = 0;
            quizScore = 0;
            selectedAnswer = -1;
            showQuestion();
        }

        function showQuestion() {
            const question = quizQuestions[currentQuestionIndex];
            document.getElementById('questionText').textContent = question.question;
            
            const optionsContainer = document.getElementById('quizOptions');
            optionsContainer.innerHTML = question.options.map((option, index) => `
                <div class="quiz-option" onclick="selectAnswer(${index})">
                    ${String.fromCharCode(65 + index)}. ${option}
                </div>
            `).join('');
            
            document.getElementById('submitBtn').disabled = true;
            document.getElementById('nextBtn').classList.add('hidden');
            document.getElementById('quizResult').classList.add('hidden');
        }

        function selectAnswer(index) {
            selectedAnswer = index;
            
            // Remove previous selections
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selection to clicked option
            event.target.classList.add('selected');
            document.getElementById('submitBtn').disabled = false;
        }

        function submitAnswer() {
            const question = quizQuestions[currentQuestionIndex];
            const isCorrect = selectedAnswer === question.correct;
            
            if (isCorrect) {
                quizScore += 20;
            }
            
            // Show correct/incorrect styling
            document.querySelectorAll('.quiz-option').forEach((option, index) => {
                if (index === question.correct) {
                    option.classList.add('correct');
                } else if (index === selectedAnswer && !isCorrect) {
                    option.classList.add('incorrect');
                }
            });
            
            // Show result
            const resultDiv = document.getElementById('quizResult');
            resultDiv.innerHTML = `
                <div style="background: ${isCorrect ? '#dcfce7' : '#fef2f2'}; color: ${isCorrect ? '#064e3b' : '#dc2626'};">
                    <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    ${isCorrect ? 'Benar! 🎉' : 'Salah! 😔'} 
                    ${isCorrect ? '' : `Jawaban yang benar adalah: ${String.fromCharCode(65 + question.correct)}`}
                </div>
            `;
            resultDiv.classList.remove('hidden');
            
            document.getElementById('submitBtn').classList.add('hidden');
            document.getElementById('nextBtn').classList.remove('hidden');
            document.getElementById('quizScore').textContent = quizScore;
        }

        function nextQuestion() {
            currentQuestionIndex++;
            
            if (currentQuestionIndex >= quizQuestions.length) {
                showQuizComplete();
            } else {
                showQuestion();
            }
        }

        function showQuizComplete() {
            document.getElementById('quizContent').classList.add('hidden');
            document.getElementById('quizComplete').classList.remove('hidden');
            document.getElementById('finalScore').textContent = quizScore;
            
            let message = '';
            if (quizScore >= 80) {
                message = 'Excellent! Anda sangat memahami program Adiwiyata! 🏆';
            } else if (quizScore >= 60) {
                message = 'Good job! Pengetahuan Anda tentang Adiwiyata cukup baik! 👍';
            } else {
                message = 'Keep learning! Mari pelajari lebih lanjut tentang Adiwiyata! 📚';
            }
            
            showNotification(`Kuis selesai! Skor: ${quizScore}/100. ${message}`, 'success');
        }

        function restartQuiz() {
            document.getElementById('quizContent').classList.remove('hidden');
            document.getElementById('quizComplete').classList.add('hidden');
            loadQuiz();
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
                    description: 'Selamat! SMA Negeri 19 Palembang telah menanam lebih dari 125 pohon! Kontribusi luar biasa untuk lingkungan Palembang.'
                },
                'eco-champion': {
                    icon: 'fas fa-recycle',
                    title: 'Eco Champion Palembang',
                    description: 'Hebat! Sekolah telah mendaur ulang lebih dari 68kg sampah! Terus jaga lingkungan Sumatera Selatan.'
                },
                'green-school': {
                    icon: 'fas fa-school',
                    title: 'Green School Mandiri',
                    description: 'SMA Negeri 19 Palembang telah meraih status Adiwiyata Mandiri! Sekolah percontohan lingkungan.'
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

        // Leaderboard
        function sortLeaderboard(criteria) {
            let message = '';
            switch(criteria) {
                case 'points':
                    message = 'Leaderboard diurutkan berdasarkan total poin';
                    break;
                case 'trees':
                    message = 'Leaderboard diurutkan berdasarkan jumlah pohon';
                    break;
                case 'activities':
                    message = 'Leaderboard diurutkan berdasarkan jumlah kegiatan';
                    break;
            }
            showNotification(message, 'success');
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
            
            // Enter key for new task
            const taskInput = document.getElementById('newTaskInput');
            if (taskInput) {
                taskInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') addTask();
                });
            }
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