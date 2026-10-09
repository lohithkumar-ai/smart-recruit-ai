// ========================================
//  SMART RECRUIT — Simple Canvas Charts
// ========================================

const Charts = {

    colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],

    // ---- Doughnut Chart ----
    doughnut(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        const size = Math.min(rect.width, options.height || 260);
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        ctx.scale(dpr, dpr);

        const cx = size / 2, cy = size / 2;
        const radius = size * 0.38;
        const innerRadius = radius * 0.6;
        const labels = Object.keys(data);
        const values = Object.values(data);
        const total = values.reduce((a, b) => a + b, 0);
        let startAngle = -Math.PI / 2;

        labels.forEach((label, i) => {
            const sliceAngle = (values[i] / total) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
            ctx.arc(cx, cy, innerRadius, startAngle + sliceAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = this.colors[i % this.colors.length];
            ctx.fill();
            startAngle += sliceAngle;
        });

        // Center text
        ctx.fillStyle = options.darkMode ? '#f8fafc' : '#1e293b';
        ctx.font = `800 ${size * 0.1}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(total.toLocaleString(), cx, cy - 6);
        ctx.font = `500 ${size * 0.045}px Inter, sans-serif`;
        ctx.fillStyle = options.darkMode ? '#94a3b8' : '#64748b';
        ctx.fillText('Total', cx, cy + size * 0.06);

        return { labels, values, total };
    },

    // ---- Bar Chart ----
    bar(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        const w = rect.width;
        const h = options.height || 220;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.scale(dpr, dpr);

        const labels = Object.keys(data);
        const values = Object.values(data);
        const max = Math.max(...values) * 1.15;
        const pad = { top: 20, right: 20, bottom: 40, left: 50 };
        const chartW = w - pad.left - pad.right;
        const chartH = h - pad.top - pad.bottom;
        const barW = Math.min(chartW / labels.length * 0.6, 40);
        const gap = chartW / labels.length;

        // Grid lines
        ctx.strokeStyle = options.darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = pad.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(w - pad.right, y);
            ctx.stroke();
            const val = Math.round(max - (max / 4) * i);
            ctx.fillStyle = options.darkMode ? '#64748b' : '#94a3b8';
            ctx.font = '500 10px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(val, pad.left - 8, y + 4);
        }

        // Bars
        labels.forEach((label, i) => {
            const x = pad.left + gap * i + (gap - barW) / 2;
            const barH = (values[i] / max) * chartH;
            const y = pad.top + chartH - barH;

            const gradient = ctx.createLinearGradient(x, y, x, pad.top + chartH);
            gradient.addColorStop(0, this.colors[i % this.colors.length]);
            gradient.addColorStop(1, this.colors[i % this.colors.length] + '44');
            ctx.fillStyle = gradient;

            // Rounded top
            const r = Math.min(barW / 2, 6);
            ctx.beginPath();
            ctx.moveTo(x, pad.top + chartH);
            ctx.lineTo(x, y + r);
            ctx.arcTo(x, y, x + r, y, r);
            ctx.lineTo(x + barW - r, y);
            ctx.arcTo(x + barW, y, x + barW, y + r, r);
            ctx.lineTo(x + barW, pad.top + chartH);
            ctx.closePath();
            ctx.fill();

            // Label
            ctx.fillStyle = options.darkMode ? '#94a3b8' : '#64748b';
            ctx.font = '500 10px Inter, sans-serif';
            ctx.textAlign = 'center';
            const displayLabel = label.length > 10 ? label.substring(0, 9) + '…' : label;
            ctx.fillText(displayLabel, x + barW / 2, h - pad.bottom + 18);

            // Value on top
            ctx.fillStyle = options.darkMode ? '#e2e8f0' : '#334155';
            ctx.font = '600 11px Inter, sans-serif';
            ctx.fillText(values[i], x + barW / 2, y - 8);
        });
    },

    // ---- Funnel Chart ----
    funnel(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        const w = rect.width;
        const h = options.height || 280;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.scale(dpr, dpr);

        const labels = Object.keys(data);
        const values = Object.values(data);
        const max = values[0];
        const stepH = (h - 40) / labels.length;
        const maxWidth = w * 0.85;
        const minWidth = w * 0.2;

        labels.forEach((label, i) => {
            const ratio = values[i] / max;
            const barW = minWidth + (maxWidth - minWidth) * ratio;
            const x = (w - barW) / 2;
            const y = 20 + stepH * i;

            ctx.fillStyle = this.colors[i % this.colors.length] + 'cc';
            const r = 8;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + barW - r, y);
            ctx.arcTo(x + barW, y, x + barW, y + r, r);
            ctx.lineTo(x + barW, y + stepH - 6 - r);
            ctx.arcTo(x + barW, y + stepH - 6, x + barW - r, y + stepH - 6, r);
            ctx.lineTo(x + r, y + stepH - 6);
            ctx.arcTo(x, y + stepH - 6, x, y + stepH - 6 - r, r);
            ctx.lineTo(x, y + r);
            ctx.arcTo(x, y, x + r, y, r);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = '600 13px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${label} — ${values[i].toLocaleString()}`, w / 2, y + (stepH - 6) / 2);
        });
    },

    // ---- Line Chart ----
    line(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        const w = rect.width;
        const h = options.height || 220;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.scale(dpr, dpr);

        const labels = Object.keys(data);
        const values = Object.values(data);
        const max = Math.max(...values) * 1.15;
        const pad = { top: 20, right: 20, bottom: 40, left: 50 };
        const chartW = w - pad.left - pad.right;
        const chartH = h - pad.top - pad.bottom;

        // Grid
        ctx.strokeStyle = options.darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = pad.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(w - pad.right, y);
            ctx.stroke();
            const val = Math.round(max - (max / 4) * i);
            ctx.fillStyle = options.darkMode ? '#64748b' : '#94a3b8';
            ctx.font = '500 10px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(val, pad.left - 8, y + 4);
        }

        // Points
        const points = labels.map((label, i) => ({
            x: pad.left + (chartW / (labels.length - 1)) * i,
            y: pad.top + chartH - (values[i] / max) * chartH
        }));

        // Area fill
        const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.15)');
        gradient.addColorStop(1, 'rgba(79, 70, 229, 0.01)');
        ctx.beginPath();
        ctx.moveTo(points[0].x, pad.top + chartH);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Line
        ctx.beginPath();
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();

        // Dots & labels
        points.forEach((p, i) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#4f46e5';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.fillStyle = options.darkMode ? '#94a3b8' : '#64748b';
            ctx.font = '500 10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(labels[i], p.x, h - pad.bottom + 18);
        });
    },

    // ---- Horizontal Bar ----
    horizontalBar(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        const w = rect.width;
        const labels = Object.keys(data);
        const values = Object.values(data);
        const barH = 32;
        const gap = 14;
        const h = labels.length * (barH + gap) + 30;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.scale(dpr, dpr);

        const max = Math.max(...values) * 1.1;
        const pad = { left: 140, right: 60 };
        const chartW = w - pad.left - pad.right;

        labels.forEach((label, i) => {
            const y = 15 + i * (barH + gap);
            const barWidth = (values[i] / max) * chartW;

            // Background
            ctx.fillStyle = options.darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
            ctx.beginPath();
            ctx.roundRect(pad.left, y, chartW, barH, 6);
            ctx.fill();

            // Bar
            const gradient = ctx.createLinearGradient(pad.left, y, pad.left + barWidth, y);
            gradient.addColorStop(0, this.colors[i % this.colors.length]);
            gradient.addColorStop(1, this.colors[i % this.colors.length] + 'aa');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(pad.left, y, barWidth, barH, 6);
            ctx.fill();

            // Label
            ctx.fillStyle = options.darkMode ? '#e2e8f0' : '#334155';
            ctx.font = '500 12px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, pad.left - 12, y + barH / 2);

            // Value
            ctx.fillStyle = options.darkMode ? '#94a3b8' : '#64748b';
            ctx.font = '600 12px Inter, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(values[i], pad.left + barWidth + 10, y + barH / 2);
        });
    }
};
