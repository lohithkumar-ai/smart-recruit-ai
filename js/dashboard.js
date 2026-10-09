// ========================================
//  SMART RECRUIT — Dashboard Application
// ========================================

const App = {
    currentPage: 'dashboard',
    currentCandidate: null,

    init() {
        this.bindSidebar();
        this.bindModal();
        this.bindGlobalSearch();
        this.navigate('dashboard');
    },

    // ---- Sidebar ----
    bindSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebarToggle');
        const close = document.getElementById('sidebarClose');

        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigate(page);
                sidebar.classList.remove('active');
            });
        });

        toggle.addEventListener('click', () => sidebar.classList.toggle('active'));
        close.addEventListener('click', () => sidebar.classList.remove('active'));
    },

    // ---- Navigation ----
    navigate(page, data = null) {
        this.currentPage = page;

        // Update sidebar active
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Update title
        const titles = {
            'dashboard': 'Dashboard',
            'jobs': 'Job Listings',
            'applications': 'Applications',
            'candidates': 'Add Candidate',
            'pipeline': 'Recruitment Pipeline',
            'interviews': 'Interviews',
            'ai-screening': 'AI Screening',
            'analytics': 'Analytics',
            'emails': 'Email Templates',
            'settings': 'Settings',
            'candidate-profile': 'Candidate Profile',
            'add-job': 'Add Job Posting'
        };
        document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';

        // Render page
        const content = document.getElementById('pageContent');
        switch (page) {
            case 'dashboard': content.innerHTML = this.renderDashboard(); this.initDashboardCharts(); break;
            case 'jobs': content.innerHTML = this.renderJobs(); break;
            case 'applications': content.innerHTML = this.renderApplications(); this.bindApplicationFilters(); break;
            case 'candidates': content.innerHTML = this.renderAddCandidate(); this.bindCandidateForm(); break;
            case 'pipeline': content.innerHTML = this.renderPipeline(); this.bindPipeline(); break;
            case 'interviews': content.innerHTML = this.renderInterviews(); break;
            case 'ai-screening': content.innerHTML = this.renderAIScreening(); this.bindAIScreening(); break;
            case 'analytics': content.innerHTML = this.renderAnalytics(); this.initAnalyticsCharts(); break;
            case 'emails': content.innerHTML = this.renderEmails(); this.bindEmails(); break;
            case 'settings': content.innerHTML = this.renderSettings(); this.bindSettings(); break;
            case 'candidate-profile': content.innerHTML = this.renderCandidateProfile(data); break;
            case 'add-job': content.innerHTML = this.renderAddJob(); this.bindJobForm(); break;
        }

        // Scroll to top
        content.scrollTop = 0;
        window.scrollTo(0, 0);
    },

    // ---- Modal ----
    bindModal() {
        const overlay = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');
        closeBtn.addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal();
        });
    },

    openModal(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        document.getElementById('modalOverlay').classList.add('active');
    },

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
    },

    // ---- Toast ----
    toast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    },

    // ---- Global Search ----
    bindGlobalSearch() {
        document.getElementById('globalSearch').addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            if (q.length > 1 && this.currentPage === 'applications') {
                this.filterApplications();
            }
        });
    },

    // ---- Helper Functions ----
    getSourceIcon(source) {
        const map = { 'LinkedIn': 'fab fa-linkedin', 'Naukri': 'fas fa-briefcase', 'Company Website': 'fas fa-building', 'Employee Referral': 'fas fa-user-friends', 'Indeed': 'fas fa-search', 'Email': 'fas fa-envelope', 'Other': 'fas fa-globe' };
        return map[source] || 'fas fa-globe';
    },

    getSourceClass(source) {
        const map = { 'LinkedIn': 'linkedin', 'Naukri': 'naukri', 'Company Website': 'company', 'Employee Referral': 'referral' };
        return map[source] || '';
    },

    getMatchColor(score) {
        if (score >= 85) return '#10b981';
        if (score >= 70) return '#f59e0b';
        return '#ef4444';
    },

    formatDate(dateStr) {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    },

    // ==============================
    //  DASHBOARD PAGE
    // ==============================
    renderDashboard() {
        const s = DemoData.stats;
        return `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon primary"><i class="fas fa-file-alt"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Total Applications</div>
                        <div class="stat-value">${s.totalApplications.toLocaleString()}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon success"><i class="fas fa-star"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Shortlisted</div>
                        <div class="stat-value">${s.shortlisted}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon warning"><i class="fas fa-calendar-check"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Interviews</div>
                        <div class="stat-value">${s.interviews}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon info"><i class="fas fa-user-check"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Selected</div>
                        <div class="stat-value">${s.selected}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon accent"><i class="fas fa-clock"></i></div>
                    <div class="stat-info">
                        <div class="stat-label">Avg. Time to Hire</div>
                        <div class="stat-value">${s.avgTimeToHire} <span style="font-size:0.8rem;font-weight:500;color:var(--text-muted)">Days</span></div>
                    </div>
                </div>
            </div>

            <!-- Recruitment Funnel -->
            <div class="card" style="margin-bottom:28px">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-filter" style="color:var(--primary);margin-right:8px"></i>Recruitment Funnel</h3>
                </div>
                <div class="funnel-visual">
                    ${Object.entries(s.funnelData).map(([k, v], i) => `
                        <div class="funnel-step">
                            <span>${k}</span>
                            <span class="funnel-value">${v.toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Charts -->
            <div class="charts-grid">
                <div class="chart-card">
                    <div class="card-header"><h3 class="card-title">Applications by Source</h3></div>
                    <canvas id="sourceChart"></canvas>
                    <div class="chart-legend" id="sourceLegend"></div>
                </div>
                <div class="chart-card">
                    <div class="card-header"><h3 class="card-title">Monthly Applications</h3></div>
                    <canvas id="monthlyChart"></canvas>
                </div>
                <div class="chart-card">
                    <div class="card-header"><h3 class="card-title">Applications by Job</h3></div>
                    <canvas id="jobChart"></canvas>
                </div>
                <div class="chart-card">
                    <div class="card-header"><h3 class="card-title">Hiring Funnel</h3></div>
                    <canvas id="funnelChart"></canvas>
                </div>
            </div>

            <!-- Recent Applications -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Recent Applications</h3>
                    <button class="btn btn-sm btn-secondary" onclick="App.navigate('applications')">View All <i class="fas fa-arrow-right" style="font-size:0.7rem"></i></button>
                </div>
                ${this.renderApplicationsTable(DemoData.candidates.slice(0, 5))}
            </div>
        `;
    },

    initDashboardCharts() {
        setTimeout(() => {
            const s = DemoData.stats;
            const result = Charts.doughnut('sourceChart', s.sourcesBreakdown, { height: 240 });
            if (result) {
                const legend = document.getElementById('sourceLegend');
                if (legend) {
                    legend.innerHTML = result.labels.map((l, i) =>
                        `<div class="legend-item"><div class="legend-dot" style="background:${Charts.colors[i]}"></div>${l}: ${result.values[i]}</div>`
                    ).join('');
                }
            }
            Charts.line('monthlyChart', s.monthlyApplications);
            Charts.horizontalBar('jobChart', s.jobApplications);
            Charts.funnel('funnelChart', s.funnelData);
        }, 50);
    },

    // ==============================
    //  APPLICATIONS PAGE
    // ==============================
    renderApplications() {
        const sources = [...new Set(DemoData.candidates.map(c => c.source))];
        const jobs = [...new Set(DemoData.candidates.map(c => c.job))];
        const statuses = [...new Set(DemoData.candidates.map(c => c.status))];

        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">All Applications</h3>
                    <button class="btn btn-primary btn-sm" onclick="App.navigate('candidates')"><i class="fas fa-plus"></i> Add Candidate</button>
                </div>
                <div class="filters-bar">
                    <div class="filter-group">
                        <label>Search</label>
                        <input type="text" class="filter-input" id="filterSearch" placeholder="Name, skills..." style="width:180px">
                    </div>
                    <div class="filter-group">
                        <label>Source</label>
                        <select class="filter-select" id="filterSource">
                            <option value="">All Sources</option>
                            ${sources.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Job</label>
                        <select class="filter-select" id="filterJob">
                            <option value="">All Jobs</option>
                            ${jobs.map(j => `<option value="${j}">${j}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Status</label>
                        <select class="filter-select" id="filterStatus">
                            <option value="">All Statuses</option>
                            ${statuses.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Min AI Match</label>
                        <input type="number" class="filter-input" id="filterMatch" placeholder="0" min="0" max="100" style="width:80px">
                    </div>
                </div>
                <div id="applicationsTable">
                    ${this.renderApplicationsTable(DemoData.candidates)}
                </div>
            </div>
        `;
    },

    renderApplicationsTable(candidates) {
        if (candidates.length === 0) {
            return `<div class="empty-state"><i class="fas fa-inbox"></i><h3>No applications found</h3><p>Try adjusting your filters or add a new candidate.</p></div>`;
        }
        return `
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Source</th>
                            <th>Job</th>
                            <th>Skills</th>
                            <th>AI Match</th>
                            <th>Applied</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${candidates.map(c => `
                            <tr>
                                <td>
                                    <div class="candidate-cell">
                                        <div class="candidate-avatar" style="background:${c.color}">${c.avatar}</div>
                                        <span class="candidate-name" onclick="App.navigate('candidate-profile', '${c.id}')">${c.name}</span>
                                    </div>
                                </td>
                                <td><span class="source-tag ${this.getSourceClass(c.source)}"><i class="${this.getSourceIcon(c.source)}"></i> ${c.source}</span></td>
                                <td style="font-size:0.82rem;max-width:160px">${c.job}</td>
                                <td>
                                    <div class="skill-tags">${c.skills.slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}${c.skills.length > 3 ? `<span class="skill-tag">+${c.skills.length - 3}</span>` : ''}</div>
                                </td>
                                <td>
                                    <div class="match-score">
                                        <div class="match-bar"><div class="match-fill" style="width:${c.aiMatch}%;background:${this.getMatchColor(c.aiMatch)}"></div></div>
                                        <span style="color:${this.getMatchColor(c.aiMatch)}">${c.aiMatch}%</span>
                                    </div>
                                </td>
                                <td style="font-size:0.82rem;white-space:nowrap">${this.formatDate(c.appliedDate)}</td>
                                <td><span class="status-badge ${c.status.toLowerCase()}">${c.status}</span></td>
                                <td>
                                    <div class="actions-cell">
                                        <button class="action-btn" title="View Profile" onclick="App.navigate('candidate-profile', '${c.id}')"><i class="fas fa-eye"></i></button>
                                        <button class="action-btn" title="AI Analysis" onclick="App.runAIAnalysis('${c.id}')"><i class="fas fa-robot"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    bindApplicationFilters() {
        ['filterSearch', 'filterSource', 'filterJob', 'filterStatus', 'filterMatch'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', () => this.filterApplications());
        });
    },

    filterApplications() {
        const search = (document.getElementById('filterSearch')?.value || '').toLowerCase();
        const source = document.getElementById('filterSource')?.value || '';
        const job = document.getElementById('filterJob')?.value || '';
        const status = document.getElementById('filterStatus')?.value || '';
        const minMatch = parseInt(document.getElementById('filterMatch')?.value) || 0;

        let filtered = DemoData.candidates.filter(c => {
            if (search && !c.name.toLowerCase().includes(search) && !c.skills.join(' ').toLowerCase().includes(search)) return false;
            if (source && c.source !== source) return false;
            if (job && c.job !== job) return false;
            if (status && c.status !== status) return false;
            if (minMatch && c.aiMatch < minMatch) return false;
            return true;
        });

        document.getElementById('applicationsTable').innerHTML = this.renderApplicationsTable(filtered);
    },

    // ==============================
    //  CANDIDATE PROFILE
    // ==============================
    renderCandidateProfile(candidateId) {
        const c = DemoData.candidates.find(x => x.id === candidateId);
        if (!c) return `<div class="empty-state"><i class="fas fa-user-slash"></i><h3>Candidate not found</h3></div>`;

        return `
            <div style="margin-bottom:16px">
                <button class="btn btn-secondary btn-sm" onclick="App.navigate('applications')"><i class="fas fa-arrow-left"></i> Back to Applications</button>
            </div>

            <div class="card" style="margin-bottom:24px">
                <div class="profile-header">
                    <div class="profile-avatar" style="background:${c.color}">${c.avatar}</div>
                    <div class="profile-info">
                        <h2 class="profile-name">${c.name}</h2>
                        <div class="profile-meta">
                            <div class="profile-meta-item"><i class="fas fa-envelope"></i> ${c.email}</div>
                            <div class="profile-meta-item"><i class="fas fa-phone"></i> ${c.phone}</div>
                            <div class="profile-meta-item"><i class="${this.getSourceIcon(c.source)}"></i> ${c.source}</div>
                        </div>
                        <div class="profile-actions">
                            <button class="btn btn-secondary btn-sm" onclick="App.toast('Resume preview — feature simulation', 'info')"><i class="fas fa-file-pdf"></i> View Resume</button>
                            <button class="btn btn-primary btn-sm" onclick="App.runAIAnalysis('${c.id}')"><i class="fas fa-robot"></i> AI Skill Match</button>
                            <button class="btn btn-success btn-sm" onclick="App.updateStatus('${c.id}', 'Shortlisted')"><i class="fas fa-star"></i> Shortlist</button>
                            <button class="btn btn-danger btn-sm" onclick="App.updateStatus('${c.id}', 'Rejected')"><i class="fas fa-times"></i> Reject</button>
                            <button class="btn btn-warning btn-sm" onclick="App.openScheduleModal('${c.id}')"><i class="fas fa-calendar"></i> Schedule Interview</button>
                        </div>
                    </div>
                    <div>
                        <span class="status-badge ${c.status.toLowerCase()}" style="font-size:0.85rem;padding:6px 16px">${c.status}</span>
                    </div>
                </div>
            </div>

            <div class="profile-grid">
                <div>
                    <div class="card" style="margin-bottom:24px">
                        <div class="profile-section">
                            <h3><i class="fas fa-info-circle"></i> Candidate Information</h3>
                            <div class="profile-detail-row"><span class="profile-detail-label">Full Name</span><span class="profile-detail-value">${c.name}</span></div>
                            <div class="profile-detail-row"><span class="profile-detail-label">Email</span><span class="profile-detail-value">${c.email}</span></div>
                            <div class="profile-detail-row"><span class="profile-detail-label">Phone</span><span class="profile-detail-value">${c.phone}</span></div>
                            <div class="profile-detail-row"><span class="profile-detail-label">Education</span><span class="profile-detail-value">${c.education}</span></div>
                            <div class="profile-detail-row"><span class="profile-detail-label">Experience</span><span class="profile-detail-value">${c.experience}</span></div>
                            <div class="profile-detail-row"><span class="profile-detail-label">Applied For</span><span class="profile-detail-value">${c.job}</span></div>
                            <div class="profile-detail-row"><span class="profile-detail-label">Source</span><span class="profile-detail-value">${c.source}</span></div>
                            <div class="profile-detail-row"><span class="profile-detail-label">Applied Date</span><span class="profile-detail-value">${this.formatDate(c.appliedDate)}</span></div>
                            <div class="profile-detail-row"><span class="profile-detail-label">AI Match Score</span><span class="profile-detail-value" style="color:${this.getMatchColor(c.aiMatch)};font-weight:700">${c.aiMatch}%</span></div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="profile-section">
                            <h3><i class="fas fa-code"></i> Skills</h3>
                            <div class="skill-tags" style="gap:8px">${c.skills.map(s => `<span class="skill-tag" style="padding:6px 14px;font-size:0.82rem">${s}</span>`).join('')}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card">
                        <div class="profile-section">
                            <h3><i class="fas fa-history"></i> Application Timeline</h3>
                            <div class="candidate-timeline">
                                ${c.timeline.map(t => `
                                    <div class="timeline-step">
                                        <div class="timeline-dot ${t.completed ? 'completed' : ''}">
                                            ${t.completed ? '<i class="fas fa-check"></i>' : ''}
                                        </div>
                                        <div class="timeline-step-title">${t.stage}</div>
                                        <div class="timeline-step-date">${t.date ? this.formatDate(t.date) : 'Pending'}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    updateStatus(candidateId, newStatus) {
        const c = DemoData.candidates.find(x => x.id === candidateId);
        if (!c) return;
        c.status = newStatus;

        // Update timeline
        const stageMap = { 'Applied': 0, 'Screening': 1, 'Shortlisted': 2, 'Interview': 3, 'Selected': 4, 'Rejected': 2 };
        const stageIdx = stageMap[newStatus];
        if (stageIdx !== undefined && c.timeline[stageIdx]) {
            c.timeline[stageIdx].completed = true;
            c.timeline[stageIdx].date = new Date().toISOString().split('T')[0];
        }

        saveData();
        this.toast(`${c.name} status updated to ${newStatus}`, 'success');
        this.navigate('candidate-profile', candidateId);
    },

    // ==============================
    //  ADD CANDIDATE
    // ==============================
    renderAddCandidate() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-user-plus" style="color:var(--primary);margin-right:8px"></i>Add New Candidate</h3>
                </div>
                <div id="duplicateWarning"></div>
                <form id="candidateForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Full Name *</label>
                            <input type="text" class="form-input" id="candName" required placeholder="e.g. Rahul Kumar">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-input" id="candEmail" required placeholder="e.g. rahul@email.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone *</label>
                            <input type="text" class="form-input" id="candPhone" required placeholder="e.g. +91 98765 43210">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Job Position *</label>
                            <select class="form-select" id="candJob" required>
                                <option value="">Select Job</option>
                                ${DemoData.jobs.map(j => `<option value="${j.title}">${j.title}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Skills (comma separated) *</label>
                            <input type="text" class="form-input" id="candSkills" required placeholder="e.g. Java, SQL, OOP">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Education</label>
                            <input type="text" class="form-input" id="candEdu" placeholder="e.g. B.Tech CSE, VIT University">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Experience</label>
                            <input type="text" class="form-input" id="candExp" placeholder="e.g. 6 months internship">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Application Source *</label>
                            <select class="form-select" id="candSource" required>
                                <option value="">Select Source</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Naukri">Naukri</option>
                                <option value="Indeed">Indeed</option>
                                <option value="Company Website">Company Website</option>
                                <option value="Employee Referral">Employee Referral</option>
                                <option value="Email">Email</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group full">
                            <label class="form-label">Resume Upload</label>
                            <input type="file" class="form-input" id="candResume" accept=".pdf,.doc,.docx" style="padding:8px">
                        </div>
                    </div>
                    <div class="form-actions" style="margin-top:24px">
                        <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i> Add Candidate</button>
                        <button type="reset" class="btn btn-secondary">Reset</button>
                    </div>
                </form>
            </div>
        `;
    },

    bindCandidateForm() {
        const form = document.getElementById('candidateForm');
        const emailInput = document.getElementById('candEmail');
        const phoneInput = document.getElementById('candPhone');

        // Duplicate detection
        const checkDuplicate = () => {
            const email = emailInput.value.trim().toLowerCase();
            const phone = phoneInput.value.trim();
            const warning = document.getElementById('duplicateWarning');

            const dupByEmail = email ? DemoData.candidates.find(c => c.email.toLowerCase() === email) : null;
            const dupByPhone = phone ? DemoData.candidates.find(c => c.phone === phone) : null;
            const dup = dupByEmail || dupByPhone;

            if (dup) {
                warning.innerHTML = `
                    <div class="duplicate-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div>
                            <h4>⚠ Possible Duplicate Candidate</h4>
                            <p><strong>${dup.name}</strong></p>
                            <p>Email: ${dup.email} | Phone: ${dup.phone}</p>
                            <p>Applied for: ${dup.job} | Status: ${dup.status}</p>
                            <p style="margin-top:8px;font-size:0.82rem">Please review before adding to avoid duplicate entries.</p>
                        </div>
                    </div>
                `;
            } else {
                warning.innerHTML = '';
            }
        };

        emailInput.addEventListener('blur', checkDuplicate);
        phoneInput.addEventListener('blur', checkDuplicate);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('candName').value.trim();
            const email = document.getElementById('candEmail').value.trim();
            const phone = document.getElementById('candPhone').value.trim();
            const job = document.getElementById('candJob').value;
            const skills = document.getElementById('candSkills').value.split(',').map(s => s.trim()).filter(Boolean);
            const edu = document.getElementById('candEdu').value.trim() || 'Not specified';
            const exp = document.getElementById('candExp').value.trim() || 'Not specified';
            const source = document.getElementById('candSource').value;

            const jobData = DemoData.jobs.find(j => j.title === job);
            let aiMatch = Math.floor(Math.random() * 30 + 60);
            if (jobData) {
                const matched = skills.filter(s => jobData.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())).length;
                aiMatch = Math.round((matched / jobData.skills.length) * 100);
            }

            const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
            const colors = ['#4f46e5', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#ef4444'];

            const newCandidate = {
                id: 'CAN' + String(DemoData.candidates.length + 1).padStart(3, '0'),
                name, email, phone, source, job,
                jobId: jobData ? jobData.id : '',
                skills, education: edu, experience: exp,
                aiMatch,
                appliedDate: new Date().toISOString().split('T')[0],
                status: 'Applied',
                avatar: initials,
                color: colors[Math.floor(Math.random() * colors.length)],
                timeline: [
                    { stage: 'Application Received', date: new Date().toISOString().split('T')[0], completed: true },
                    { stage: 'Screening', date: '', completed: false },
                    { stage: 'Shortlisted', date: '', completed: false },
                    { stage: 'Interview', date: '', completed: false },
                    { stage: 'Selected', date: '', completed: false }
                ]
            };

            DemoData.candidates.unshift(newCandidate);
            saveData();
            this.toast(`${name} added successfully!`, 'success');
            this.navigate('applications');
        });
    },

    // ==============================
    //  JOBS PAGE
    // ==============================
    renderJobs() {
        return `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px">
                <h3 style="font-size:1rem;font-weight:700">${DemoData.jobs.length} Active Job Postings</h3>
                <button class="btn btn-primary btn-sm" onclick="App.navigate('add-job')"><i class="fas fa-plus"></i> Add Job</button>
            </div>
            <div class="jobs-grid">
                ${DemoData.jobs.map(j => `
                    <div class="job-card">
                        <div class="job-card-header">
                            <div>
                                <h3>${j.title}</h3>
                                <span class="job-dept">${j.department}</span>
                            </div>
                            <div class="job-status-dot" title="Active"></div>
                        </div>
                        <div class="job-details">
                            <div class="job-detail"><i class="fas fa-map-marker-alt"></i> ${j.location}</div>
                            <div class="job-detail"><i class="fas fa-clock"></i> ${j.type}</div>
                            <div class="job-detail"><i class="fas fa-briefcase"></i> ${j.experience}</div>
                        </div>
                        <div class="skill-tags" style="margin-bottom:12px">
                            ${j.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                        </div>
                        <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.5;margin-bottom:0">${j.description.substring(0, 120)}...</p>
                        <div class="job-card-footer">
                            <span class="job-apps-count"><i class="fas fa-users" style="margin-right:4px"></i> ${j.applications} Applications</span>
                            <span style="font-size:0.78rem;color:var(--text-light)">Posted ${this.formatDate(j.posted)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // ==============================
    //  ADD JOB
    // ==============================
    renderAddJob() {
        return `
            <div style="margin-bottom:16px">
                <button class="btn btn-secondary btn-sm" onclick="App.navigate('jobs')"><i class="fas fa-arrow-left"></i> Back to Jobs</button>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-briefcase" style="color:var(--primary);margin-right:8px"></i>Add New Job Posting</h3>
                </div>
                <form id="jobForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Job Title *</label>
                            <input type="text" class="form-input" id="jobTitle" required placeholder="e.g. Java Developer Intern">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Department *</label>
                            <input type="text" class="form-input" id="jobDept" required placeholder="e.g. Engineering">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Location *</label>
                            <input type="text" class="form-input" id="jobLocation" required placeholder="e.g. Bangalore, India">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Employment Type *</label>
                            <select class="form-select" id="jobType" required>
                                <option value="Internship">Internship</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Required Skills (comma separated) *</label>
                            <input type="text" class="form-input" id="jobSkills" required placeholder="e.g. Java, SQL, Spring Boot">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Experience Required</label>
                            <input type="text" class="form-input" id="jobExp" placeholder="e.g. 0-1 Years">
                        </div>
                        <div class="form-group full">
                            <label class="form-label">Job Description *</label>
                            <textarea class="form-textarea" id="jobDesc" required placeholder="Describe the role, responsibilities and requirements..."></textarea>
                        </div>
                    </div>
                    <div class="form-actions" style="margin-top:24px">
                        <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i> Create Job Posting</button>
                        <button type="button" class="btn btn-secondary" onclick="App.navigate('jobs')">Cancel</button>
                    </div>
                </form>
            </div>
        `;
    },

    bindJobForm() {
        document.getElementById('jobForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const newJob = {
                id: 'JOB' + String(DemoData.jobs.length + 1).padStart(3, '0'),
                title: document.getElementById('jobTitle').value.trim(),
                department: document.getElementById('jobDept').value.trim(),
                location: document.getElementById('jobLocation').value.trim(),
                type: document.getElementById('jobType').value,
                skills: document.getElementById('jobSkills').value.split(',').map(s => s.trim()).filter(Boolean),
                experience: document.getElementById('jobExp').value.trim() || 'Not specified',
                description: document.getElementById('jobDesc').value.trim(),
                posted: new Date().toISOString().split('T')[0],
                status: 'Active',
                applications: 0
            };
            DemoData.jobs.push(newJob);
            saveData();
            this.toast(`Job "${newJob.title}" created successfully!`, 'success');
            this.navigate('jobs');
        });
    },

    // ==============================
    //  PIPELINE PAGE
    // ==============================
    renderPipeline() {
        const stages = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
        const stageColors = { 'Applied': 'var(--info)', 'Screening': 'var(--warning)', 'Shortlisted': '#8b5cf6', 'Interview': 'var(--accent)', 'Selected': 'var(--success)', 'Rejected': 'var(--danger)' };

        return `
            <div class="pipeline-board">
                ${stages.map(stage => {
                    const candidates = DemoData.candidates.filter(c => c.status === stage);
                    return `
                        <div class="pipeline-column" data-stage="${stage}">
                            <div class="pipeline-col-header">
                                <span class="pipeline-col-title" style="color:${stageColors[stage]}">${stage}</span>
                                <span class="pipeline-col-count">${candidates.length}</span>
                            </div>
                            <div class="pipeline-col-body" data-stage="${stage}">
                                ${candidates.map(c => `
                                    <div class="pipeline-card" draggable="true" data-id="${c.id}">
                                        <div class="pipeline-card-name">${c.name}</div>
                                        <div class="pipeline-card-job">${c.job}</div>
                                        <div class="pipeline-card-footer">
                                            <span class="pipeline-card-match" style="color:${this.getMatchColor(c.aiMatch)}">${c.aiMatch}% Match</span>
                                            <span class="pipeline-card-source">${c.source}</span>
                                        </div>
                                        <div class="pipeline-card-actions">
                                            ${stage !== 'Selected' && stage !== 'Rejected' ?
                                                `<button class="pipeline-move-btn" onclick="App.moveCandidate('${c.id}', 'next')">Move →</button>` : ''}
                                            ${stage !== 'Rejected' && stage !== 'Applied' ?
                                                `<button class="pipeline-move-btn" onclick="App.moveCandidate('${c.id}', 'reject')" style="color:var(--danger)">Reject</button>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    bindPipeline() {
        const cards = document.querySelectorAll('.pipeline-card[draggable]');
        const columns = document.querySelectorAll('.pipeline-col-body');

        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', card.dataset.id);
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });

        columns.forEach(col => {
            col.addEventListener('dragover', (e) => {
                e.preventDefault();
                col.style.background = 'rgba(79, 70, 229, 0.05)';
            });
            col.addEventListener('dragleave', () => {
                col.style.background = '';
            });
            col.addEventListener('drop', (e) => {
                e.preventDefault();
                col.style.background = '';
                const candidateId = e.dataTransfer.getData('text/plain');
                const newStage = col.dataset.stage;
                const c = DemoData.candidates.find(x => x.id === candidateId);
                if (c && c.status !== newStage) {
                    c.status = newStage;
                    saveData();
                    this.toast(`${c.name} moved to ${newStage}`, 'success');
                    this.navigate('pipeline');
                }
            });
        });
    },

    moveCandidate(candidateId, direction) {
        const stages = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Selected'];
        const c = DemoData.candidates.find(x => x.id === candidateId);
        if (!c) return;

        if (direction === 'reject') {
            c.status = 'Rejected';
        } else {
            const currentIdx = stages.indexOf(c.status);
            if (currentIdx < stages.length - 1) {
                c.status = stages[currentIdx + 1];
            }
        }
        saveData();
        this.toast(`${c.name} moved to ${c.status}`, 'success');
        this.navigate('pipeline');
    },

    // ==============================
    //  INTERVIEWS PAGE
    // ==============================
    renderInterviews() {
        return `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px">
                <h3 style="font-size:1rem;font-weight:700">${DemoData.interviews.length} Scheduled Interviews</h3>
                <button class="btn btn-primary btn-sm" onclick="App.openScheduleModal()"><i class="fas fa-plus"></i> Schedule Interview</button>
            </div>
            <div class="interview-grid">
                ${DemoData.interviews.map(i => {
                    const c = DemoData.candidates.find(x => x.id === i.candidateId);
                    const color = c ? c.color : '#4f46e5';
                    const avatar = c ? c.avatar : 'NA';
                    return `
                        <div class="interview-card">
                            <div class="interview-card-header">
                                <div class="interview-card-avatar" style="background:${color}">${avatar}</div>
                                <div class="interview-card-info">
                                    <h4>${i.candidate}</h4>
                                    <p>${i.job}</p>
                                </div>
                                <span class="status-badge interview" style="margin-left:auto">${i.status}</span>
                            </div>
                            <div class="interview-detail"><i class="fas fa-calendar"></i> ${this.formatDate(i.date)}</div>
                            <div class="interview-detail"><i class="fas fa-clock"></i> ${i.time}</div>
                            <div class="interview-detail"><i class="fas fa-${i.mode === 'Online' ? 'video' : 'building'}"></i> ${i.mode}</div>
                            <div class="interview-detail"><i class="fas fa-user"></i> ${i.interviewer}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    openScheduleModal(candidateId) {
        const candidates = DemoData.candidates.filter(c => c.status !== 'Rejected' && c.status !== 'Selected');
        const content = `
            <form id="scheduleForm">
                <div class="form-grid">
                    <div class="form-group full">
                        <label class="form-label">Candidate *</label>
                        <select class="form-select" id="intCandidate" required>
                            <option value="">Select Candidate</option>
                            ${candidates.map(c => `<option value="${c.id}" ${c.id === candidateId ? 'selected' : ''}>${c.name} — ${c.job}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Date *</label>
                        <input type="date" class="form-input" id="intDate" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Time *</label>
                        <input type="time" class="form-input" id="intTime" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Interview Mode *</label>
                        <select class="form-select" id="intMode" required>
                            <option value="Online">Online</option>
                            <option value="In-Person">In-Person</option>
                            <option value="Phone">Phone</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Interviewer *</label>
                        <input type="text" class="form-input" id="intInterviewer" required placeholder="e.g. HR Manager">
                    </div>
                </div>
                <div class="form-actions" style="margin-top:20px">
                    <button type="submit" class="btn btn-primary"><i class="fas fa-calendar-check"></i> Schedule Interview</button>
                    <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Cancel</button>
                </div>
            </form>
        `;
        this.openModal('Schedule Interview', content);

        setTimeout(() => {
            document.getElementById('scheduleForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const candidateId = document.getElementById('intCandidate').value;
                const c = DemoData.candidates.find(x => x.id === candidateId);
                if (!c) return;

                const dateVal = document.getElementById('intDate').value;
                const timeVal = document.getElementById('intTime').value;
                const [h, m] = timeVal.split(':');
                const ampm = parseInt(h) >= 12 ? 'PM' : 'AM';
                const h12 = parseInt(h) % 12 || 12;
                const timeFormatted = `${h12}:${m} ${ampm}`;

                const newInterview = {
                    id: 'INT' + String(DemoData.interviews.length + 1).padStart(3, '0'),
                    candidateId: c.id,
                    candidate: c.name,
                    job: c.job,
                    date: dateVal,
                    time: timeFormatted,
                    mode: document.getElementById('intMode').value,
                    interviewer: document.getElementById('intInterviewer').value.trim(),
                    status: 'Scheduled'
                };

                DemoData.interviews.push(newInterview);

                // Update candidate status to Interview
                if (c.status !== 'Selected') {
                    c.status = 'Interview';
                    const intStep = c.timeline.find(t => t.stage === 'Interview');
                    if (intStep) { intStep.completed = true; intStep.date = dateVal; }
                }

                saveData();
                this.closeModal();
                this.toast('✓ Interview scheduled successfully', 'success');
                if (this.currentPage === 'interviews') this.navigate('interviews');
            });
        }, 50);
    },

    // ==============================
    //  AI SCREENING PAGE
    // ==============================
    renderAIScreening() {
        return `
            <div class="ai-container">
                <div class="ai-card" style="text-align:center">
                    <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:8px"><i class="fas fa-robot" style="color:var(--primary);margin-right:8px"></i>AI-Assisted Resume Screening</h3>
                    <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:24px">Select a job and candidate to run the AI skill match analysis</p>

                    <div class="form-grid" style="max-width:500px;margin:0 auto">
                        <div class="form-group">
                            <label class="form-label">Job Position</label>
                            <select class="form-select" id="aiJob">
                                ${DemoData.jobs.map(j => `<option value="${j.id}">${j.title}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Candidate</label>
                            <select class="form-select" id="aiCandidate">
                                ${DemoData.candidates.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary" id="aiAnalyzeBtn" style="margin-top:20px"><i class="fas fa-brain"></i> Analyze Resume</button>
                </div>
                <div id="aiResult"></div>
            </div>
        `;
    },

    bindAIScreening() {
        document.getElementById('aiAnalyzeBtn').addEventListener('click', () => {
            const jobId = document.getElementById('aiJob').value;
            const candidateId = document.getElementById('aiCandidate').value;
            this.performAIAnalysis(jobId, candidateId);
        });
    },

    runAIAnalysis(candidateId) {
        const c = DemoData.candidates.find(x => x.id === candidateId);
        if (!c) return;
        this.navigate('ai-screening');
        setTimeout(() => {
            const aiCandSelect = document.getElementById('aiCandidate');
            const aiJobSelect = document.getElementById('aiJob');
            if (aiCandSelect) aiCandSelect.value = candidateId;
            if (aiJobSelect && c.jobId) aiJobSelect.value = c.jobId;
            this.performAIAnalysis(c.jobId || DemoData.jobs[0].id, candidateId);
        }, 100);
    },

    performAIAnalysis(jobId, candidateId) {
        const job = DemoData.jobs.find(j => j.id === jobId);
        const candidate = DemoData.candidates.find(c => c.id === candidateId);
        if (!job || !candidate) return;

        const resultDiv = document.getElementById('aiResult');

        // Show loading
        resultDiv.innerHTML = `
            <div class="ai-card ai-analyzing">
                <div class="ai-spinner"></div>
                <p>Analyzing resume against job requirements...</p>
                <p style="font-size:0.8rem;color:var(--text-light);margin-top:8px">Processing skills, experience and qualifications</p>
            </div>
        `;

        // Simulate analysis delay
        setTimeout(() => {
            const skillResults = job.skills.map(skill => ({
                skill,
                match: candidate.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
            }));

            const matchCount = skillResults.filter(s => s.match).length;
            const matchPercent = Math.round((matchCount / job.skills.length) * 100);
            const circumference = 2 * Math.PI * 68;
            const offset = circumference - (matchPercent / 100) * circumference;

            let recommendation = '';
            let recIcon = '';
            if (matchPercent >= 80) {
                recommendation = 'Strong match — Suitable for HR Screening';
                recIcon = 'fa-check-circle';
            } else if (matchPercent >= 60) {
                recommendation = 'Moderate match — Consider for further evaluation';
                recIcon = 'fa-info-circle';
            } else {
                recommendation = 'Low match — May need additional skill assessment';
                recIcon = 'fa-exclamation-circle';
            }

            resultDiv.innerHTML = `
                <div class="ai-card">
                    <div style="text-align:center;margin-bottom:24px">
                        <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:4px">${candidate.name}</h3>
                        <p style="color:var(--text-muted);font-size:0.88rem">Applying for: ${job.title}</p>
                    </div>

                    <div class="ai-score-circle">
                        <div class="ai-score-ring">
                            <svg viewBox="0 0 150 150">
                                <circle class="bg" cx="75" cy="75" r="68"/>
                                <circle class="fg" cx="75" cy="75" r="68"
                                    stroke-dasharray="${circumference}"
                                    stroke-dashoffset="${offset}"
                                />
                            </svg>
                        </div>
                        <span class="ai-score-value">${matchPercent}%</span>
                    </div>
                    <div class="ai-score-label">AI Skill Match Score</div>

                    <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:12px">Skill Match Details</h4>
                    ${skillResults.map(s => `
                        <div class="ai-skill-row">
                            <span class="ai-skill-name">${s.skill}</span>
                            <span class="ai-skill-status ${s.match ? 'match' : 'missing'}">
                                <i class="fas ${s.match ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                ${s.match ? 'Match' : 'Missing'}
                            </span>
                        </div>
                    `).join('')}

                    <div class="ai-recommendation">
                        <i class="fas ${recIcon}"></i>
                        <p><strong>Recommendation:</strong> ${recommendation}</p>
                    </div>

                    <div class="ai-disclaimer">
                        <i class="fas fa-info-circle"></i>
                        <span>AI provides decision-support only. Final hiring decisions remain with HR.</span>
                    </div>
                </div>
            `;
        }, 2000);
    },

    // ==============================
    //  ANALYTICS PAGE
    // ==============================
    renderAnalytics() {
        const s = DemoData.stats;
        const shortlistRate = ((s.shortlisted / s.totalApplications) * 100).toFixed(1);
        const interviewRate = ((s.interviews / s.shortlisted) * 100).toFixed(1);
        const selectionRate = ((s.selected / s.interviews) * 100).toFixed(1);

        return `
            <div class="analytics-stats">
                <div class="analytics-stat">
                    <div class="analytics-stat-value">${s.totalApplications.toLocaleString()}</div>
                    <div class="analytics-stat-label">Total Applications</div>
                </div>
                <div class="analytics-stat">
                    <div class="analytics-stat-value" style="color:var(--success)">${shortlistRate}%</div>
                    <div class="analytics-stat-label">Shortlist Rate</div>
                </div>
                <div class="analytics-stat">
                    <div class="analytics-stat-value" style="color:var(--warning)">${interviewRate}%</div>
                    <div class="analytics-stat-label">Interview Rate</div>
                </div>
                <div class="analytics-stat">
                    <div class="analytics-stat-value" style="color:var(--info)">${selectionRate}%</div>
                    <div class="analytics-stat-label">Selection Rate</div>
                </div>
                <div class="analytics-stat">
                    <div class="analytics-stat-value" style="color:var(--accent)">${s.avgTimeToHire} <span style="font-size:0.9rem">Days</span></div>
                    <div class="analytics-stat-label">Avg. Time to Hire</div>
                </div>
            </div>

            <div class="charts-grid">
                <div class="chart-card">
                    <div class="card-header"><h3 class="card-title">Applications by Source</h3></div>
                    <canvas id="analyticsSourceChart"></canvas>
                    <div class="chart-legend" id="analyticsSourceLegend"></div>
                </div>
                <div class="chart-card">
                    <div class="card-header"><h3 class="card-title">Hiring Funnel</h3></div>
                    <canvas id="analyticsFunnelChart"></canvas>
                </div>
                <div class="chart-card">
                    <div class="card-header"><h3 class="card-title">Applications by Job</h3></div>
                    <canvas id="analyticsJobChart"></canvas>
                </div>
                <div class="chart-card">
                    <div class="card-header"><h3 class="card-title">Monthly Application Trends</h3></div>
                    <canvas id="analyticsMonthlyChart"></canvas>
                </div>
            </div>
        `;
    },

    initAnalyticsCharts() {
        setTimeout(() => {
            const s = DemoData.stats;
            const result = Charts.doughnut('analyticsSourceChart', s.sourcesBreakdown, { height: 240 });
            if (result) {
                const legend = document.getElementById('analyticsSourceLegend');
                if (legend) {
                    legend.innerHTML = result.labels.map((l, i) =>
                        `<div class="legend-item"><div class="legend-dot" style="background:${Charts.colors[i]}"></div>${l}: ${result.values[i]}</div>`
                    ).join('');
                }
            }
            Charts.funnel('analyticsFunnelChart', s.funnelData);
            Charts.bar('analyticsJobChart', s.jobApplications);
            Charts.line('analyticsMonthlyChart', s.monthlyApplications);
        }, 50);
    },

    // ==============================
    //  EMAIL TEMPLATES PAGE
    // ==============================
    renderEmails() {
        return `
            <div style="margin-bottom:8px">
                <p style="color:var(--text-muted);font-size:0.88rem"><i class="fas fa-info-circle" style="margin-right:6px"></i>Simulated email templates for candidate communication. Click a template to preview.</p>
            </div>
            <div class="email-grid" id="emailGrid">
                ${DemoData.emailTemplates.map((t, i) => `
                    <div class="email-template-card ${i === 0 ? 'active' : ''}" data-template="${t.id}" onclick="App.showEmailTemplate('${t.id}')">
                        <div class="email-template-icon"><i class="fas ${t.icon}"></i></div>
                        <h4>${t.name}</h4>
                    </div>
                `).join('')}
            </div>
            <div id="emailPreview">
                ${this.renderEmailPreview(DemoData.emailTemplates[0])}
            </div>
        `;
    },

    renderEmailPreview(template) {
        const sampleData = {
            candidateName: 'Rahul Kumar',
            jobTitle: 'Java Developer Intern',
            interviewDate: '15 Oct 2026',
            interviewTime: '10:00 AM',
            interviewMode: 'Online',
            interviewer: 'HR Manager'
        };

        let body = template.body;
        Object.entries(sampleData).forEach(([key, val]) => {
            body = body.replace(new RegExp(`\\{${key}\\}`, 'g'), val);
        });

        let subject = template.subject;
        Object.entries(sampleData).forEach(([key, val]) => {
            subject = subject.replace(new RegExp(`\\{${key}\\}`, 'g'), val);
        });

        return `
            <div class="email-preview">
                <div class="email-preview-header">
                    <h4>Subject</h4>
                    <p>${subject}</p>
                </div>
                <div class="email-preview-body">${body}</div>
            </div>
        `;
    },

    bindEmails() {},

    showEmailTemplate(templateId) {
        const template = DemoData.emailTemplates.find(t => t.id === templateId);
        if (!template) return;

        document.querySelectorAll('.email-template-card').forEach(c => c.classList.remove('active'));
        document.querySelector(`[data-template="${templateId}"]`).classList.add('active');
        document.getElementById('emailPreview').innerHTML = this.renderEmailPreview(template);
    },

    // ==============================
    //  SETTINGS PAGE
    // ==============================
    renderSettings() {
        return `
            <div class="card">
                <div class="settings-section">
                    <h3><i class="fas fa-cog" style="color:var(--primary)"></i> General Settings</h3>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label">Email Notifications</div>
                            <div class="settings-row-desc">Receive email alerts for new applications</div>
                        </div>
                        <div class="toggle active" data-setting="emailNotif"></div>
                    </div>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label">AI Auto-Screening</div>
                            <div class="settings-row-desc">Automatically run AI analysis on new applications</div>
                        </div>
                        <div class="toggle active" data-setting="aiAuto"></div>
                    </div>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label">Duplicate Detection</div>
                            <div class="settings-row-desc">Alert when potential duplicate candidates are detected</div>
                        </div>
                        <div class="toggle active" data-setting="dupDetect"></div>
                    </div>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label">Interview Reminders</div>
                            <div class="settings-row-desc">Send automatic reminders before scheduled interviews</div>
                        </div>
                        <div class="toggle" data-setting="intRemind"></div>
                    </div>
                </div>

                <div class="settings-section">
                    <h3><i class="fas fa-database" style="color:var(--primary)"></i> Data Management</h3>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label">Reset Demo Data</div>
                            <div class="settings-row-desc">Restore all data to original demo state</div>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="if(confirm('Reset all data to defaults?')){resetData()}"><i class="fas fa-undo"></i> Reset</button>
                    </div>
                </div>

                <div class="settings-section">
                    <h3><i class="fas fa-info-circle" style="color:var(--primary)"></i> About</h3>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label">Smart Recruit ATS</div>
                            <div class="settings-row-desc">AI-Powered Multi-Source Recruitment & Applicant Tracking System</div>
                        </div>
                        <span style="font-size:0.82rem;color:var(--text-muted);font-weight:600">v1.0 Prototype</span>
                    </div>
                    <div class="settings-row" style="border:none">
                        <div>
                            <div class="settings-row-label">Prototype Disclaimer</div>
                            <div class="settings-row-desc">This is a demo prototype for HR internship interview presentation. External platform integrations are simulated with demo data. No real APIs are connected.</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    bindSettings() {
        document.querySelectorAll('.toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                const setting = toggle.dataset.setting;
                const state = toggle.classList.contains('active') ? 'enabled' : 'disabled';
                this.toast(`Setting ${state}`, 'info');
            });
        });
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => App.init());
